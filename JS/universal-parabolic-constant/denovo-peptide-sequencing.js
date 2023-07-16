
denovoApp = {}

denovoApp.interactions = {}
denovoApp.interactionNumber = 1

denovoApp.handleLayoutStyles = function() {
    denovoApp.graphFontSizeSmall = 2.8;
    denovoApp.graphFontSizeLarge = 4;
    denovoApp.graphPointSize = 1.3;
    denovoApp.parabolicCircleGraph = {}
    denovoApp.parabolicCircleGraph["xmax"] = 1
    denovoApp.parabolicCircleGraph["ymax"] = 4
    denovoApp.parabolicCircleGraph["xmin"] = -1
    denovoApp.parabolicCircleGraph["ymin"] = -1

    denovoApp.parabolicImportantDimensionsGraph = {}
    denovoApp.parabolicImportantDimensionsGraph["xmax"] = 1
    denovoApp.parabolicImportantDimensionsGraph["ymax"] = 4
    denovoApp.parabolicImportantDimensionsGraph["xmin"] = -1
    denovoApp.parabolicImportantDimensionsGraph["ymin"] = -1
    

    denovoApp.parabolicCircleGraph["point-label-gap"] = 0.2


    denovoApp.parabolaIncreasingSlopeGraph = {}

    denovoApp.parabolaIncreasingSlopeGraph["point-label-gap"] = 0.2

    if (window.innerWidth < 580) {
        denovoApp.graphFontSizeSmall = 3.6;
        denovoApp.graphFontSizeLarge = 5;
        denovoApp.graphPointSize = 2.1;
        denovoApp.parabolicCircleGraph["xmax"] = 1
        denovoApp.parabolicCircleGraph["ymax"] = 5
        denovoApp.parabolicCircleGraph["xmin"] = -1
        denovoApp.parabolicCircleGraph["ymin"] = -1

        denovoApp.parabolicImportantDimensionsGraph["xmax"] = 1
        denovoApp.parabolicImportantDimensionsGraph["ymax"] = 8
        denovoApp.parabolicImportantDimensionsGraph["xmin"] = -1
        denovoApp.parabolicImportantDimensionsGraph["ymin"] = -3

        denovoApp.parabolicCircleGraph["point-label-gap"] = 0.4

        denovoApp.parabolaIncreasingSlopeGraph["point-label-gap"] = 0.2


        // document.getElementById('parabola-circle-compare-graphHolder-Enclosure').style.height = "400px";
        // document.getElementById('parabola-important-dimensions-graphHolder-Enclosure').style.width = "400px";
    }
}

denovoApp.handleLayoutStyles()

denovoApp.anim = {}

function loadAnimation() {
    var animationData = {
        container: document.getElementById('lottie-popper'),
        renderer: 'svg',
        loop: false,
        autoplay: false, 
        path: 'https://assets7.lottiefiles.com/packages/lf20_C51Bca6c0m.json' 
    };

    denovoApp.anim = bodymovin.loadAnimation(animationData);

    denovoApp.anim.addEventListener('complete', function() {
        denovoApp.anim.hide();
    });
}

loadAnimation();



denovoApp.inViewDetection = function(targetDiv, callback) {
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


function findClosestEntry(value, array) {
    // Set initial values
    let closestEntry = array[0];
    let minDifference = Math.abs(value - closestEntry);
  
    // Iterate through the array
    for (let i = 1; i < array.length; i++) {
      let difference = Math.abs(value - array[i]);
  
      // Update closestEntry if the current entry is closer to the value
      if (difference < minDifference) {
        closestEntry = array[i];
        minDifference = difference;
      }
    }
  
    return closestEntry;
  }

denovoApp.revealPoint = 0

denovoApp.revealSection = function() {
    denovoApp.revealPoint = denovoApp.revealPoint + 1
    toRevealElements = document.getElementsByClassName('reveal-' + denovoApp.revealPoint)

    if (toRevealElements.length == 0) {
        return
    }
    else {
        document.getElementById('reveal-' + denovoApp.revealPoint + "-continueButton").style.display = "none";

        denovoApp.revealGap = 10

        denovoApp.interactionNumber += 1
        dateTimeNow = new Date()
        denovoApp.interactions[denovoApp.interactionNumber] = {
            dateTime : dateTimeNow.toString(),
            "type": "reveal",
            "point": denovoApp.revealPoint
        }

        // saveData()


        if (denovoApp.revealPoint == 1) {
            setTimeout(function() {
                denovoApp.chooseSection(1, 1);
                gph5.setUpShrinkingRandomWalk();
                gph5.interval = setInterval(gph5.nextValue, 1000);

            }, 1000);
        }
        else if (denovoApp.revealPoint == 2) {
            setTimeout(function() {

            }, 1000);
            
        }
        else if (denovoApp.revealPoint == 3) {
            setTimeout(function() {
                

            }, 1000);
            
        }
        else if (denovoApp.revealPoint == 4) {
            setTimeout(function() {

            }, 1000);
            
        }
        else if (denovoApp.revealPoint == 5) {
            setTimeout(function() {


            }, 1000);
            
        }
        else if (denovoApp.revealPoint == 6) {
            setTimeout(function() {


            }, 1000);
            
        }
        else if (denovoApp.revealPoint == 7) {
            setTimeout(function() {

            }, 1000);
            
        }
        else if (denovoApp.revealPoint == 8) {
            setTimeout(function() {

            }, 1000);
            
        }
        else if (denovoApp.revealPoint == 9) {
            setTimeout(function() {

            }, 1000);
            
        }
        else if (denovoApp.revealPoint == 10) {
            setTimeout(function() {

            }, 1000);
            
        }
        else if (denovoApp.revealPoint == 11) {
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
                    
                }, 50 + index*denovoApp.revealGap);
            })(i);
        }

    }

}


denovoApp.revealSubSectionLib = {}
denovoApp.revealSubSectionLib[1] = false
denovoApp.revealSubSectionLib[2] = false

denovoApp.revealSubSection = function(sectionNumber) {
    if (denovoApp.revealSubSectionLib[sectionNumber] == false) {
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
                }, 50 + index*denovoApp.revealGap);
            })(i);
        }
    }
    

}

denovoApp.extendSection = function(sectionNumber) {
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

denovoApp.chooseSection = function(rotatingSectionIndex, rotateToSection) {
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

                spectralValues.b_max = spectralValues.b_ions[aindex].mzValue
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

                if (aindex == 0) {
                    spectralValues.y_max = spectralValues.y_ions[aindex].mzValue
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

gph1.matchValues = function(fittingAminoAcid, fittingStart, spectralValues) {
    fittingEnd = fittingStart + (gph1.aminoAcid[fittingAminoAcid].residue_mass/spectralValues.conditions['charge'])

    allowedError = 0.01
    startingMatch = []

    if (Math.abs(spectralValues.b_ion_init - fittingStart) < allowedError) {
        startingMatch.push({"mzValue": spectralValues.b_ion_init, "name": "b0", "intensity": 0, "residue": "N/A", "start_ion": -1})
    }

    for (var ionIndex in spectralValues.b_ions) {
        ion = spectralValues.b_ions[ionIndex]
        if (Math.abs(ion.mzValue - fittingStart) < allowedError) {
            ion['index'] = ionIndex
            startingMatch.push(ion)
            
        }
    }


    endingMatch = []

    
    for (var ionIndex in spectralValues.b_ions) {
        end_ion = spectralValues.b_ions[ionIndex]
        if (Math.abs(end_ion.mzValue - fittingEnd) < allowedError) {
            end_ion['index'] = ionIndex
            endingMatch.push(end_ion)
        }
    }



    fullMatch = {}

    if (startingMatch.length > 0 && endingMatch.length > 0) {
        fullMatch = {
            'start': startingMatch[0].mzValue,
            'start_index': startingMatch[0].index,
            'end': endingMatch[0].mzValue,
            'end_index': endingMatch[0].index,
            'residue': endingMatch[0].residue
        }
    }

    return fullMatch

}

// matchFound = gph1.matchValues("D", 72.03, specValues)

// console.log(matchFound)


gph1.addBlocks = function() {
    peptideBlocksOptionsToAdd = Object.keys(gph1.aminoAcid).reverse().join("")

    for (addIndex = 0; addIndex < peptideBlocksOptionsToAdd.length; addIndex++) {
        letterToAdd = peptideBlocksOptionsToAdd[addIndex]

        gph1.game.hasBlockInStagingArea[letterToAdd] = ''

        gph1.addBlock(letterToAdd, gph1.game.blockDefault[letterToAdd])
    }
}


gph1.addBlock = function(letterToAdd, positionProperties) {
    gph1.game.blockID = gph1.game.blockID + 1

    if (typeof gph1.aminoAcid[letterToAdd] != 'undefined' && gph1.game.hasBlockInStagingArea[letterToAdd] == '') {

        gph1.game.hasBlockInStagingArea[letterToAdd] = gph1.game.blockID
        
        gph1.game.blocks[gph1.game.blockID] = {}
        
        gph1.game.blocks[gph1.game.blockID].x = positionProperties.x
        gph1.game.blocks[gph1.game.blockID].y = positionProperties.y
        gph1.game.blocks[gph1.game.blockID].w = positionProperties.w
        gph1.game.blocks[gph1.game.blockID].h = positionProperties.h

        gph1.game.blocks[gph1.game.blockID].color = positionProperties.colorByMass

        gph1.game.blocks[gph1.game.blockID].aminoAcid = letterToAdd

        peptideBlockOptions = {x: gph1.game.blocks[gph1.game.blockID].x, y: gph1.game.blocks[gph1.game.blockID].y, w: gph1.game.blocks[gph1.game.blockID].w, h:gph1.game.blocks[gph1.game.blockID].h, strokewidth: 0, stroke: "transparent", rectcolor: "hsla(" + gph1.game.blocks[gph1.game.blockID].color + ", 100%, 80%, 0.2)"};
        addedBlockRect = viewX.addRectangle("amino-acid-drag-drop-graph", "amino-acid-drag-drop-peptide-block-" + gph1.game.blockID, peptideBlockOptions);

        // addedBlockRect[0].innerHTML = "/assets/images/denovo-blog/test.svg"

        // console.log(addedBlockRect[0].style)

        textOptions = {x: gph1.game.blocks[gph1.game.blockID].x + (gph1.game.blocks[gph1.game.blockID].w/2), y: gph1.game.blocks[gph1.game.blockID].y - 0.01 - 0.015, text: letterToAdd,  textAlign: "center",  fontSize: denovoApp.graphFontSizeSmall*0.7, fontFamily: "Gaegu",   textcolor: "white"};

        viewX.addText("amino-acid-drag-drop-graph", "amino-acid-drag-drop-peptide-block-label-" + gph1.game.blockID, textOptions);

        pointOptions = {x: gph1.game.blocks[gph1.game.blockID].x  + (gph1.game.blocks[gph1.game.blockID].w/2), y: gph1.game.blocks[gph1.game.blockID].y - (gph1.game.blocks[gph1.game.blockID].h/2), pointsize: denovoApp.graphPointSize, pointcolor: "hsla(" + gph1.game.blocks[gph1.game.blockID].color + ", 100%, 80%, 0)", draggability: "yes", runFunctionDuringDrag: "gph1.onPointDrag()", runFunctionOnDragEnd: "gph1.onPointDragEnd()"};
        viewX.addPoint("amino-acid-drag-drop-graph", "amino-acid-drag-drop-dragpoint-" + gph1.game.blockID, pointOptions);

        textOptions = {x: gph1.game.blocks[gph1.game.blockID].x + (gph1.game.blocks[gph1.game.blockID].w/2), y: gph1.game.blocks[gph1.game.blockID].y - gph1.game.blocks[gph1.game.blockID].h - 0.03, text: gph1.game.blockDefault[letterToAdd]['representingMass'].toFixed(2),  textAlign: "center",  fontSize: denovoApp.graphFontSizeSmall*0.6, fontFamily: "Gaegu",  textcolor: "white", opacity: 0};

        viewX.addText("amino-acid-drag-drop-graph", "amino-acid-drag-drop-peptide-block-datalabel-" + gph1.game.blockID, textOptions);

    }
    
}


gph1.removeBlock = function(blockIDValue) {

    if (typeof gph1.aminoAcid[letterToAdd] != 'undefined') {
        gph1.game.blocks[blockIDValue] = {}
        
        viewX.removeRectangle("amino-acid-drag-drop-graph", "amino-acid-drag-drop-peptide-block-" +  blockIDValue);
        viewX.removeText("amino-acid-drag-drop-graph", "amino-acid-drag-drop-peptide-block-label-" + blockIDValue);
        viewX.removePoint("amino-acid-drag-drop-graph", "amino-acid-drag-drop-dragpoint-" + blockIDValue);
        viewX.removeText("amino-acid-drag-drop-graph", "amino-acid-drag-drop-peptide-block-datalabel-" + blockIDValue);

    }
    
}


gph1.moveBlock = function(blockID, coloringDetails) {
    letterToAdd =  gph1.game.blocks[blockID].aminoAcid
    

    for (var position_value in gph1.game.solved) {
        if (gph1.game.solved[position_value] == blockID) {
            gph1.game.solved[position_value] = ''
        }
    }

    peptideBlockOptions = {x: gph1.game.blocks[blockID].x, y: gph1.game.blocks[blockID].y};

    if (typeof coloringDetails != 'undefined') {
        peptideBlockOptions['rectcolor'] = "hsla(" + gph1.game.blockDefault[letterToAdd]['colorByMass'] + ", 100%, 80%, " + coloringDetails['block_opacity'] + ")"
    }
    else {
        peptideBlockOptions['rectcolor'] = "hsla(" + gph1.game.blockDefault[letterToAdd]['colorByMass'] + ", 100%, 80%, 0.2)"
    }


    viewX.updateRectangle("amino-acid-drag-drop-graph", "amino-acid-drag-drop-peptide-block-" + blockID, peptideBlockOptions);


    textOptions = {x: gph1.game.blocks[blockID].x + (gph1.game.blocks[blockID].w/2), y: gph1.game.blocks[blockID].y - 0.01 - 0.015};

    if (typeof coloringDetails != 'undefined') {
        textOptions['textcolor'] = "black"
        textOptions['fontweight'] = "bold"
    }               
    else {
        textOptions['textcolor'] = "white"
        textOptions['fontweight'] = "normal"
    }


    viewX.updateText("amino-acid-drag-drop-graph", "amino-acid-drag-drop-peptide-block-label-" + blockID, textOptions);

    pointOptions = {x: gph1.game.blocks[blockID].x  + (gph1.game.blocks[blockID].w/2), y: gph1.game.blocks[blockID].y - (gph1.game.blocks[blockID].h/2)};
    viewX.updatePointXY("amino-acid-drag-drop-graph", "amino-acid-drag-drop-dragpoint-" + blockID, pointOptions.x, pointOptions.y);

    textOptions = {x: gph1.game.blocks[blockID].x + (gph1.game.blocks[blockID].w/2), y: gph1.game.blocks[blockID].y - gph1.game.blocks[blockID].h - 0.03, opacity: 0.6};

    viewX.updateText("amino-acid-drag-drop-graph", "amino-acid-drag-drop-peptide-block-datalabel-" + blockID, textOptions);

    
    if (gph1.game.blocks[blockID].y < 0.6) {
        if (gph1.game.hasBlockInStagingArea[letterToAdd] == blockID) {
            gph1.game.hasBlockInStagingArea[letterToAdd] = ''
            gph1.addBlock(letterToAdd, gph1.game.blockDefault[letterToAdd])
        }

    }
    else {
        if (gph1.game.hasBlockInStagingArea[letterToAdd] != blockID) {
            gph1.removeBlock(gph1.game.hasBlockInStagingArea[letterToAdd])
            gph1.game.hasBlockInStagingArea[letterToAdd] = blockID
        }
    }

    
}

gph1.setUpSimpleDragDropPlay = function(sequenceChosen) {

    gph1.game = {}
    gph1.game.blockDefault = {}
    
    gph1.game.blocks = {}
    gph1.game.blockID = 1

    gph1.game.hasBlockInStagingArea = {}
    gph1.game.solved = {}



    gph1.graphH = document.getElementById('animo-acid-dragdrop-graphHolder')
    viewX.addGraph(gph1.graphH, "amino-acid-drag-drop-graph", defaultGraphOptions)

    var arrowOptions = {
        from: [0, 0],
        to: [1.1, 0],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)"
    };
    arrow = viewX.addArrow("amino-acid-drag-drop-graph", "spectra-x-axis-arrow", arrowOptions);


    
    gph1.specValues = gph1.generateMZValuesForPeptide(sequenceChosen)
    gph1.game.solved = {}

    gph1.currentPeptide = sequenceChosen
    for (l = 0; l < gph1.currentPeptide.length; l++) {
        gph1.game.solved[l] = ''
    }


    allAminoAcids = Object.keys(gph1.aminoAcid).reverse().join("")

    aminoAcidMasses = Object.values(gph1.aminoAcid).map(obj => obj.residue_mass)
    maxAminoAcidMass = Math.max(...aminoAcidMasses)
    minAminoAcidMass = Math.min(...aminoAcidMasses)

    blockXPositioning = 0
    rowNumber = 0.7

    
    for (addIndex = 0; addIndex < allAminoAcids.length; addIndex++) {
        letterToAdd = allAminoAcids[addIndex]

        if (typeof gph1.aminoAcid[letterToAdd] != 'undefined') {
            gph1.game.blockDefault[letterToAdd] = {}
            spacer = 0.05
            expectedWidth = gph1.aminoAcid[letterToAdd].residue_mass/gph1.specValues.b_max
            
            colorPositionByPosition = 180 + Object.keys(gph1.aminoAcid).indexOf(letterToAdd)*180/Object.keys(gph1.aminoAcid).length
            colorPositionByMass = viewX.linearValue(minAminoAcidMass, maxAminoAcidMass, 180, 430, gph1.aminoAcid[letterToAdd].residue_mass)

            gph1.game.blockDefault[letterToAdd]['colorByMass'] = colorPositionByMass
            gph1.game.blockDefault[letterToAdd]['colorByPosition'] = colorPositionByPosition
            gph1.game.blockDefault[letterToAdd]['x'] = blockXPositioning
            gph1.game.blockDefault[letterToAdd]['y'] = rowNumber
            gph1.game.blockDefault[letterToAdd]['w'] = expectedWidth
            gph1.game.blockDefault[letterToAdd]['h'] = 0.035

            gph1.game.blockDefault[letterToAdd]['representingMass'] = gph1.aminoAcid[letterToAdd].residue_mass

            blockXPositioning = expectedWidth + blockXPositioning + spacer

            if (blockXPositioning > 1) {
                blockXPositioning = 0
                rowNumber = rowNumber + 0.06
            }
            
        }
    }

    currentMark = gph1.specValues.b_ion_init/gph1.specValues.b_max
    lineOptions = { x1: gph1.specValues.b_ion_init/gph1.specValues.b_max, y1: 0.6, x2: gph1.specValues.b_ion_init/gph1.specValues.b_max, y2: 0.01, strokedasharray: "4,4", strokewidth: 0.7, linecolor: "hsla(0, 0%, 80%, 0.4)"}; 
    viewX.addLine("amino-acid-drag-drop-graph", "amino-acid-drag-drop-line-b_ion_init", lineOptions);


    textOptions = {x: currentMark, y: -0.05, text: gph1.specValues.b_ion_init.toFixed(2),  textAlign: "center",  fontSize: denovoApp.graphFontSizeSmall*0.9, fontFamily: "Gaegu",   textcolor: "hsla(0, 0%, 80%, 0.4)"};
    viewX.addText("amino-acid-drag-drop-graph", "amino-acid-drag-drop-label-b_ion_init", textOptions);

    for (var ionIndex in gph1.specValues.b_ions) {
        ion = gph1.specValues.b_ions[ionIndex]
        scaledMZ = ion.mzValue/gph1.specValues.b_max

        rectOptions = {x: currentMark, y: 0.4, w: ion.mzValue/gph1.specValues.b_max - currentMark, h: 0.035, strokewidth: 0, rectcolor: "hsla(0, 0%, 0%, 0.5)", stroke: "transparent"};
        currentMark = ion.mzValue/gph1.specValues.b_max

        viewX.addRectangle("amino-acid-drag-drop-graph", "amino-acid-drag-drop-dropLocation-" + ion.name, rectOptions);


        lineOptions = { x1: scaledMZ, y1: 0.6, x2: scaledMZ, y2: 0.2, strokedasharray: "4,4", strokewidth: 0.7, linecolor: "var(--writingGrey)"}; 
        viewX.addLine("amino-acid-drag-drop-graph", "amino-acid-drag-drop-line-" + ion.name, lineOptions);

        bar_width = 0.01
        rectOptions = {x: scaledMZ - (bar_width/2), y: 0.01 + 0.17, w: bar_width, h: 0.17, strokewidth: 0, rectcolor: "var(--lightGreen)"};

        viewX.addRectangle("amino-acid-drag-drop-graph", "amino-acid-drag-drop-intensity-" + ion.name, rectOptions);

        textOptions = {x: scaledMZ, y: -0.05, text: ion.mzValue.toFixed(1),  textAlign: "center",  fontSize: denovoApp.graphFontSizeSmall*0.9, fontFamily: "Gaegu",   textcolor: "white"};
        viewX.addText("amino-acid-drag-drop-graph", "amino-acid-drag-drop-mz-label-" + ion.name, textOptions);

        
    }
    
    // peptideBlocksOptionsToAdd = "ADITI" + Object.keys(gph1.aminoAcid).join("")
    // peptideBlocksOptionsToAdd = Object.keys(gph1.aminoAcid).reverse().join("")

    // peptideBlocksOptionsToAdd = viewX.shuffle(peptideBlocksOptionsToAdd.split("")).join("")

    gph1.addBlocks()

    
    

}


gph1.setUpSimpleDragDropPlay('ADITI');

gph1.onPointDragEnd = function() {
    gph1.movingPointID = viewX.currentMovingPoint.id
    gph1.movingBlockID = gph1.movingPointID.split("-").slice(-1)[0]

    gph1.movedPoint = viewX.graphData["amino-acid-drag-drop-graph"].pointData["amino-acid-drag-drop-dragpoint-" + gph1.movingBlockID][1]

    gph1.game.blocks[gph1.movingBlockID].x = gph1.movedPoint.x - (gph1.game.blocks[gph1.movingBlockID].w/2)
    gph1.game.blocks[gph1.movingBlockID].y = gph1.movedPoint.y + (gph1.game.blocks[gph1.movingBlockID].h/2)

    if (gph1.movedPoint.y > 0.6) {
        textOptions = {opacity: 0};
    }
    else {
        textOptions = {opacity: 1};
    }


    viewX.updateText("amino-acid-drag-drop-graph", "amino-acid-drag-drop-peptide-block-datalabel-" + gph1.movingBlockID, textOptions);




    if (gph1.movedPoint.y < 0.6) {
        snapToLineBy = 0.05

        valuesToSnapTo = []
        valuesToSnapTo.push(gph1.specValues.b_ion_init/gph1.specValues.b_max)
        for (var ionIndex in gph1.specValues.b_ions) {
            ion = gph1.specValues.b_ions[ionIndex]
            valuesToSnapTo.push(ion.mzValue/gph1.specValues.b_max)
        }

        closestValueForStart = findClosestEntry(gph1.game.blocks[gph1.movingBlockID].x, valuesToSnapTo)
        closestValueForEnd = findClosestEntry(gph1.game.blocks[gph1.movingBlockID].x + gph1.game.blocks[gph1.movingBlockID].w, valuesToSnapTo)
        
        if (Math.abs(closestValueForStart - gph1.game.blocks[gph1.movingBlockID].x) < snapToLineBy) {
            gph1.game.blocks[gph1.movingBlockID].x = closestValueForStart
        }
        else if (Math.abs(closestValueForEnd - (gph1.game.blocks[gph1.movingBlockID].x + gph1.game.blocks[gph1.movingBlockID].w)) < snapToLineBy) {
            gph1.game.blocks[gph1.movingBlockID].x = closestValueForEnd - gph1.game.blocks[gph1.movingBlockID].w
        }


        gph1.moveBlock(gph1.movingBlockID)


        currentMatch = gph1.matchValues(gph1.game.blocks[gph1.movingBlockID].aminoAcid, gph1.game.blocks[gph1.movingBlockID].x*gph1.specValues.b_max, gph1.specValues)


        if (currentMatch['residue'] == gph1.game.blocks[gph1.movingBlockID].aminoAcid) {
            console.log("Perfect Match Found")
            // gph1.game.blocks[gph1.movingBlockID].x = currentMatch['start']*gph1.specValues.b_max

        }

        if (typeof currentMatch['start'] != 'undefined' && typeof currentMatch['end'] != 'undefined') {
            console.log("Match Found")
            if (gph1.game.solved[currentMatch['end_index']] == '') {
                gph1.game.blocks[gph1.movingBlockID].y = 0.4
                gph1.moveBlock(gph1.movingBlockID, {"block_opacity": 1})
                gph1.game.solved[currentMatch['end_index']] = gph1.movingBlockID
            }
        }

        // console.log(gph1.game.blocks[gph1.movingBlockID].aminoAcid, gph1.game.blocks[gph1.movingBlockID].x*gph1.specValues.b_max)
    }

    
    console.log(gph1.game.solved)


    solvedCount = 0
    for (var position_value in gph1.game.solved){
        if (gph1.game.solved[position_value] != '') {
            solvedCount = solvedCount + 1
        }
    }


    if (solvedCount == Object.keys(gph1.game.solved).length) {
        console.log("All Solved")
        denovoApp.anim.show();
        denovoApp.anim.goToAndPlay(0);
        denovoApp.anim.setSpeed(2)
        denovoApp.anim.play();

        choices = {
            "level0": ["ADITI", "CAT"],
            "level1": ["PEPTIDE"]
        }
        
        viewX.removeGraph('amino-acid-drag-drop-graph')
        gph1.setUpSimpleDragDropPlay(choices['level0'][parseInt(Math.random()*choices['level0'].length)]);
    }




}

gph1.onPointDrag = function() {
    gph1.movingPointID = viewX.currentMovingPoint.id
    gph1.movingBlockID = gph1.movingPointID.split("-").slice(-1)[0]

    gph1.movedPoint = viewX.graphData["amino-acid-drag-drop-graph"].pointData["amino-acid-drag-drop-dragpoint-" + gph1.movingBlockID][1]

    gph1.game.blocks[gph1.movingBlockID].x = gph1.movedPoint.x - (gph1.game.blocks[gph1.movingBlockID].w/2)
    gph1.game.blocks[gph1.movingBlockID].y = gph1.movedPoint.y + (gph1.game.blocks[gph1.movingBlockID].h/2)

    gph1.moveBlock(gph1.movingBlockID)

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





