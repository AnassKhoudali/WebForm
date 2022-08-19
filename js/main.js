//Les variables.
let check1 = [document.getElementById('1'),
document.getElementById('2'),
document.getElementById('3'),
document.getElementById('4'),
document.getElementById('5'),
document.getElementById('6'),
document.getElementById('7'),
document.getElementById('8'),
document.getElementById('9'),
document.getElementById('10'),
document.getElementById('11'),
document.getElementById('12'),
document.getElementById('13'),
document.getElementById('14'),
document.getElementById('15'),
document.getElementById('16'),
document.getElementById('17'),
document.getElementById('18')];
let erreurs = [document.getElementById('erreur1'),
document.getElementById('erreur2'),
document.getElementById('erreur3'),
document.getElementById('erreur4'),
document.getElementById('erreur5'),
document.getElementById('erreur6'),
document.getElementById('erreur7'),
document.getElementById('erreur8'),
document.getElementById('erreur9')];
let options;
let procedures;
let plusOptions = document.getElementById('plusOptions')
let methodique = document.getElementById('methodique')
let equilibre = document.getElementById('Equilibre')

//pour la validation.
function checkErrors() {
    let KeepGoing = true;
    let j = 0;
    for (let i = 0; i < check1.length - 1; i += 2) {
        j++;
        if (!check1[i].checked && !check1[i + 1].checked) {
            erreurs[j - 1].style.display = 'block';
            erreurs[j - 1].style.animation = 'fade-in .5s';
            console.log(erreurs[i]);
            KeepGoing = false;
        }
        else {
            erreurs[j - 1].style.display = 'none';
            erreurs[j - 1].style.animation = 'fade-out .5s';
        }
}
    return KeepGoing;
}


//pour le calcul des resultats.
function getResults() {
    options = 0;
    procedures = 0;
    for (let i = 0; i < check1.length; i++) {
        if (check1[i].checked) {
            if (i % 2 === 0) {
                options++;
            }
            else if (i % 2 !== 0) {
                procedures++;
            }
        }
    }

}

//pour les afficher les resulats textuels dans le pdf car html2pdf ne support pas les animations.
function getTexttualResultsWithoutAnimation(){
    
    plusOptions.style.display = 'block';
    equilibre.style.display = 'block';
    methodique.style.display = 'block';
    if (options > procedures) {

        plusOptions.style.animation ="none";
        methodique.style.display = 'none';
        equilibre.style.display = 'none';
    }
    else if (options < procedures) {

        methodique.style.animation ="none";
        plusOptions.style.display = 'none';
        equilibre.style.display = 'none';
    }
    else {
        
        equilibre.style.animation ="none";
        methodique.style.display = 'none';
        plusOptions.style.display = 'none';
    }
}
//Pour les resultats textuels.
function getTexttualResults() {
    if (options > procedures) {
        plusOptions.style.display = 'block';
        plusOptions.style.animation ="fade-in .5s";
        methodique.style.display = 'none';
        methodique.style.animation ="fade-out .5s";
        equilibre.style.display = 'none';
        equilibre.style.animation ="fade-out .5s";
    }
    else if (options < procedures) {
        methodique.style.display = 'block';
        methodique.style.animation ="fade-in .5s";
        plusOptions.style.display = 'none';
        plusOptions.style.animation ="fade-out .5s";
        equilibre.style.display = 'none';
        equilibre.style.animation = "fade-out .5s";
    }
    else {
        equilibre.style.display = 'block';
        equilibre.style.animation = "fade-in .5s";
        methodique.style.display = 'none';
        methodique.style.animation ="fade-out .5s";
        plusOptions.style.display = 'none';
        plusOptions.style.animation ="fade-out .5s";
    }
}

//pour l'affichage des resultats.
function drawDiagram() {
    document.getElementById('resulatsId').style.display = 'block';
    document.getElementById('resulatsId').style.animation = "fade-in .5s"
    document.getElementById('options').style.height = 1.5 * options + 'rem';
    document.getElementById('procedures').style.height = 1.5 * procedures + 'rem';
    getTexttualResults();
}

//pour voir les resultats.
document.getElementById('boutonVoirResultats').onclick = function () {
let check = checkErrors();
    if (check === true) {
        getResults();
        drawDiagram();
    }
    else{
        document.getElementById('resulatsId').style.display = 'none';
        document.getElementById('resulatsId').style.animation = "fade-out .5s";
    }
}

//Pour imprimer.
document.getElementById('imprimerId').onclick = function () {
    window.print()
}

//Pour sauvegarder.
document.getElementById('sauvegarderId').onclick = function () {
    let element_html1 = document.getElementById('resulatsId');
    let element_html = document.querySelector('body');
    getTexttualResultsWithoutAnimation();
    element_html1.style.animation ="none";
     html2pdf().set({
        margin: 1,
        filename: 'mes_résultats.pdf',
        jsPDF: { unit: 'in' }
    }).from(element_html).save()
    .then(()=>{
        drawDiagram()

    });
    
}

// Pour surveiller les animations.
document.addEventListener('animationstart', function (e) {
    if (e.animationName === 'fade-in') {
        e.target.classList.add('did-fade-in');
    }
  });
  
  document.addEventListener('animationend', function (e) {
    if (e.animationName === 'fade-out') {
        e.target.classList.remove('did-fade-in');
     }
  });







