
upc = 2.2955871493926380


upcApp = {}

upcApp.interactions = {}
upcApp.interactionNumber = 1

upcApp.handleLayoutStyles = function() {
    upcApp.graphFontSizeSmall = 2.8;
    upcApp.graphFontSizeLarge = 4;
    upcApp.graphPointSize = 1.3;
    upcApp.parabolicCircleGraph = {}
    upcApp.parabolicCircleGraph["xmax"] = 1
    upcApp.parabolicCircleGraph["ymax"] = 4
    upcApp.parabolicCircleGraph["xmin"] = -1
    upcApp.parabolicCircleGraph["ymin"] = -1

    upcApp.parabolicImportantDimensionsGraph = {}
    upcApp.parabolicImportantDimensionsGraph["xmax"] = 1
    upcApp.parabolicImportantDimensionsGraph["ymax"] = 4
    upcApp.parabolicImportantDimensionsGraph["xmin"] = -1
    upcApp.parabolicImportantDimensionsGraph["ymin"] = -1
    

    upcApp.parabolicCircleGraph["point-label-gap"] = 0.2


    upcApp.parabolaIncreasingSlopeGraph = {}

    upcApp.parabolaIncreasingSlopeGraph["point-label-gap"] = 0.2

    if (window.innerWidth < 580) {
        upcApp.graphFontSizeSmall = 3.6;
        upcApp.graphFontSizeLarge = 5;
        upcApp.graphPointSize = 2.1;
        upcApp.parabolicCircleGraph["xmax"] = 1
        upcApp.parabolicCircleGraph["ymax"] = 5
        upcApp.parabolicCircleGraph["xmin"] = -1
        upcApp.parabolicCircleGraph["ymin"] = -1

        upcApp.parabolicImportantDimensionsGraph["xmax"] = 1
        upcApp.parabolicImportantDimensionsGraph["ymax"] = 8
        upcApp.parabolicImportantDimensionsGraph["xmin"] = -1
        upcApp.parabolicImportantDimensionsGraph["ymin"] = -3

        upcApp.parabolicCircleGraph["point-label-gap"] = 0.4

        upcApp.parabolaIncreasingSlopeGraph["point-label-gap"] = 0.2


        // document.getElementById('parabola-circle-compare-graphHolder-Enclosure').style.height = "400px";
        // document.getElementById('parabola-important-dimensions-graphHolder-Enclosure').style.width = "400px";
    }
}

upcApp.handleLayoutStyles()

upcApp.anim = {}

function loadAnimation() {
    var animationData = {
        container: document.getElementById('lottie-popper'),
        renderer: 'svg',
        loop: false,
        autoplay: false, 
        path: 'https://assets7.lottiefiles.com/packages/lf20_C51Bca6c0m.json' 
    };

    upcApp.anim = bodymovin.loadAnimation(animationData);

    upcApp.anim.addEventListener('complete', function() {
        upcApp.anim.hide();
    });
}

loadAnimation();



upcApp.inViewDetection = function(targetDiv, callback) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
                observer.unobserve(targetDiv);
            }
        });
    });

    observer.observe(targetDiv);
}




upcApp.revealPoint = 0

upcApp.revealSection = function() {
    upcApp.revealPoint = upcApp.revealPoint + 1
    toRevealElements = document.getElementsByClassName('reveal-' + upcApp.revealPoint)

    if (toRevealElements.length == 0) {
        return
    }
    else {
        document.getElementById('reveal-' + upcApp.revealPoint + "-continueButton").style.display = "none";

        upcApp.revealGap = 10

        upcApp.interactionNumber += 1
        dateTimeNow = new Date()
        upcApp.interactions[upcApp.interactionNumber] = {
            dateTime : dateTimeNow.toString(),
            "type": "reveal",
            "point": upcApp.revealPoint
        }

        // saveData()


        if (upcApp.revealPoint == 1) {
            setTimeout(function() {
                upcApp.chooseSection(1, 1);
                gph5.setUpShrinkingRandomWalk();
                gph5.interval = setInterval(gph5.nextValue, 1000);

            }, 1000);
        }
        else if (upcApp.revealPoint == 2) {
            setTimeout(function() {

            }, 1000);
            
        }
        else if (upcApp.revealPoint == 3) {
            setTimeout(function() {
                

            }, 1000);
            
        }
        else if (upcApp.revealPoint == 4) {
            setTimeout(function() {

            }, 1000);
            
        }
        else if (upcApp.revealPoint == 5) {
            setTimeout(function() {


            }, 1000);
            
        }
        else if (upcApp.revealPoint == 6) {
            setTimeout(function() {


            }, 1000);
            
        }
        else if (upcApp.revealPoint == 7) {
            setTimeout(function() {

            }, 1000);
            
        }
        else if (upcApp.revealPoint == 8) {
            setTimeout(function() {

            }, 1000);
            
        }
        else if (upcApp.revealPoint == 9) {
            setTimeout(function() {

            }, 1000);
            
        }
        else if (upcApp.revealPoint == 10) {
            setTimeout(function() {

            }, 1000);
            
        }
        else if (upcApp.revealPoint == 11) {
            setTimeout(function() {

            }, 1000);
            
        }

        for (i = 0; i < toRevealElements.length; i++) {
            (function(index) {
                toRevealElements[index].classList.remove("hidden-element");
                setTimeout(function() {
                    if (toRevealElements[index] != null) {
                        toRevealElements[index].style.opacity = 1;
                        if (index == 0) {
                            
                            toRevealElements[index].scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
                        }
                    }
                    
                }, 50 + index*upcApp.revealGap);
            })(i);
        }

    }

}


upcApp.revealSubSectionLib = {}
upcApp.revealSubSectionLib[1] = false
upcApp.revealSubSectionLib[2] = false

upcApp.revealSubSection = function(sectionNumber) {
    if (upcApp.revealSubSectionLib[sectionNumber] == false) {
        toRevealElements = document.getElementsByClassName('reveal-sub-section-' + sectionNumber)
        document.getElementById('reveal-sub-section-' + sectionNumber + "-continueButton").style.display = "none";

        for (i = 0; i < toRevealElements.length; i++) {
            (function(index) {
                toRevealElements[index].classList.remove("hidden-element");
                setTimeout(function() {
                    toRevealElements[index].style.opacity = 1;
                    if (index == 0) {
                        toRevealElements[index].scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
                    }
                }, 50 + index*upcApp.revealGap);
            })(i);
        }
    }
    

}

upcApp.extendSection = function(sectionNumber) {
    currentMaxHeight = document.getElementById('extender-section-' + sectionNumber + '').style.maxHeight
    if (currentMaxHeight == "100px") {
        document.getElementById('extender-section-' + sectionNumber + '').style.maxHeight = "none";
        document.getElementById('extender-section-' + sectionNumber + '').style.overflow = "visible";
        document.getElementById('extender-section-' + sectionNumber + '').style.height = "auto";
        document.getElementById('extender-section-' + sectionNumber + '-cover').style.display = "none";
        document.getElementById('extender-section-' + sectionNumber + "-chevron-down").classList.add("fa-angle-double-up");
        document.getElementById('extender-section-' + sectionNumber + "-chevron-down").classList.remove("fa-angle-double-down");
    }
    else {
        document.getElementById('extender-section-' + sectionNumber + '').style.maxHeight = "100px";
        document.getElementById('extender-section-' + sectionNumber + '').style.overflow = "hidden";
        document.getElementById('extender-section-' + sectionNumber + '').style.height = "100px";
        document.getElementById('extender-section-' + sectionNumber + '-cover').style.display = "block";
        document.getElementById('extender-section-' + sectionNumber + "-chevron-down").classList.remove("fa-angle-double-up");
        document.getElementById('extender-section-' + sectionNumber + "-chevron-down").classList.add("fa-angle-double-down");
    }
    
}

upcApp.chooseSection = function(rotatingSectionIndex, rotateToSection) {
    numberOfSections = document.getElementsByClassName('rotatingSection-' + rotatingSectionIndex).length
    for (s = 1; s <= numberOfSections; s++) {
        document.getElementById('rotatingSectionButton-' + rotatingSectionIndex + '-' + s).classList.add("inActiveSectionButton");
        document.getElementById('rotatingSection-' + rotatingSectionIndex + '-' + s).style.display = "none";
        sectionGraphs = document.getElementsByClassName('rotatingSectionGraph-' + rotatingSectionIndex + '-' + s)
        for (g = 1; g <= sectionGraphs.length; g++) {
            document.getElementById('rotatingSectionGraph-' + rotatingSectionIndex + '-' + s + '-' + g).style.position = "absolute";
            document.getElementById('rotatingSectionGraph-' + rotatingSectionIndex + '-' + s + '-' + g).style.left = "200vw";
        }
    }
    document.getElementById('rotatingSectionButton-' + rotatingSectionIndex + '-' + rotateToSection).classList.remove("inActiveSectionButton");
    document.getElementById('rotatingSection-' + rotatingSectionIndex + '-' + rotateToSection).style.display = "block";
    
    sectionGraphs = document.getElementsByClassName('rotatingSectionGraph-' + rotatingSectionIndex + '-' + rotateToSection)
    for (g = 1; g <= sectionGraphs.length; g++) {
        document.getElementById('rotatingSectionGraph-' + rotatingSectionIndex + '-' + rotateToSection + '-' + g).style.position = "relative";
        document.getElementById('rotatingSectionGraph-' + rotatingSectionIndex + '-' + rotateToSection + '-' + g).style.left = "0px";
    }


    if (rotatingSectionIndex == 1) {
        if (rotateToSection == 1) {
            if (typeof viewX.graphData['distance-between-center-and-any-point-graph'] != 'undefined') {
                viewX.removeGraph('distance-between-center-and-any-point-graph');
            }
            gph3.setUpDistanceBetweenCenterAndAnyPointInside();
        }
        else if (rotateToSection == 2) {
            if (typeof viewX.graphData['distance-between-corner-and-point-on-square-graph'] != 'undefined') {
                viewX.removeGraph('distance-between-corner-and-point-on-square-graph');
            }
            gph4.setUpDistanceBetweenCornerAnyPointOnSquare();
        }
    }
    
}

// First graph : upc-measurement-graph

defaultGraphOptions = {
    xmax: 1.1,
    xmin: -0.1,

    ymax: 1.1,
    ymin: -0.1,

    axislocationX: 0,
    axislocationY: 0,

    xaxislabelvisibility: 'no',
    yaxislabelvisibility: 'no',

    xaxisvisibility: 'no',
    yaxisvisibility: 'no',

    xmajorgridlabelvisibility: 'no',
    ymajorgridlabelvisibility: 'no',

    xmajorgridlinesvisibility: 'no',
    ymajorgridlinesvisibility: 'no',

    fontSize: 1.6,

    unitAspectRatio: 'yes',
    fixAxisStretchCentrally: 'yes',

    scrollZoom: "no",
}


// Code by GPT-4


gph0  = {}

gph0.initialSetup = function() {
    // var audio = document.getElementById("backgroundMusic");
    // audio.play();
}

gph0.initialSetup();


// Code For 1st Graph : the simple drag-drop

gph1 = {}

gph1.setUpSimpleDragDropPlay = function() {
    gph1.graphH = document.getElementById('animo-acid-dragdrop-graphHolder')
    viewX.addGraph(gph1.graphH, "distance-between-any-two-points-graph", defaultGraphOptions)

    rectOptions = { x: 0, y: 1, w: 1, h: 1, stroke: "var(--lightYellow)", strokewidth: 0.4, rectcolor: "hsla(190, 100%, 50%, 0)"};

    viewX.addRectangle("distance-between-any-two-points-graph", "distance-between-any-two-points-square", rectOptions);

    gph1.pointA = [0.2, 0.4]
    gph1.pointB = [0.8, 0.7]

    gph1.distanceText = viewX.distF(gph1.pointA, gph1.pointB).toFixed(3);

    lineOptions = { x1: gph1.pointA[0], y1: gph1.pointA[1], x2: gph1.pointB[0], y2:gph1.pointB[1], strokedasharray: "4,4", strokewidth: 0.7, linecolor: "var(--lightPink)"}; 
    viewX.addLine("distance-between-any-two-points-graph", "distance-between-any-two-points-distance-line", lineOptions);
    
    pointOptions = {x: gph1.pointA[0], y: gph1.pointA[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightBlue)'};
    viewX.addPoint("distance-between-any-two-points-graph", "distance-between-any-two-points-point-A", pointOptions);
    pointOptions = {x: gph1.pointA[0], y: gph1.pointA[1], pointsize: upcApp.graphPointSize*3, pointcolor: 'transparent', draggability: "yes", runFunctionDuringDrag: "gph1.onPointDrag()"};
    viewX.addPoint("distance-between-any-two-points-graph", "distance-between-any-two-points-point-A-dragger", pointOptions);
    textOptions = {x: gph1.pointA[0] + 0.05, y: gph1.pointA[1] - 0.08, text: "A",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightBlue)"};
    viewX.addText("distance-between-any-two-points-graph", "distance-between-any-two-points-point-A-label", textOptions);

    pointOptions = { x: gph1.pointB[0], y: gph1.pointB[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)'};
    viewX.addPoint("distance-between-any-two-points-graph", "distance-between-any-two-points-point-B", pointOptions);
    pointOptions = { x: gph1.pointB[0], y: gph1.pointB[1], pointsize: upcApp.graphPointSize*3, pointcolor: 'transparent', draggability: "yes", runFunctionDuringDrag: "gph1.onPointDrag()"};
    viewX.addPoint("distance-between-any-two-points-graph", "distance-between-any-two-points-point-B-dragger", pointOptions);
    textOptions = {x: gph1.pointB[0] + 0.05, y: gph1.pointB[1] - 0.08, text: "B",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightPurple)"};
    viewX.addText("distance-between-any-two-points-graph", "distance-between-any-two-points-point-B-label", textOptions);

    textOptions = {x: (gph1.pointA[0] + gph1.pointB[0])/2, y: (gph1.pointA[1] + gph1.pointB[1])/2, text: gph1.distanceText,  textAlign: "center",  fontSize: upcApp.graphFontSizeSmall, fontFamily: "Nunito",   textcolor: "var(--lightPink)"};
    viewX.addText("distance-between-any-two-points-graph", "distance-between-any-two-points-distance-label", textOptions);
}


gph1.setUpSimpleDragDropPlay();

gph1.onPointDrag = function() {
    
    gph1.movedLocationA = viewX.graphData["distance-between-any-two-points-graph"].pointData["distance-between-any-two-points-point-A-dragger"][1]

    gph1.movedLocationB = viewX.graphData["distance-between-any-two-points-graph"].pointData["distance-between-any-two-points-point-B-dragger"][1]

    gph1.point1 = [gph1.movedLocationA.x, gph1.movedLocationA.y]
    gph1.point2 = [gph1.movedLocationB.x, gph1.movedLocationB.y]

    gph1.distanceText = viewX.distF(gph1.point1, gph1.point2).toFixed(3);

    lineOptions = { x1: gph1.point1[0], y1: gph1.point1[1], x2: gph1.point2[0], y2:gph1.point2[1]}; 
    viewX.updateLine("distance-between-any-two-points-graph", "distance-between-any-two-points-distance-line", lineOptions);
    
    viewX.updatePointXY("distance-between-any-two-points-graph", "distance-between-any-two-points-point-A", gph1.point1[0], gph1.point1[1]);
    viewX.updatePointXY("distance-between-any-two-points-graph", "distance-between-any-two-points-point-B", gph1.point2[0], gph1.point2[1]);

    textOptions = {x: gph1.point1[0] + 0.05, y: gph1.point1[1] - 0.08};
    viewX.updateText("distance-between-any-two-points-graph", "distance-between-any-two-points-point-A-label", textOptions);

    textOptions = {x: gph1.point2[0] + 0.05, y: gph1.point2[1] - 0.08};
    viewX.updateText("distance-between-any-two-points-graph", "distance-between-any-two-points-point-B-label", textOptions);

    textOptions = {x: (gph1.point1[0] + gph1.point2[0])/2, y: (gph1.point1[1] + gph1.point2[1])/2, text: gph1.distanceText};
    viewX.updateText("distance-between-any-two-points-graph", "distance-between-any-two-points-distance-label", textOptions);


}

// var sliderProperties = {
//     minwidth: '200px',
//     width: '50%',
//     height: 5,
//     trackColor: "hsla(280, 0%, 20%, 0.7)",
//     trackFillColor: "var(--lightPink)",
//     thumbWidth: 15,
//     thumbHeight: 15,
//     thumbColor: "var(--lightPink)",
//     opacity: 0.7
// };

// viewX.generateSliderStyles(sliderProperties, "distance-between-any-two-points-Slider");






gph1.aminoAcid = {
    "A": {
        "name": "Alanine",
        "residue_mass": 71.03711,
        "short_name": "Ala"
    },
    "R": {
        "name": "Arginine",
        "residue_mass": 156.10111,
        "short_name": "Arg"
    },
    "N": {
        "name": "Asparagine",
        "residue_mass": 114.04293,
        "short_name": "Asn"
    },
    "D": {
        "name": "Aspartic acid",
        "residue_mass": 115.02694,
        "short_name": "Asp"
    },
    "C": {
        "name": "Cysteine",
        "residue_mass": 103.00919,
        "short_name": "Cys"
    },
    "E": {
        "name": "Glutamic acid",
        "residue_mass": 129.04259,
        "short_name": "Glu"
    },
    "Q": {
        "name": "Glutamine",
        "residue_mass": 128.05858,
        "short_name": "Gln"
    },
    "G": {
        "name": "Glycine",
        "residue_mass": 57.02146,
        "short_name": "Gly"
    },
    "H": {
        "name": "Histidine",
        "residue_mass": 137.05891,
        "short_name": "His"
    },
    "I": {
        "name": "Isoleucine",
        "residue_mass": 113.08406,
        "short_name": "Ile"
    },
    "L": {
        "name": "Leucine",
        "residue_mass": 113.08406,
        "short_name": "Leu"
    },
    "K": {
        "name": "Lysine",
        "residue_mass": 128.09496,
        "short_name": "Lys"
    },
    "M": {
        "name": "Methionine",
        "residue_mass": 131.04049,
        "short_name": "Met"
    },
    "F": {
        "name": "Phenylalanine",
        "residue_mass": 147.06841,
        "short_name": "Phe"
    },
    "P": {
        "name": "Proline",
        "residue_mass": 97.05276,
        "short_name": "Pro"
    },
    "S": {
        "name": "Serine",
        "residue_mass": 87.03203,
        "short_name": "Ser"
    },
    "T": {
        "name": "Threonine",
        "residue_mass": 101.04768,
        "short_name": "Thr"
    },
    "W": {
        "name": "Tryptophan",
        "residue_mass": 186.07931,
        "short_name": "Trp"
    },
    "Y": {
        "name": "Tyrosine",
        "residue_mass": 163.06333,
        "short_name": "Tyr"
    },
    "V": {
        "name": "Valine",
        "residue_mass": 99.06841,
        "short_name": "Val"
    }
}

gph1.generateMZValuesForPeptide = function(peptideName, conditions) {
    spectralValues = {}

    spectralValues.peptideName = peptideName
    spectralValues.b_ions = {}

    if (typeof conditions == 'undefined') {
        conditions = {}
    }

    if (typeof conditions['charge'] == 'undefined') {
        conditions['charge'] = 1
    }

    n_terminal_mass = 1.007825
    c_terminal_mass = 17.00274 + 1.007825 + 1.007825

    spectralValues.b_ion_init = n_terminal_mass/conditions['charge']
    spectralValues.y_ion_init = c_terminal_mass/conditions['charge']

    for (aindex = 0; aindex < peptideName.length; aindex++) {
        aminoAcid = peptideName[aindex].toString().toUpperCase()
        
        if (typeof gph1.aminoAcid[aminoAcid] != 'undefined') {
            if (aindex == 0)   {
                spectralValues.b_ions[aindex] = {
                    "mzValue" : (gph1.aminoAcid[aminoAcid].residue_mass + n_terminal_mass)/conditions['charge'],
                    "name" : "b" + (aindex + 1),
                    "intensity": 1,
                    "residue": aminoAcid
                }
            }
            else if (aindex == peptideName.length - 1) {
                spectralValues.b_ions[aindex] = {
                    "mzValue" : (gph1.aminoAcid[aminoAcid].residue_mass + spectralValues.b_ions[aindex - 1].mzValue)/conditions['charge'],
                    "name" : "b" + (aindex + 1),
                    "intensity": 1,
                    "residue": aminoAcid
                }
            }
            else {
                spectralValues.b_ions[aindex] = {
                    "mzValue" : (gph1.aminoAcid[aminoAcid].residue_mass + spectralValues.b_ions[aindex - 1].mzValue)/conditions['charge'],
                    "name" : "b" + (aindex + 1),
                    "intensity": 1,
                    "residue": aminoAcid
                }
            }
        }
        else {
            console.error("No amino acid", aminoAcid, "found in the database.")
        }
    }

    spectralValues.y_ions = {}
    for (aindex = peptideName.length - 1; aindex >= 0; aindex--) {
        aminoAcid = peptideName[aindex].toString().toUpperCase()
        
        currentIndex = (aindex - peptideName.length)*(-1)
        if (typeof gph1.aminoAcid[aminoAcid] != 'undefined') {
            if (aindex == peptideName.length - 1) {
                spectralValues.y_ions[aindex] = {
                    "mzValue" : (gph1.aminoAcid[aminoAcid].residue_mass + c_terminal_mass)/conditions['charge'],
                    "name" : "y" + currentIndex,
                    "intensity": 1,
                    "residue": aminoAcid
                }
            }
            else {
                spectralValues.y_ions[aindex] = {
                    "mzValue" : (gph1.aminoAcid[aminoAcid].residue_mass + spectralValues.y_ions[aindex + 1].mzValue)/conditions['charge'],
                    "name" : "y" + currentIndex,
                    "intensity": 1,
                    "residue": aminoAcid
                }
            }
        }
        else {
            console.error("No amino acid", aminoAcid, "found in the database.")
        }
    }

    spectralValues.conditions = conditions
    return spectralValues
}

specValues = gph1.generateMZValuesForPeptide("ADITI")

gph1.matchValues = function(fittingAminoAcid, fittingStart, spectralValues) {
    fittingEnd = fittingStart + (gph1.aminoAcid[fittingAminoAcid].residue_mass/spectralValues.conditions['charge'])

    allowedError = 0.02
    startingMatch = []

    if (Math.abs(spectralValues.b_ion_init - fittingStart) < allowedError) {
        startingMatch.push({"mzValue": spectralValues.b_ion_init, "name": "b0", "intensity": 0, "residue": "N/A"})
    }

    for (var ionIndex in spectralValues.b_ions) {
        ion = spectralValues.b_ions[ionIndex]
        if (Math.abs(ion.mzValue - fittingStart) < allowedError) {
            startingMatch.push(ion)
        }
    }


    endingMatch = []

    
    for (var ionIndex in spectralValues.b_ions) {
        end_ion = spectralValues.b_ions[ionIndex]
        if (Math.abs(end_ion.mzValue - fittingEnd) < allowedError) {
            endingMatch.push(end_ion)
        }
    }



    fullMatch = {}

    if (startingMatch.length > 0 && endingMatch.length > 0) {
        fullMatch = {
            'start': startingMatch[0].mzValue,
            'end': endingMatch[0].mzValue,
            'residue': endingMatch[0].residue
        }
    }

    return fullMatch

}

matchFound = gph1.matchValues("D", 72.03, specValues)

console.log(matchFound)