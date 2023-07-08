
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

    upcApp.shrinkingLineGraph = {}
    upcApp.shrinkingLineGraph["ymin"] = -6
    upcApp.shrinkingLineGraph["ymax"] = 3

    upcApp.shrinkingCurveGraph = {}
    upcApp.shrinkingCurveGraph["ymin"] = -0.5
    upcApp.shrinkingCurveGraph["ymax"] = 1.5
    upcApp.shrinkingCurveGraph["xmax"] = 4
    upcApp.shrinkingCurveGraph["xmin"] = -2

    upcApp.averageSymmetryReveal = {}
    upcApp.averageSymmetryReveal["ymin"] = -0.1
    upcApp.averageSymmetryReveal["ymax"] = 1.1

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

        upcApp.shrinkingLineGraph["ymin"] = -8
        upcApp.shrinkingLineGraph["ymax"] = 5

        upcApp.shrinkingCurveGraph["ymin"] = -1.3
        upcApp.shrinkingCurveGraph["ymax"] = 2
        upcApp.shrinkingCurveGraph["xmax"] = 3
        upcApp.shrinkingCurveGraph["xmin"] = 0

        upcApp.averageSymmetryReveal["ymin"] = -0.2
        upcApp.averageSymmetryReveal["ymax"] = 1.2


        document.getElementById('parabola-circle-compare-graphHolder-Enclosure').style.height = "400px";
        document.getElementById('parabola-important-dimensions-graphHolder-Enclosure').style.width = "400px";
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
                gph6.setUpShrinkingRandomWalkTrials()
                // gph5.setAtValue(6)

                gph6.addNewWalk()
                gph6.addNewWalk()
                // gph6.addNewWalk()
            }, 1000);
        }
        else if (upcApp.revealPoint == 2) {
            setTimeout(function() {
                gph7.setUpShrinkingRandomWalkReveal()
                gph8.setUpParabolaCircleCompare()
                gph9.setUpParabolicPointsDescription([0, 1], [-5, 0], [4, -1])


                upcApp.inViewDetection(document.getElementById('parabola-points-description-graphHolder'), function() {
                    gph9.interval = setInterval(gph9.nextValue, 1000);
                });
                

                gph10.setUpParabolicDescriptionGraph()

                upcApp.inViewDetection(document.getElementById('parabola-important-dimensions-graphHolder'), function() {
                    gph10.interval = setInterval(gph10.nextValue, 2100);
                });
                

                gph11.setUpParabolicIncreasingSlope()

                gph12.setUpCuttingRibbon()

                gph13.setUpCuttingRibbonAnimation();

                upcApp.inViewDetection(document.getElementById('cutting-ribbon-animation-graphHolder'), function() {
                    gph13.interval = setInterval(gph13.nextValue, 2100);
                });

                

                gph14.setUpShrinkingRibbonAnimation();

                upcApp.inViewDetection(document.getElementById('shrinking-ribbon-animation-graphHolder'), function() {
                    gph14.interval = setInterval(gph14.nextValue, 2100);
                });

                

                gph15.setUpShrinkingLine();

                gph16.setUpShrinkingLineAnimation();
                gph17.setUpShrinkingCurve();

                gph18.setUpShrinkingCurveAnimation();

            }, 1000);
            
        }
        else if (upcApp.revealPoint == 3) {
            setTimeout(function() {
                gph19.setUpSimpleProblemAverageAnimation();

                upcApp.inViewDetection(document.getElementById('simple-problem-average-animation-graphHolder'), function() {
                    gph19.interval = setInterval(gph19.nextValue, 2100);
                });

                

                gph20.setUpSimpleProblemPointFive();

                gph21.setUpSimpleProblemSizeOne();

                gph22.setUpSimpleProblemSizeOneSweep();

                gph23.setUpSimpleProblemSizeOneTwoPoint();

                upcApp.inViewDetection(document.getElementById('simple-problem-size1-2-point-Slider'), function() {
                    gph23.interval = setInterval(gph23.nextValue, 2100);
                });

                

                gph24.setUpSimpleProblemSizeOneThreePoint();

                upcApp.inViewDetection(document.getElementById('simple-problem-size1-3-point-Slider'), function() {
                    gph24.interval = setInterval(gph24.nextValue, 2100);
                });

                


                gph25.setUpSimpleProblemSizeOneNPoint();

                gph26.setUpSimpleProblemSizeOneTwoPointAdding();

                
                upcApp.inViewDetection(document.getElementById('simple-problem-size1-2-point-adding-Slider'), function() {
                    gph26.interval = setInterval(gph26.nextValue, 2100);
                });

                

            }, 1000);
            
        }
        else if (upcApp.revealPoint == 4) {
            setTimeout(function() {
                gph26.selectedMenu = "Scale"
                gph26.handleMenuSelect();

                gph26.slider.value = gph26.slider.max
                gph26.nextValue();
            }, 1000);
            
        }
        else if (upcApp.revealPoint == 5) {
            setTimeout(function() {

                gph27.setUpSimpleProblemSizeOneThreePointAdding();
                gph27.interval = setInterval(gph27.nextValue, 2100);

            }, 1000);
            
        }
        else if (upcApp.revealPoint == 6) {
            setTimeout(function() {

                gph27.selectedMenu = "Scale"
                gph27.handleMenuSelect();

                gph27.slider.value = gph27.slider.max
                gph27.nextValue();

            }, 1000);
            
        }
        else if (upcApp.revealPoint == 7) {
            setTimeout(function() {

                gph28.setUpSimpleProblemSizeOneFourPointAdding();
                // gph28.interval = setInterval(gph28.nextValue, 2100);

            }, 1000);
            
        }
        else if (upcApp.revealPoint == 8) {
            setTimeout(function() {

                gph28.selectedMenu = "Add"
                gph28.handleMenuSelect();

                // gph28.slider.value = gph28.slider.max
                gph28.nextValue();

            }, 1000);
            
        }
        else if (upcApp.revealPoint == 9) {
            setTimeout(function() {

                gph29.setUpSimpleProblemSizeOneNPointAdding();
                // gph29.interval = setInterval(gph29.nextValue, 2100);

            }, 1000);
            
        }
        else if (upcApp.revealPoint == 10) {
            setTimeout(function() {

                gph29.selectedMenu = "Add"
                gph29.handleMenuSelect();

                // gph29.slider.value = gph29.slider.max
                gph29.nextValue();


            }, 1000);
            
        }
        else if (upcApp.revealPoint == 11) {
            setTimeout(function() {

                gph30.setUpPointHRevealGraph();

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

function pickAPointOnSquare(givenPointOnPlane) {
    A = givenPointOnPlane;
    let center = [0.5, 0.5];

    // Compute the vector from center to A
    let vec = [A[0] - center[0], A[1] - center[1]];

    // Normalize the vector
    let dist = Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1]);
    let normVec = [vec[0]/dist, vec[1]/dist];

    // The maximum length from the center to the edge of the square
    let maxDist = Math.min(Math.abs(0.5 / normVec[0]), Math.abs(0.5 / normVec[1]));

    // Compute the intersection point
    let intersectionPoint = [center[0] + maxDist * normVec[0], center[1] + maxDist * normVec[1]];

    return intersectionPoint;
}

function calculateAverageOfPoints(points) {
    if (!Array.isArray(points)) {
        throw new Error("Points must be an array.");
    }

    if (points.length === 0) {
        throw new Error("Points array must not be empty.");
    }

    distanceValue = []

    for (i = 0; i < points.length; i++) {
        distanceValue.push(viewX.distF([0.5, 0.5], points[i]))
    }

    const sum = distanceValue.reduce((total, point) => total + point, 0);
    const average = sum / distanceValue.length;

    return average;
}

function removeRandomPoint(points) {
    if (!Array.isArray(points)) {
        throw new Error("Points must be an array.");
    }

    if (points.length === 0) {
        throw new Error("Points array must not be empty.");
    }

    const randomIndex = Math.floor(Math.random() * points.length);
    const removedPoint = points.splice(randomIndex, 1)[0];

    return removedPoint;
}

function removeMaxOrMinPoint(points) {
    if (!Array.isArray(points)) {
        throw new Error("Points must be an array.");
    }

    if (points.length === 0) {
        throw new Error("Points array must not be empty.");
    }

    const removeDirection = ['max', 'min'][Math.floor(Math.random() * ['max', 'min'].length)];

    currentAverage = calculateAverageOfPoints(points);
    if (removeDirection === 'max') {
        const maxPoint = points.reduce((max, point) => {
            if (viewX.distF([0.5, 0.5], point) > viewX.distF([0.5, 0.5], max)) {
                return point;
            }

            return max;
        }, points[0]);

        const maxIndex = points.indexOf(maxPoint);
        const removedPoint = points.splice(maxIndex, 1)[0];
        // console.log(removeDirection, removedPoint)
        return removedPoint;
    }
    else {
        const minPoint = points.reduce((min, point) => {
            if (viewX.distF([0.5, 0.5], point) < viewX.distF([0.5, 0.5], min)) {
                return point;
            }

            return min;
        }, points[0]);

        const minIndex = points.indexOf(minPoint);
        const removedPoint = points.splice(minIndex, 1)[0];

        // console.log(removeDirection, removedPoint)
        return removedPoint;
    }
    
}


gph0  = {}

gph0.initialSetup = function() {
    // var audio = document.getElementById("backgroundMusic");
    // audio.play();
}

gph0.initialSetup();


// Code For 1st Graph : upc-measurement-graph


gph1 = {}

gph1.displayAverage = function(value) {
    str1 = value.toString()
    str2 = (upc/4).toString()
    theHTML = ""
    streak = 'unbroken'
    for (let i = 0; i < str1.length; i++) {
        if (str1[i] == str2[i] && streak == 'unbroken') {
            theHTML += str1[i]
        }
        else {
            streak = 'broken'
            theHTML += "<span style='color: hsl(var(--lightPinkH), 20%, 47%);'>" + str1[i] + "</span>";
        }
    }
    return theHTML
}

gph1.onMoveOverParagraph = function() {
    document.getElementById('gph1-explaining-block').addEventListener('mousemove', function(e) {
        document.getElementById('parameter-measured-parabolic-constant-by-4').innerHTML = gph1.displayAverage(upc/4)
    })
}

gph1.onMoveOverParagraph();

gph1.sampledPointsOnSquare = []

function upcMeasurementSetup() {
    graphH = document.getElementById('upc-measurement-graphHolder')
    viewX.addGraph(graphH, "upc-measurement-graph", defaultGraphOptions)

    graphH.addEventListener("mousemove", viewX.getCoordinatesOfEvent("upc-measurement-graph", "upcMeasurementGraphMouseMove"))
    

    rectOptions = { x: 0, y: 1, w: 1, h: 1, stroke: "var(--lightYellow)", strokewidth: 0.4, rectcolor: "hsla(190, 100%, 50%, 0)"};

    viewX.addRectangle("upc-measurement-graph", "upc-measurement-unit-square", rectOptions);

    pointOnSquare = pickAPointOnSquare([0.7, 0.6])
    gph1.sampledPointsOnSquare.push(pointOnSquare)
    averageSoFar = calculateAverageOfPoints(gph1.sampledPointsOnSquare)
    document.getElementById("parameter-measured-parabolic-constant-by-4").innerHTML = gph1.displayAverage(averageSoFar)

    distanceText = viewX.distF([0.5, 0.5], pointOnSquare).toFixed(3);
    
    lineOptions = { x1: 0.5, y1: 0.5, x2: pointOnSquare[0], y2:pointOnSquare[1], strokedasharray: "4,4", strokewidth: 0.7, linecolor: "var(--lightPink)"};
    viewX.addLine("upc-measurement-graph", "upc-measurement-distance-line", lineOptions);

    pointOptions = { x: 0.5, y: 0.5, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightBlue)'};
    viewX.addPoint("upc-measurement-graph", "upc-measurement-center-C", pointOptions);
    textOptions = {x: 0.5 + 0.05, y: 0.5 - 0.08, text: "C",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightBlue)"};
    viewX.addText("upc-measurement-graph", "upc-measurement-center-C-label", textOptions);

    pointOptions = { x: pointOnSquare[0], y: pointOnSquare[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)'};
    viewX.addPoint("upc-measurement-graph", "upc-measurement-randomPoint-Q", pointOptions);
    textOptions = {x: pointOnSquare[0] + 0.05, y: pointOnSquare[1] - 0.08, text: "Q",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightPurple)"};
    viewX.addText("upc-measurement-graph", "upc-measurement-randomPoint-Q-label", textOptions);

    textOptions = {x: (0.5 + pointOnSquare[0])/2, y: (0.5 + pointOnSquare[1])/2, text: distanceText,  textAlign: "center",  fontSize: upcApp.graphFontSizeSmall, fontFamily: "Nunito",   textcolor: "var(--lightPink)"};
    viewX.addText("upc-measurement-graph", "upc-measurement-distance-label", textOptions);
}

upcMeasurementSetup()

function upcMeasurement(givenPointOnPlane) {
    
    pointOnSquare = pickAPointOnSquare(givenPointOnPlane)
    gph1.sampledPointsOnSquare.push(pointOnSquare)
    
    if (gph1.sampledPointsOnSquare.length > 1000) {
        removeRandomPoint(gph1.sampledPointsOnSquare)
    }

    averageSoFar = calculateAverageOfPoints(gph1.sampledPointsOnSquare)

    
    document.getElementById("parameter-measured-parabolic-constant-by-4").innerHTML = gph1.displayAverage(averageSoFar)

    lineOptions = {x2: pointOnSquare[0], y2:pointOnSquare[1]};
    viewX.updateLine("upc-measurement-graph", "upc-measurement-distance-line", lineOptions);

    viewX.updatePointXY("upc-measurement-graph", "upc-measurement-randomPoint-Q", pointOnSquare[0], pointOnSquare[1]);

    textOptions = {x: pointOnSquare[0] + 0.05, y: pointOnSquare[1] - 0.08};
    viewX.updateText("upc-measurement-graph", "upc-measurement-randomPoint-Q-label", textOptions);

    distanceText = viewX.distF([0.5, 0.5], pointOnSquare).toFixed(3);

    textOptions = {x: (0.5 + pointOnSquare[0])/2 + 0.05, y: (0.5 + pointOnSquare[1])/2 - 0.08, text: distanceText};
    viewX.updateText("upc-measurement-graph", "upc-measurement-distance-label", textOptions);
}

function upcMeasurementGraphMouseMove() {
    if (gph1.sampledPointsOnSquare.length > 10) {
        clearInterval(gph1.loopinterval)
    }
    givenPointOnPlane = viewX.cursorCoordinates["upc-measurement-graph"]
    upcMeasurement(givenPointOnPlane)
}

function upcRandomMeasurement() {
    index = viewX.randomChoice([0, 1, 2, 3])
    startingPoints = [[0,0], [1,0], [1,1], [0,1]]
    startingPoint = startingPoints[index]

    translateDirections = [[1,0], [0,1], [-1,0], [0,-1]]
    translateDistance = Math.random()
    translateVector = [translateDistance*translateDirections[index][0], translateDistance*translateDirections[index][1]]
    givenPointOnPlane = viewX.addVec(startingPoint, translateVector);

    // givenPointOnPlane = [Math.cos(2*Math.PI*Math.random()), Math.sin(2*Math.PI*Math.random())]
    
    upcMeasurement(givenPointOnPlane)
}


gph1.loopinterval = setInterval(frame, 500);
gph1.animLoopCount = 1

function frame() {
    gph1.animLoopCount = gph1.animLoopCount + 1
    if (gph1.sampledPointsOnSquare.length < 5) {
        if (gph1.animLoopCount % 5 == 0) {
            upcRandomMeasurement()
        }
    }
    else if (gph1.sampledPointsOnSquare.length < 20 && gph1.sampledPointsOnSquare.length >= 5) {
        if (gph1.animLoopCount % 2 == 0) {
            upcRandomMeasurement()
        }
    }
    else {
        if (gph1.animLoopCount % 1 == 0) {
            upcRandomMeasurement()
        }
    }

    
}


// Code For 2st Graph : distance-between-two-points

gph2 = {}

gph2.setUpDistanceBetweenTwoPoints = function() {
    gph2.graphH2 = document.getElementById('distance-between-any-two-points-graphHolder')
    viewX.addGraph(gph2.graphH2, "distance-between-any-two-points-graph", defaultGraphOptions)

    rectOptions = { x: 0, y: 1, w: 1, h: 1, stroke: "var(--lightYellow)", strokewidth: 0.4, rectcolor: "hsla(190, 100%, 50%, 0)"};

    viewX.addRectangle("distance-between-any-two-points-graph", "distance-between-any-two-points-square", rectOptions);

    gph2.pointA = [0.2, 0.4]
    gph2.pointB = [0.8, 0.7]

    gph2.distanceText = viewX.distF(gph2.pointA, gph2.pointB).toFixed(3);

    lineOptions = { x1: gph2.pointA[0], y1: gph2.pointA[1], x2: gph2.pointB[0], y2:gph2.pointB[1], strokedasharray: "4,4", strokewidth: 0.7, linecolor: "var(--lightPink)"}; 
    viewX.addLine("distance-between-any-two-points-graph", "distance-between-any-two-points-distance-line", lineOptions);
    
    pointOptions = {x: gph2.pointA[0], y: gph2.pointA[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightBlue)'};
    viewX.addPoint("distance-between-any-two-points-graph", "distance-between-any-two-points-point-A", pointOptions);
    pointOptions = {x: gph2.pointA[0], y: gph2.pointA[1], pointsize: upcApp.graphPointSize*3, pointcolor: 'transparent', draggability: "yes", runFunctionDuringDrag: "gph2.onPointDrag()"};
    viewX.addPoint("distance-between-any-two-points-graph", "distance-between-any-two-points-point-A-dragger", pointOptions);
    textOptions = {x: gph2.pointA[0] + 0.05, y: gph2.pointA[1] - 0.08, text: "A",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightBlue)"};
    viewX.addText("distance-between-any-two-points-graph", "distance-between-any-two-points-point-A-label", textOptions);

    pointOptions = { x: gph2.pointB[0], y: gph2.pointB[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)'};
    viewX.addPoint("distance-between-any-two-points-graph", "distance-between-any-two-points-point-B", pointOptions);
    pointOptions = { x: gph2.pointB[0], y: gph2.pointB[1], pointsize: upcApp.graphPointSize*3, pointcolor: 'transparent', draggability: "yes", runFunctionDuringDrag: "gph2.onPointDrag()"};
    viewX.addPoint("distance-between-any-two-points-graph", "distance-between-any-two-points-point-B-dragger", pointOptions);
    textOptions = {x: gph2.pointB[0] + 0.05, y: gph2.pointB[1] - 0.08, text: "B",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightPurple)"};
    viewX.addText("distance-between-any-two-points-graph", "distance-between-any-two-points-point-B-label", textOptions);

    textOptions = {x: (gph2.pointA[0] + gph2.pointB[0])/2, y: (gph2.pointA[1] + gph2.pointB[1])/2, text: gph2.distanceText,  textAlign: "center",  fontSize: upcApp.graphFontSizeSmall, fontFamily: "Nunito",   textcolor: "var(--lightPink)"};
    viewX.addText("distance-between-any-two-points-graph", "distance-between-any-two-points-distance-label", textOptions);
}


gph2.setUpDistanceBetweenTwoPoints();

gph2.onPointDrag = function() {
    
    gph2.movedLocationA = viewX.graphData["distance-between-any-two-points-graph"].pointData["distance-between-any-two-points-point-A-dragger"][1]

    gph2.movedLocationB = viewX.graphData["distance-between-any-two-points-graph"].pointData["distance-between-any-two-points-point-B-dragger"][1]

    gph2.point1 = [gph2.movedLocationA.x, gph2.movedLocationA.y]
    gph2.point2 = [gph2.movedLocationB.x, gph2.movedLocationB.y]

    gph2.distanceText = viewX.distF(gph2.point1, gph2.point2).toFixed(3);

    lineOptions = { x1: gph2.point1[0], y1: gph2.point1[1], x2: gph2.point2[0], y2:gph2.point2[1]}; 
    viewX.updateLine("distance-between-any-two-points-graph", "distance-between-any-two-points-distance-line", lineOptions);
    
    viewX.updatePointXY("distance-between-any-two-points-graph", "distance-between-any-two-points-point-A", gph2.point1[0], gph2.point1[1]);
    viewX.updatePointXY("distance-between-any-two-points-graph", "distance-between-any-two-points-point-B", gph2.point2[0], gph2.point2[1]);

    textOptions = {x: gph2.point1[0] + 0.05, y: gph2.point1[1] - 0.08};
    viewX.updateText("distance-between-any-two-points-graph", "distance-between-any-two-points-point-A-label", textOptions);

    textOptions = {x: gph2.point2[0] + 0.05, y: gph2.point2[1] - 0.08};
    viewX.updateText("distance-between-any-two-points-graph", "distance-between-any-two-points-point-B-label", textOptions);

    textOptions = {x: (gph2.point1[0] + gph2.point2[0])/2, y: (gph2.point1[1] + gph2.point2[1])/2, text: gph2.distanceText};
    viewX.updateText("distance-between-any-two-points-graph", "distance-between-any-two-points-distance-label", textOptions);

    "=\\frac{\\color{#e3a0cd}{" + (gph8.slider.value*Math.PI).toFixed(4) + "}}{\\color{#61bdff}{" + gph8.slider.value  + "}}}\\)"

}

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPink)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPink)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "distance-between-any-two-points-Slider");

gph2.correctAnswer = 0.52140
gph2.acceptableError = 0.02

gph2.slider = document.getElementById("distance-between-any-two-points-Slider");
gph2.sliderLabel = document.getElementById("distance-between-any-two-points-SliderLabel");
gph2.sliderInfo = document.getElementById("distance-between-any-two-points-SliderInfo");

gph2.slider.value = Math.random()*1
gph2.sliderLabel.innerHTML = gph2.slider.value

gph2.slider.addEventListener('input', function() {
    gph2.sliderLabel.innerHTML = gph2.slider.value
    gph2.sliderInfo.innerHTML = "Move the <span class='p-lightPink'>slider</span> to choose your answer...  and also, the points <span class='p-lightBlue'>A</span> and <span class='p-lightPurple'>B</span> above are draggable. :)"
});


gph2.checkAnswerButton = document.getElementById("gph2-checkAnswerButton");
gph2.checkAnswerButton.addEventListener('click', function() {
    gph2.checkAnswer()
});

gph2.lastError = null;
gph2.checkAnswer = function() {
    let currentError = Math.abs(parseFloat(gph2.slider.value) - gph2.correctAnswer);
    if (currentError < gph2.acceptableError) {
        gph2.sliderInfo.innerHTML = "Correct! 🎉 The answer you gave is less than " + gph2.acceptableError + " away from the actual value.";
        upcApp.anim.show();
        upcApp.anim.goToAndPlay(0);
        upcApp.anim.setSpeed(2)
        upcApp.anim.play();
        if (upcApp.revealPoint == 0) {
            upcApp.revealSection()
        }
    }
    else {
        if (gph2.lastError === null) {
            gph2.sliderInfo.innerHTML = "Keep trying!";
        } else if (currentError < gph2.lastError) {
            gph2.sliderInfo.innerHTML = "Warmer! 🔥 Getting better.";
            document.getElementById("warmerMusic").play();
        } else if (currentError > gph2.lastError) {
            gph2.sliderInfo.innerHTML = "Colder! 😃 ";
            document.getElementById("colderMusic").play();
        }
    }
    gph2.lastError = currentError;

    upcApp.interactionNumber += 1
    dateTimeNow = new Date()
    upcApp.interactions[upcApp.interactionNumber] = {
        dateTime : dateTimeNow.toString(),
        "type": "answer for distance between two points",
        "answer": gph2.slider.value
    }

    // saveData()


};


gph2.continueButton = document.getElementById("reveal-1-continueButton");

gph2.continueButton.addEventListener('click', function() {
    if (upcApp.revealPoint == 0) {
        upcApp.revealSection()
    }
});


// Code For Graph 3 : distance between center and any point inside

gph3 = {}

gph3.setUpDistanceBetweenCenterAndAnyPointInside = function() {
    defaultGraphOptions["xmax"] = 1.1
    defaultGraphOptions["xmin"] = -0.1
    defaultGraphOptions["ymax"] = 1.1
    defaultGraphOptions["ymin"] = -0.1
    defaultGraphOptions["scrollZoom"] = "no"
    
    gph3.graphH = document.getElementById('distance-between-center-and-any-point-graphHolder')
    viewX.addGraph(gph3.graphH, "distance-between-center-and-any-point-graph", defaultGraphOptions)

    rectOptions = { x: 0, y: 1, w: 1, h: 1, stroke: "var(--lightYellow)", strokewidth: 0.4, rectcolor: "hsla(190, 100%, 50%, 0)"};

    viewX.addRectangle("distance-between-center-and-any-point-graph", "distance-between-center-and-any-point-square", rectOptions);

    gph3.pointA = [0.5, 0.5]
    gph3.pointB = [0.8, 0.7]

    gph3.distanceText = viewX.distF(gph3.pointA, gph3.pointB).toFixed(3);

    lineOptions = { x1: gph3.pointA[0], y1: gph3.pointA[1], x2: gph3.pointB[0], y2:gph3.pointB[1], strokedasharray: "4,4", strokewidth: 0.7, linecolor: "var(--lightPink)"}; 
    viewX.addLine("distance-between-center-and-any-point-graph", "distance-between-center-and-any-point-distance-line", lineOptions);
    
    pointOptions = {x: gph3.pointA[0], y: gph3.pointA[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightBlue)'};
    viewX.addPoint("distance-between-center-and-any-point-graph", "distance-between-center-and-any-point-point-A", pointOptions);
    textOptions = {x: gph3.pointA[0] + 0.05, y: gph3.pointA[1] - 0.08, text: "A",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightBlue)"};
    viewX.addText("distance-between-center-and-any-point-graph", "distance-between-center-and-any-point-point-A-label", textOptions);

    pointOptions = { x: gph3.pointB[0], y: gph3.pointB[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)'};
    viewX.addPoint("distance-between-center-and-any-point-graph", "distance-between-center-and-any-point-point-B", pointOptions);
    pointOptions = { x: gph3.pointB[0], y: gph3.pointB[1], pointsize: upcApp.graphPointSize*3, pointcolor: 'transparent', draggability: "yes", runFunctionDuringDrag: "gph3.onPointDrag()"};
    viewX.addPoint("distance-between-center-and-any-point-graph", "distance-between-center-and-any-point-point-B-dragger", pointOptions);
    textOptions = {x: gph3.pointB[0] + 0.05, y: gph3.pointB[1] - 0.08, text: "B",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightPurple)"};
    viewX.addText("distance-between-center-and-any-point-graph", "distance-between-center-and-any-point-point-B-label", textOptions);

    textOptions = {x: (gph3.pointA[0] + gph3.pointB[0])/2, y: (gph3.pointA[1] + gph3.pointB[1])/2, text: gph3.distanceText,  textAlign: "center",  fontSize: upcApp.graphFontSizeSmall, fontFamily: "Nunito",   textcolor: "var(--lightPink)"};
    viewX.addText("distance-between-center-and-any-point-graph", "distance-between-center-and-any-point-distance-label", textOptions);
}

gph3.onPointDrag = function() {
    gph3.movedLocationB = viewX.graphData["distance-between-center-and-any-point-graph"].pointData["distance-between-center-and-any-point-point-B-dragger"][1]

    gph3.point1 = [0.5, 0.5]
    gph3.point2 = [gph3.movedLocationB.x, gph3.movedLocationB.y]

    gph3.distanceText = viewX.distF(gph3.point1, gph3.point2).toFixed(3);

    lineOptions = { x1: gph3.point1[0], y1: gph3.point1[1], x2: gph3.point2[0], y2:gph3.point2[1]}; 
    viewX.updateLine("distance-between-center-and-any-point-graph", "distance-between-center-and-any-point-distance-line", lineOptions);
    
    viewX.updatePointXY("distance-between-center-and-any-point-graph", "distance-between-center-and-any-point-point-B", gph3.point2[0], gph3.point2[1]);


    textOptions = {x: gph3.point2[0] + 0.05, y: gph3.point2[1] - 0.08};
    viewX.updateText("distance-between-center-and-any-point-graph", "distance-between-center-and-any-point-point-B-label", textOptions);

    textOptions = {x: (gph3.point1[0] + gph3.point2[0])/2, y: (gph3.point1[1] + gph3.point2[1])/2, text: gph3.distanceText};
    viewX.updateText("distance-between-center-and-any-point-graph", "distance-between-center-and-any-point-distance-label", textOptions);
}


var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPink)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPink)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "distance-between-center-and-point-inside-Slider");

gph3.correctAnswer = upc/6
gph3.acceptableError = 0.02

gph3.slider = document.getElementById("distance-between-center-and-point-inside-Slider");
gph3.sliderLabel = document.getElementById("distance-between-center-and-point-inside-SliderLabel");
gph3.sliderInfo = document.getElementById("distance-between-center-and-point-inside-SliderInfo");

gph3.slider.value = Math.random()*1
gph3.sliderLabel.innerHTML = gph3.slider.value

gph3.slider.addEventListener('input', function() {
    gph3.sliderLabel.innerHTML = gph3.slider.value
    gph3.sliderInfo.innerHTML = "Point <span class='p-lightPurple'>B</span> above is draggable. :)"
});


gph3.checkAnswerButton = document.getElementById("gph3-checkAnswerButton");
gph3.checkAnswerButton.addEventListener('click', function() {
    gph3.checkAnswer()
});

gph3.lastError = null;
gph3.checkAnswer = function() {
    let currentError = Math.abs(parseFloat(gph3.slider.value) - gph3.correctAnswer);
    if (currentError < gph3.acceptableError) {
        gph3.sliderInfo.innerHTML = "Correct! 🎉 The answer you gave is less than " + gph3.acceptableError + " away from the actual value.";
        upcApp.anim.show();
        upcApp.anim.goToAndPlay(0);
        upcApp.anim.setSpeed(2)
        upcApp.anim.play();
        upcApp.revealSubSection(1);
    }
    else {
        if (gph3.lastError === null) {
            gph3.sliderInfo.innerHTML = "Keep trying!";
        } else if (currentError < gph3.lastError) {
            gph3.sliderInfo.innerHTML = "Warmer! 🔥 Getting better.";
            document.getElementById("warmerMusic").play();
        } else if (currentError > gph3.lastError) {
            gph3.sliderInfo.innerHTML = "Colder! 😃 ";
            document.getElementById("colderMusic").play();
        }
    }
    gph3.lastError = currentError;

    upcApp.interactionNumber += 1
    dateTimeNow = new Date()
    upcApp.interactions[upcApp.interactionNumber] = {
        dateTime : dateTimeNow.toString(),
        "type": "answer for distance between center and any point inside",
        "answer": gph3.slider.value
    }

    // saveData()
};



gph3.continueButton = document.getElementById("reveal-sub-section-1-continueButton");

gph3.continueButton.addEventListener('click', function() {
        upcApp.revealSubSection(1)
});


// Code For Graph 4 : distance between corner and point on square

gph4 = {}

gph4.setUpDistanceBetweenCornerAnyPointOnSquare = function() {

    defaultGraphOptions["xmax"] = 1.1
    defaultGraphOptions["xmin"] = -0.1
    defaultGraphOptions["ymax"] = 1.1
    defaultGraphOptions["ymin"] = -0.1
    defaultGraphOptions["scrollZoom"] = "no"

    gph4.graphH = document.getElementById('distance-between-corner-and-point-on-square-graphHolder')
    viewX.addGraph(gph4.graphH, "distance-between-corner-and-point-on-square-graph", defaultGraphOptions)


    gph4.graphH.addEventListener("mousemove", viewX.getCoordinatesOfEvent("distance-between-corner-and-point-on-square-graph", "gph4graphMouseMove"))

    rectOptions = { x: 0, y: 1, w: 1, h: 1, stroke: "var(--lightYellow)", strokewidth: 0.4, rectcolor: "hsla(190, 100%, 50%, 0)"};

    viewX.addRectangle("distance-between-corner-and-point-on-square-graph", "distance-between-corner-and-point-on-square-square", rectOptions);

    gph4.pointA = [0, 0]
    gph4.pointB = [0.8, 0.7]

    gph4.distanceText = viewX.distF(gph4.pointA, gph4.pointB).toFixed(3);

    lineOptions = { x1: gph4.pointA[0], y1: gph4.pointA[1], x2: gph4.pointB[0], y2:gph4.pointB[1], strokedasharray: "4,4", strokewidth: 0.7, linecolor: "var(--lightPink)"}; 
    viewX.addLine("distance-between-corner-and-point-on-square-graph", "distance-between-corner-and-point-on-square-distance-line", lineOptions);
    
    pointOptions = {x: gph4.pointA[0], y: gph4.pointA[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightBlue)'};
    viewX.addPoint("distance-between-corner-and-point-on-square-graph", "distance-between-corner-and-point-on-square-point-A", pointOptions);
    textOptions = {x: gph4.pointA[0] + 0.05, y: gph4.pointA[1] - 0.08, text: "A",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightBlue)"};
    viewX.addText("distance-between-corner-and-point-on-square-graph", "distance-between-corner-and-point-on-square-point-A-label", textOptions);

    pointOptions = { x: gph4.pointB[0], y: gph4.pointB[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)'};
    viewX.addPoint("distance-between-corner-and-point-on-square-graph", "distance-between-corner-and-point-on-square-point-B", pointOptions);
    textOptions = {x: gph4.pointB[0] + 0.05, y: gph4.pointB[1] - 0.08, text: "B",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightPurple)"};
    viewX.addText("distance-between-corner-and-point-on-square-graph", "distance-between-corner-and-point-on-square-point-B-label", textOptions);

    textOptions = {x: (gph4.pointA[0] + gph4.pointB[0])/2, y: (gph4.pointA[1] + gph4.pointB[1])/2, text: gph4.distanceText,  textAlign: "center",  fontSize: upcApp.graphFontSizeSmall, fontFamily: "Nunito",   textcolor: "var(--lightPink)"};
    viewX.addText("distance-between-corner-and-point-on-square-graph", "distance-between-corner-and-point-on-square-distance-label", textOptions);
}

function gph4graphMouseMove() {
    givenPointOnPlane = viewX.cursorCoordinates["distance-between-corner-and-point-on-square-graph"]
    pointOnSquare = pickAPointOnSquare(givenPointOnPlane)

    gph4.point1 = [0, 0]
    gph4.point2 = pointOnSquare

    gph4.distanceText = viewX.distF(gph4.point1, gph4.point2).toFixed(3);

    lineOptions = { x1: gph4.point1[0], y1: gph4.point1[1], x2: gph4.point2[0], y2:gph4.point2[1]}; 
    viewX.updateLine("distance-between-corner-and-point-on-square-graph", "distance-between-corner-and-point-on-square-distance-line", lineOptions);
    
    viewX.updatePointXY("distance-between-corner-and-point-on-square-graph", "distance-between-corner-and-point-on-square-point-B", gph4.point2[0], gph4.point2[1]);


    textOptions = {x: gph4.point2[0] + 0.05, y: gph4.point2[1] - 0.08};
    viewX.updateText("distance-between-corner-and-point-on-square-graph", "distance-between-corner-and-point-on-square-point-B-label", textOptions);

    textOptions = {x: (gph4.point1[0] + gph4.point2[0])/2, y: (gph4.point1[1] + gph4.point2[1])/2, text: gph4.distanceText};
    viewX.updateText("distance-between-corner-and-point-on-square-graph", "distance-between-corner-and-point-on-square-distance-label", textOptions);
}

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPink)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPink)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "distance-between-corner-and-point-Slider");

gph4.correctAnswer = upc/3
gph4.acceptableError = 0.02

gph4.slider = document.getElementById("distance-between-corner-and-point-Slider");
gph4.sliderLabel = document.getElementById("distance-between-corner-and-point-SliderLabel");
gph4.sliderInfo = document.getElementById("distance-between-corner-and-point-SliderInfo");

gph4.slider.value = Math.random()*2
gph4.sliderLabel.innerHTML = gph4.slider.value

gph4.slider.addEventListener('input', function() {
    gph4.sliderLabel.innerHTML = gph4.slider.value
    gph4.sliderInfo.innerHTML = "Point <span class='p-lightPurple'>B</span> above is draggable. :)"
});


gph4.checkAnswerButton = document.getElementById("gph4-checkAnswerButton");
gph4.checkAnswerButton.addEventListener('click', function() {
    gph4.checkAnswer()
});

gph4.lastError = null;
gph4.checkAnswer = function() {
    let currentError = Math.abs(parseFloat(gph4.slider.value) - gph4.correctAnswer);
    if (currentError < gph4.acceptableError) {
        gph4.sliderInfo.innerHTML = "Correct! 🎉 The answer you gave is less than " + gph4.acceptableError + " away from the actual value.";
        upcApp.anim.show();
        upcApp.anim.goToAndPlay(0);
        upcApp.anim.setSpeed(2)
        upcApp.anim.play();
        upcApp.revealSubSection(2);
    }
    else {
        if (gph4.lastError === null) {
            gph4.sliderInfo.innerHTML = "Keep trying!";
        } else if (currentError < gph4.lastError) {
            gph4.sliderInfo.innerHTML = "Warmer! 🔥 Getting better.";
            document.getElementById("warmerMusic").play();
        } else if (currentError > gph4.lastError) {
            gph4.sliderInfo.innerHTML = "Colder! 😃 ";
            document.getElementById("colderMusic").play();
        }
    }
    gph4.lastError = currentError;

    upcApp.interactionNumber += 1
    dateTimeNow = new Date()
    upcApp.interactions[upcApp.interactionNumber] = {
        dateTime : dateTimeNow.toString(),
        "type": "answer for distance between corner and point on square",
        "answer": gph4.slider.value
    }

    // saveData()
};


gph4.continueButton = document.getElementById("reveal-sub-section-2-continueButton");

gph4.continueButton.addEventListener('click', function() {
        upcApp.revealSubSection(2)
});

// graph 5 : shrinking random walk

gph5 = {}

gph5.walkedPoints = []
gph5.generateWalk = function(uptoNumber) {
    for (let i = 0; i < gph5.walkedPoints.length; i++) {
        viewX.removePoint("random-shrinking-walk-graph", "random-shrinking-walk-point-" + i)
        viewX.removeLine("random-shrinking-walk-graph", "random-shrinking-walk-line-segment-" + i)
        viewX.removePoint("random-shrinking-walk-graph", "random-shrinking-walk-point-final")
        viewX.removeText("random-shrinking-walk-graph", "random-shrinking-walk-point-final-label")
        viewX.removeLine("random-shrinking-walk-graph", "random-shrinking-walk-distance-line-segment")
    }

    if (gph5.walkedPoints.length < uptoNumber) {
        for (let i = gph5.walkedPoints.length + 1; i <= uptoNumber; i++) {
            stepLengthAtStep = Math.sqrt(2)/Math.pow(2, i - 1)
            stepDirection = viewX.randomChoice([[0, 1], [1, 0]])
            previousPoint = [0, 0]
            if (gph5.walkedPoints.length != 0) {
                previousPoint = gph5.walkedPoints[i - 2]
            }
            newPoint = [previousPoint[0] + stepLengthAtStep*stepDirection[0], previousPoint[1] + stepLengthAtStep*stepDirection[1]]
            gph5.walkedPoints.push(newPoint)
        }
    }
    else {
        gph5.walkedPoints = gph5.walkedPoints.slice(0, uptoNumber)
    }
}


gph5.drawShrinkingRandomWalkPath = function() {
    
    
    for (let i = 0; i < gph5.walkedPoints.length; i++) {
        if (i < 3) {
            pointColor = ["var(--lightOrange)","var(--brightYellow)","var(--lightGreen)","var(--lightBlue)"][i]
        }
        else if (i >= 3) {
            pointColor = "var(--lightBlue)"
        }

        if (i < 4) {
            sizeToUse = upcApp.graphPointSize/(i + 1)
        }
        else {
            sizeToUse = upcApp.graphPointSize/4
        }
        pointOptions = { x: gph5.walkedPoints[i][0] , y: gph5.walkedPoints[i][1], pointsize: sizeToUse, pointcolor: pointColor};
        viewX.addPoint("random-shrinking-walk-graph", "random-shrinking-walk-point-" + i, pointOptions);
        previousPoint = [0, 0]
        if (i != 0) {
            previousPoint = gph5.walkedPoints[i - 1]
        }
        lineOptions = { x1: previousPoint[0], y1: previousPoint[1], x2: gph5.walkedPoints[i][0], y2: gph5.walkedPoints[i][1], strokewidth: 0.7/(i + 1), linecolor: pointColor}; 
        viewX.addLine("random-shrinking-walk-graph", "random-shrinking-walk-line-segment-" + i, lineOptions);

        if (i == gph5.walkedPoints.length - 1) {
            pointOptions = { x: gph5.walkedPoints[i][0] , y: gph5.walkedPoints[i][1], pointsize: upcApp.graphPointSize/(i + 1), pointcolor: "var(--lightPurple)"};
            viewX.addPoint("random-shrinking-walk-graph", "random-shrinking-walk-point-final", pointOptions);

            textOptions = {x: gph5.walkedPoints[i][0] + 0.4, y: gph5.walkedPoints[i][1] - 0.2, text: "Drunkard",  textAlign: "center",  fontSize: upcApp.graphFontSizeSmall, fontFamily: "Raleway",   textcolor: "var(--lightPurple)"};
            viewX.addText("random-shrinking-walk-graph", "random-shrinking-walk-point-final-label", textOptions);
        }

        
    }

    if (gph5.walkedPoints.length > 3) {
        lineOptions = { x1: 0, y1: 0, x2: gph5.walkedPoints[gph5.walkedPoints.length - 1][0], y2: gph5.walkedPoints[gph5.walkedPoints.length - 1][1], strokewidth: 0.7, strokedasharray: "4, 4", linecolor: "hsla(var(--lightPinkH), var(--lightPinkS), var(--lightPinkL), " + (gph5.walkedPoints.length/30) + ")"};
        viewX.addLine("random-shrinking-walk-graph", "random-shrinking-walk-distance-line-segment", lineOptions);
    }
}

gph5.setUpShrinkingRandomWalk = function() {
    gph5.graphH = document.getElementById('random-shrinking-walk-graphHolder')
    defaultGraphOptions["xmax"] = 2*1.414 + 1
    defaultGraphOptions["ymax"] = 2*1.414
    defaultGraphOptions["xmin"] = -1
    defaultGraphOptions["ymin"] = -1

    // defaultGraphOptions["scrollZoom"] = 'yes'
    // defaultGraphOptions["draggability"] = 'yes'

    viewX.addGraph(gph5.graphH, "random-shrinking-walk-graph", defaultGraphOptions)

    lineOptions = { x1: -0.5, y1: 0, x2: 2*1.414, y2:0, strokewidth: 0.7, linecolor: "hsla(0, 0%, 66%,0.2)"}; 
    viewX.addLine("random-shrinking-walk-graph", "random-shrinking-walk-y-axis-line", lineOptions);

    lineOptions = { y1: -0.5, x1: 0, y2: 2*1.414, x2:0, strokewidth: 0.7, linecolor: "hsla(0, 0%, 66%,0.2)"}; 
    viewX.addLine("random-shrinking-walk-graph", "random-shrinking-walk-x-axis-line", lineOptions);

    pointOptions = { x: 0, y: 0, pointsize: upcApp.graphPointSize, pointcolor: 'white'};
    viewX.addPoint("random-shrinking-walk-graph", "random-shrinking-walk-origin", pointOptions);

    textOptions = {x: 0 + 0.3, y: 0 - 0.2, text: "(0, 0)",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.8, fontFamily: "Nunito",   textcolor: "white"};
    viewX.addText("random-shrinking-walk-graph", "random-shrinking-walk-origin-label", textOptions);
    
}

gph5.setAtValue = function(toSetSliderAt) {
    gph5.slider.value = toSetSliderAt
    gph5.sliderLabel.innerHTML = gph5.slider.value + " step" + (gph5.slider.value == 1 ? "" : "s")
    gph5.generateWalk(gph5.slider.value)
    gph5.drawShrinkingRandomWalkPath()
    gph5.sliderInfo.innerHTML = "There's a lot of steps in this walk. Let's just look at the first " + gph5.slider.value + " step" + (gph5.slider.value == 1 ? "" : "s") +  ". :)"
}
var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(10, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightBlue)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightBlue)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "random-shrinking-walk-Slider");

gph5.slider = document.getElementById("random-shrinking-walk-Slider");
gph5.sliderLabel = document.getElementById("random-shrinking-walk-SliderLabel");
gph5.sliderInfo = document.getElementById("random-shrinking-walk-SliderInfo");

gph5.slider.value = 1
gph5.sliderLabel.innerHTML = gph5.slider.value + " step" + (gph5.slider.value == 1 ? "" : "s")

gph5.slider.addEventListener('input', function() {
    gph5.setAtValue(gph5.slider.value)
});

function pauseAutoplay() {
    clearInterval(gph5.interval);
}

gph5.slider.addEventListener('mouseover', pauseAutoplay);
gph5.slider.addEventListener('touchstart', pauseAutoplay);

gph5.nextValue = function() {
    if (gph5.slider.value < 30) {
        gph5.slider.value = parseInt(gph5.slider.value) + 1
    }
    else {
        gph5.slider.value = 1
    }
    
    gph5.setAtValue(gph5.slider.value)
}


// graph 6 : shrinking random walk - trials

gph6 = {}

gph6.setUpShrinkingRandomWalkTrials = function() {
    gph6.graphH = document.getElementById('random-shrinking-walk-trials-graphHolder')
    defaultGraphOptions["xmax"] = 2*1.414 + 1
    defaultGraphOptions["ymax"] = 2*1.414
    defaultGraphOptions["xmin"] = -1
    defaultGraphOptions["ymin"] = -1

    // defaultGraphOptions["scrollZoom"] = 'yes'
    // defaultGraphOptions["draggability"] = 'yes'

    viewX.addGraph(gph6.graphH, "random-shrinking-walk-trials-graph", defaultGraphOptions)

    lineOptions = { x1: -0.5, y1: 0, x2: 2*1.414, y2:0, strokewidth: 0.7, linecolor: "hsla(0, 0%, 66%,0.2)"}; 
    viewX.addLine("random-shrinking-walk-trials-graph", "random-shrinking-walk-trials-y-axis-line", lineOptions);

    lineOptions = { y1: -0.5, x1: 0, y2: 2*1.414, x2:0, strokewidth: 0.7, linecolor: "hsla(0, 0%, 66%,0.2)"}; 
    viewX.addLine("random-shrinking-walk-trials-graph", "random-shrinking-walk-trials-x-axis-line", lineOptions);

    pointOptions = { x: 0, y: 0, pointsize: upcApp.graphPointSize, pointcolor: 'white'};
    viewX.addPoint("random-shrinking-walk-trials-graph", "random-shrinking-walk-trials-origin", pointOptions);

    textOptions = {x: 0 + 0.3, y: 0 - 0.2, text: "(0, 0)",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.8, fontFamily: "Nunito",   textcolor: "white"};
    viewX.addText("random-shrinking-walk-trials-graph", "random-shrinking-walk-trials-origin-label", textOptions);
    
}

gph6.trialsAdded = 0
gph6.maxWalkedSteps = 12
gph6.trials = []
gph6.trialDisplayed = 0
gph6.trialsDistances = []

gph6.walkedPoints = []
gph6.walkedPointsCurrent = []
gph6.generateWalk = function(uptoNumber) {
    gph6.walkedPoints = []
    if (gph6.walkedPoints.length < uptoNumber) {
        for (let i = gph6.walkedPoints.length + 1; i <= uptoNumber; i++) {
            stepLengthAtStep = Math.sqrt(2)/Math.pow(2, i - 1)
            stepDirection = viewX.randomChoice([[0, 1], [1, 0]])
            previousPoint = [0, 0]
            if (gph6.walkedPoints.length != 0) {
                previousPoint = gph6.walkedPoints[i - 2]
            }
            newPoint = [previousPoint[0] + stepLengthAtStep*stepDirection[0], previousPoint[1] + stepLengthAtStep*stepDirection[1]]
            gph6.walkedPoints.push(newPoint)
        }
    }
    else {
        gph6.walkedPoints = gph6.walkedPoints.slice(0, uptoNumber)
    }
}

gph6.drawShrinkingRandomWalkPath = function() {
    for (let i = 0; i < gph6.walkedPointsCurrent.length; i++) {
        if (i < 3) {
            pointColor = ["var(--lightOrange)", "var(--brightYellow)", "var(--lightGreen)","var(--lightBlue)"][i]
        }
        else if (i >= 3) {
            pointColor = "var(--lightBlue)"
        }

        if (i < 4) {
            sizeToUse = upcApp.graphPointSize/(i + 1)
        }
        else {
            sizeToUse = upcApp.graphPointSize/4
        }
        pointOptions = { x: gph6.walkedPointsCurrent[i][0] , y: gph6.walkedPointsCurrent[i][1], pointsize: sizeToUse, pointcolor: pointColor};
        viewX.addPoint("random-shrinking-walk-trials-graph", "random-shrinking-walk-trials-point-" + i, pointOptions);
        gph6.previousPoint = [0, 0]
        if (i != 0) {
            gph6.previousPoint = gph6.walkedPointsCurrent[i - 1]
        }
        lineOptions = { x1: gph6.previousPoint[0], y1: gph6.previousPoint[1], x2: gph6.walkedPointsCurrent[i][0], y2: gph6.walkedPointsCurrent[i][1], strokewidth: 0.7/(i + 1), linecolor: pointColor}; 
        viewX.addLine("random-shrinking-walk-trials-graph", "random-shrinking-walk-trials-line-segment-" + i, lineOptions);

        if (i == gph6.walkedPointsCurrent.length - 1) {
            pointOptions = { x: gph6.walkedPointsCurrent[i][0] , y: gph6.walkedPointsCurrent[i][1], pointsize: upcApp.graphPointSize, pointcolor: "var(--lightPurple)"};
            viewX.addPoint("random-shrinking-walk-trials-graph", "random-shrinking-walk-trials-point-final", pointOptions);

            textOptions = {x: gph6.walkedPointsCurrent[i][0] + 0.4, y: gph6.walkedPointsCurrent[i][1] - 0.2, text: "Drunkard",  textAlign: "center",  fontSize: upcApp.graphFontSizeSmall, fontFamily: "Raleway",   textcolor: "var(--lightPurple)"};
            viewX.addText("random-shrinking-walk-trials-graph", "random-shrinking-walk-trials-point-final-label", textOptions);

            
            textOptions = {x: gph6.walkedPointsCurrent[i][0]/2, y: gph6.walkedPointsCurrent[i][1]/2, text: gph6.trialsDistances[gph6.trialDisplayed].toFixed(3),  textAlign: "center",  fontSize: upcApp.graphFontSizeSmall, fontFamily: "Nunito",   textcolor: "var(--lightPink)"};
            viewX.addText("random-shrinking-walk-trials-graph", "random-shrinking-walk-trials-distance-label", textOptions);
        }

        
    }

    if (gph6.walkedPointsCurrent.length > 3) {
        lineOptions = { x1: 0, y1: 0, x2: gph6.walkedPointsCurrent[gph6.walkedPointsCurrent.length - 1][0], y2: gph6.walkedPointsCurrent[gph6.walkedPointsCurrent.length - 1][1], strokewidth: 0.7, strokedasharray: "4, 4", linecolor: "hsla(var(--lightPinkH), var(--lightPinkS), var(--lightPinkL), " + (gph6.walkedPointsCurrent.length/30) + ")"};
        viewX.addLine("random-shrinking-walk-trials-graph", "random-shrinking-walk-trials-distance-line-segment", lineOptions);
    }
}

gph6.eraseWalk = function() {
    for (let i = 0; i < gph6.walkedPointsCurrent.length; i++) {
        viewX.removePoint("random-shrinking-walk-trials-graph", "random-shrinking-walk-trials-point-" + i)
        viewX.removeLine("random-shrinking-walk-trials-graph", "random-shrinking-walk-trials-line-segment-" + i)
        viewX.removePoint("random-shrinking-walk-trials-graph", "random-shrinking-walk-trials-point-final")
        viewX.removeText("random-shrinking-walk-trials-graph", "random-shrinking-walk-trials-point-final-label")
        viewX.removeText("random-shrinking-walk-trials-graph", "random-shrinking-walk-trials-distance-label")
        viewX.removeLine("random-shrinking-walk-trials-graph", "random-shrinking-walk-trials-distance-line-segment")
    }
}


gph6.displayTrial = function() {
    gph6.eraseWalk()
    gph6.walkedPointsCurrent = gph6.trials[gph6.trialDisplayed]
    gph6.drawShrinkingRandomWalkPath()
    document.getElementById('random-shrinking-walk-trials-info-for-trial').innerHTML= 'For trial <span class="p-lightPink">' + (gph6.trialDisplayed + 1) + '</span>, the distance was  <span class="p-lightPink">' + gph6.trialsDistances[gph6.trialDisplayed].toFixed(4) + '.</span>. '

    trialsHolder = document.getElementById("random-shrinking-walk-trials-holder")
    trialsHolder.innerHTML = ""
    for (let i = 0; i < gph6.trials.length; i++) {
        trialsHolder.innerHTML += "<div class='commonButtonTrial p-2 pl-3 pr-3 mt-1 btn-ignus' id='random-shrinking-walk-trial-" + i + "-button' onclick='gph6.trialDisplayed = " + i + "; gph6.displayTrial()' " + (i == gph6.trialDisplayed ? "style='background-color: var(--lightPink); color: black;'" : "") + ">" + (i + 1) + "</div>"
    }

    document.getElementById('random-shrinking-walk-trials-average-statement').innerHTML= 'Average distance for <span class="p-lightPink">' + gph6.trialsDistances.length + ' trial' +  (gph6.trialsDistances.length != 1 ? 's':'') + '</span> so far, is <span class="p-lightPink">' + (gph6.trialsDistances.reduce((a, b) => a + b, 0)/gph6.trialsDistances.length).toFixed(4) + '.</span>'
}

gph6.addNewWalk = function() {
    gph6.generateWalk(gph6.maxWalkedSteps)
    gph6.trials.push(gph6.walkedPoints)
    gph6.trialsDistances.push(viewX.distF([0, 0], gph6.walkedPoints[gph6.walkedPoints.length - 1]))
    gph6.trialDisplayed = gph6.trials.length - 1
    gph6.displayTrial()

    gph6.trialsAdded += 1

    // saveData()
    
}


var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPink)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPink)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "random-shrinking-walk-distance-answer-Slider");

gph6.correctAnswer = upc
gph6.acceptableError = 0.04

gph6.slider = document.getElementById("random-shrinking-walk-distance-answer-Slider");
gph6.sliderLabel = document.getElementById("random-shrinking-walk-distance-answer-SliderLabel");
gph6.sliderInfo = document.getElementById("random-shrinking-walk-distance-answer-SliderInfo");

gph6.slider.value = Math.random()*1
gph6.sliderLabel.innerHTML = gph6.slider.value

gph6.slider.addEventListener('input', function() {
    gph6.sliderLabel.innerHTML = gph6.slider.value
});


gph6.checkAnswerButton = document.getElementById("gph6-checkAnswerButton");
gph6.checkAnswerButton.addEventListener('click', function() {
    gph6.checkAnswer()
});

gph6.lastError = null;
gph6.checkAnswer = function() {
    let currentError = Math.abs(parseFloat(gph6.slider.value) - gph6.correctAnswer);
    if (currentError < gph6.acceptableError) {
        gph6.sliderInfo.innerHTML = "Correct! 🎉 The answer you gave is less than " + gph6.acceptableError + " away from the actual value.";
        upcApp.anim.show();
        upcApp.anim.goToAndPlay(0);
        upcApp.anim.setSpeed(2)
        upcApp.anim.play();
        if (upcApp.revealPoint == 1) {
            upcApp.revealSection()
        }
    }
    else {
        if (gph6.lastError === null) {
            gph6.sliderInfo.innerHTML = "Keep trying!";
        } else if (currentError < gph6.lastError) {
            gph6.sliderInfo.innerHTML = "Warmer! 🔥 Getting better.";
            document.getElementById("warmerMusic").play();
        } else if (currentError > gph6.lastError) {
            gph6.sliderInfo.innerHTML = "Colder! 😃 ";
            document.getElementById("colderMusic").play();
        }
    }
    gph6.lastError = currentError;

    upcApp.interactionNumber += 1
    dateTimeNow = new Date()
    upcApp.interactions[upcApp.interactionNumber] = {
        dateTime : dateTimeNow.toString(),
        "type": "answer for random walk distance",
        "answer": gph6.slider.value
    }

    // saveData()
};


gph6.continueButton = document.getElementById("reveal-2-continueButton");

gph6.continueButton.addEventListener('click', function() {
    if (upcApp.revealPoint == 1) {
        upcApp.revealSection()
    }
});


    // graph 7 : shrinking random walk - the parabola

gph7 = {}

gph7.setUpShrinkingRandomWalkReveal = function() {
    gph7.graphH = document.getElementById('random-shrinking-walk-reveal-graphHolder')
    defaultGraphOptions["xmax"] = 2*1.414 + 1
    defaultGraphOptions["ymax"] = 2*1.414
    defaultGraphOptions["xmin"] = -1
    defaultGraphOptions["ymin"] = -1

    // defaultGraphOptions["scrollZoom"] = 'yes'
    // defaultGraphOptions["draggability"] = 'yes'

    viewX.addGraph(gph7.graphH, "random-shrinking-walk-reveal-graph", defaultGraphOptions)

    lineOptions = { x1: -0.5, y1: 0, x2: 2*1.414, y2:0, strokewidth: 0.7, linecolor: "hsla(0, 0%, 66%,0.2)"}; 
    viewX.addLine("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-x-axis-line", lineOptions);

    lineOptions = { y1: -0.5, x1: 0, y2: 2*1.414, x2:0, strokewidth: 0.7, linecolor: "hsla(0, 0%, 66%,0.2)"}; 
    viewX.addLine("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-y-axis-line", lineOptions);

    pointOptions = { x: 0, y: 0, pointsize: upcApp.graphPointSize, pointcolor: 'white'};
    viewX.addPoint("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-origin", pointOptions);

    textOptions = {x: 0 + 0.3, y: 0 - 0.2, text: "(0, 0)",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.8, fontFamily: "Nunito",   textcolor: "white"};
    viewX.addText("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-origin-label", textOptions);
    
    for (m = 0; m < 4; m++) {
        gph7.addNewWalk()
    }

    gph7.otherDrawings()
    
}


gph7.maxWalkedSteps = 12
gph7.trials = []
gph7.trialDisplayed = 0
gph7.trialsDistances = []

gph7.walkedPoints = []
gph7.walkedPointsCurrent = []
gph7.generateWalk = function(uptoNumber) {
    gph7.walkedPoints = []
    if (gph7.walkedPoints.length < uptoNumber) {
        for (let i = gph7.walkedPoints.length + 1; i <= uptoNumber; i++) {
            stepLengthAtStep = Math.sqrt(2)/Math.pow(2, i - 1)
            stepDirection = viewX.randomChoice([[0, 1], [1, 0]])
            previousPoint = [0, 0]
            if (gph7.walkedPoints.length != 0) {
                previousPoint = gph7.walkedPoints[i - 2]
            }
            newPoint = [previousPoint[0] + stepLengthAtStep*stepDirection[0], previousPoint[1] + stepLengthAtStep*stepDirection[1]]
            gph7.walkedPoints.push(newPoint)
        }
    }
    else {
        gph7.walkedPoints = gph7.walkedPoints.slice(0, uptoNumber)
    }
}

gph7.drawShrinkingRandomWalkPath = function() {
    for (let i = 0; i < gph7.walkedPointsCurrent.length; i++) {
        if (i < 3) {
            pointColor = ["var(--brightYellow)","var(--lightOrange)","var(--lightGreen)","var(--lightBlue)"][i]
        }
        else if (i >= 3) {
            pointColor = "var(--lightBlue)"
        }


        if (i < 4) {
            sizeToUse = upcApp.graphPointSize/(i + 1)
        }
        else {
            sizeToUse = upcApp.graphPointSize/4
        }
        pointOptions = { x: gph7.walkedPointsCurrent[i][0] , y: gph7.walkedPointsCurrent[i][1], pointsize: sizeToUse, pointcolor: pointColor};
        thePoint = viewX.addPoint("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-point-" + i, pointOptions);

        thePoint[0].style.opacity = 0.4

        gph7.previousPoint = [0, 0]
        if (i != 0) {
            gph7.previousPoint = gph7.walkedPointsCurrent[i - 1]
        }

        lineOptions = { x1: gph7.previousPoint[0], y1: gph7.previousPoint[1], x2: gph7.walkedPointsCurrent[i][0], y2: gph7.walkedPointsCurrent[i][1], strokewidth: 0.7/(i + 1), linecolor: pointColor}; 
        theLine = viewX.addLine("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-line-segment-" + i, lineOptions);
        theLine[0].style.opacity = 0.4

        if (i == gph7.walkedPointsCurrent.length - 1) {
            pointOptions = { x: gph7.walkedPointsCurrent[i][0] , y: gph7.walkedPointsCurrent[i][1], pointsize: upcApp.graphPointSize, pointcolor: "var(--lightPurple)"};
            viewX.addPoint("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-point-final", pointOptions);

            textOptions = {x: gph7.walkedPointsCurrent[i][0] + 0.4, y: gph7.walkedPointsCurrent[i][1] - 0.2, text: "Drunkard",  textAlign: "center",  fontSize: upcApp.graphFontSizeSmall, fontFamily: "Raleway",   textcolor: "var(--lightPurple)"};
            viewX.addText("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-point-final-label", textOptions);

            
            textOptions = {x: gph7.walkedPointsCurrent[i][0]/2, y: gph7.walkedPointsCurrent[i][1]/2, text: gph7.trialsDistances[gph7.trialDisplayed].toFixed(3),  textAlign: "center",  fontSize: upcApp.graphFontSizeSmall, fontFamily: "Nunito",   textcolor: "var(--lightPink)"};
            viewX.addText("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-distance-label", textOptions);
        }

        
    }

    if (gph7.walkedPointsCurrent.length > 3) {
        lineOptions = { x1: 0, y1: 0, x2: gph7.walkedPointsCurrent[gph7.walkedPointsCurrent.length - 1][0], y2: gph7.walkedPointsCurrent[gph7.walkedPointsCurrent.length - 1][1], strokewidth: 0.7, strokedasharray: "4, 4", linecolor: "hsla(var(--lightPinkH), var(--lightPinkS), var(--lightPinkL), 1)"};
        viewX.addLine("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-distance-line-segment", lineOptions);
    }
}

gph7.eraseWalk = function() {
    for (let i = 0; i < gph7.walkedPointsCurrent.length; i++) {
        viewX.removePoint("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-point-" + i)
        viewX.removeLine("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-line-segment-" + i)
        viewX.removePoint("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-point-final")
        viewX.removeText("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-point-final-label")
        viewX.removeText("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-distance-label")
        viewX.removeLine("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-distance-line-segment")
        
        for (k = 0; k < gph7.trials.length - 1; k++) {
            viewX.removePoint("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-point-final-for-trial-" + k)
        }
        viewX.removeLine("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-line-of-square")

        viewX.removeLine("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-line-of-square-1")
        viewX.removeLine("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-line-of-square-2")
        viewX.removeLine("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-line-of-square-3")
        
    }
}


gph7.displayTrial = function() {
    gph7.eraseWalk()
    gph7.walkedPointsCurrent = gph7.trials[gph7.trialDisplayed]
    gph7.drawShrinkingRandomWalkPath()
}

gph7.addNewWalk = function() {
    gph7.generateWalk(gph7.maxWalkedSteps)
    gph7.trials.push(gph7.walkedPoints)
    gph7.trialsDistances.push(viewX.distF([0, 0], gph7.walkedPoints[gph7.walkedPoints.length - 1]))
    gph7.trialDisplayed = gph7.trials.length - 1
    gph7.displayTrial()
    
}


var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightBlue)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightBlue)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "random-shrinking-walk-reveal-Slider");

gph7.slider = document.getElementById("random-shrinking-walk-reveal-Slider");
gph7.sliderLabel = document.getElementById("random-shrinking-walk-reveal-SliderLabel");
gph7.sliderInfo = document.getElementById("random-shrinking-walk-reveal-SliderInfo");

gph7.slider.value = 2
gph7.sliderLabel.innerHTML = gph7.slider.value

gph7.slider.max = 4


gph7.sliderMoveEvent = function(event) {
    gph7.sliderLabel.innerHTML = gph7.slider.value + " trial" + (gph7.slider.value == 1 ? "" : "s")
    gph7.trialDisplayed = gph7.slider.value - 1

    
    gph7.displayTrial()
    gph7.otherDrawings()
    
    if (gph7.slider.max == gph7.slider.value && gph7.slider.max != 200) {
        gph7.slider.removeEventListener('input', gph7.sliderMoveEvent);
        gph7.slider.disabled = true
        gph7.slider.style.filter = 'saturate(0.1) brightness(0.5)'
        setTimeout(function() {
            gph7.slider.addEventListener('input', gph7.sliderMoveEvent);
            gph7.slider.disabled = false
            gph7.slider.style.filter = 'none'
        }, 1000);


        if (gph7.slider.max == 4) {
            gph7.slider.max = 15
            gph7.sliderInfo.innerHTML = "Maybe more trials? 🤔"
            for (m = 4; m < 15; m++) {
                gph7.addNewWalk()
                gph7.otherDrawings()
            }
        }
        else if(gph7.slider.max == 15) {
            gph7.slider.max = 25
            gph7.sliderInfo.innerHTML = "Maybe even more trials. :D"
            for (m = 15; m < 25; m++) {
                gph7.addNewWalk()
                gph7.otherDrawings()
            }
        }
        else if(gph7.slider.max == 25) {
            gph7.slider.max = 100
            gph7.sliderInfo.innerHTML = "The picture might be clear with more trials."
            for (m = 25; m < 100; m++) {
                gph7.addNewWalk()
                gph7.otherDrawings()
            }
        }
        else if(gph7.slider.max == 100) {
            gph7.slider.max = 200
            gph7.sliderInfo.innerHTML = "Better?"
            for (m = 95; m < 200; m++) {
                gph7.addNewWalk()
                gph7.otherDrawings()
            }
        }
        else {
            gph7.slider.max = 200
        }
    }
    

}

gph7.slider.addEventListener('input', gph7.sliderMoveEvent);

gph7.otherDrawings = function() {


    if (gph7.slider.value > 0) {
        for (k = 0; k < gph7.slider.value -1; k++) {
            finalPointInTrial = gph7.trials[k][gph7.trials[k].length - 1]
            pointOptions = { x: finalPointInTrial[0] , y: finalPointInTrial[1], pointsize: upcApp.graphPointSize, pointcolor: "var(--lightPurple)"};
            finalPoint = viewX.addPoint("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-point-final-for-trial-" + k, pointOptions);
            finalPoint[0].style.opacity = 0.4 - (0.35*gph7.slider.value/200)
        }
    }

    if (gph7.slider.value > 15) {
        lineOptions = { x1: 2*Math.sqrt(2), y1: 0, x2: 0, y2: 2*Math.sqrt(2), strokewidth: 3, linecolor: 'var(--lightYellow)'}; 
        theLineSquarePart = viewX.addLine("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-line-of-square", lineOptions);
        if (gph7.slider.value < 100) {
            theLineSquarePart[0].style.opacity = (gph7.slider.value - 15)*0.9/100
        }
        else {
            theLineSquarePart[0].style.opacity = (100 - 15)*0.9/100
        }
        
    }

    if (gph7.slider.value > 25) {
        lineOptions = { x1: -2*Math.sqrt(2), y1: 0, x2: 0, y2: 2*Math.sqrt(2), strokewidth: 1, linecolor: 'var(--lightYellow)'}; 
        theLineSquarePart = viewX.addLine("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-line-of-square-1", lineOptions);
        if (gph7.slider.value < 100) {
            theLineSquarePart[0].style.opacity = (gph7.slider.value - 25)*0.9/150
        }
        else {
            theLineSquarePart[0].style.opacity = (100 - 25)*0.9/150
        }

        lineOptions = { x1: -2*Math.sqrt(2), y1: 0, x2: 0, y2: -2*Math.sqrt(2), strokewidth: 1, linecolor: 'var(--lightYellow)'}; 
        theLineSquarePart = viewX.addLine("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-line-of-square-2", lineOptions);
        if (gph7.slider.value < 100) {
            theLineSquarePart[0].style.opacity = (gph7.slider.value - 25)*0.9/150
        }
        else {
            theLineSquarePart[0].style.opacity = (100 - 25)*0.9/150
        }

        lineOptions = { x1: 2*Math.sqrt(2), y1: 0, x2: 0, y2: -2*Math.sqrt(2), strokewidth: 1, linecolor: 'var(--lightYellow)'}; 
        theLineSquarePart = viewX.addLine("random-shrinking-walk-reveal-graph", "random-shrinking-walk-reveal-line-of-square-3", lineOptions);
        if (gph7.slider.value < 100) {
            theLineSquarePart[0].style.opacity = (gph7.slider.value - 25)*0.9/150
        }
        else {
            theLineSquarePart[0].style.opacity = (100 - 25)*0.9/150
        }
        
    }


    document.getElementById('random-shrinking-walk-reveal-graph').style.transform = 'rotate(0deg)'
    document.getElementById('random-shrinking-walk-reveal-graph').style.transformOrigin = 'center'

    zoomValues = {}
    zoomValues["xmax"] = 2*1.414 + 1
    zoomValues["ymax"] = 2*1.414
    zoomValues["xmin"] = - 1
    zoomValues["ymin"] = - 1
    
    viewX.updateGraphZoom("random-shrinking-walk-reveal-graph", zoomValues)

    if (gph7.slider.value > 100) {

        rotationAngle = viewX.linearValue(100, 200, 0, 45, gph7.slider.value)
        document.getElementById('random-shrinking-walk-reveal-graph').style.transform = 'rotate(' +rotationAngle + 'deg)'
        document.getElementById('random-shrinking-walk-reveal-graph').style.transformOrigin = 'center'
        
        zoomValues = {}
        zoomValues["xmax"] = 2*1.414 + 1 + viewX.linearValue(100, 210, 0, 1, gph7.slider.value)
        zoomValues["ymax"] = 2*1.414 + viewX.linearValue(100, 210, 0, 1, gph7.slider.value)
        zoomValues["xmin"] = - 1 - viewX.linearValue(100, 210, 0, 2*1.414 + 1, gph7.slider.value)
        zoomValues["ymin"] = - 1 - viewX.linearValue(100, 210, 0, 2*1.414 - 1, gph7.slider.value)
        
        viewX.updateGraphZoom("random-shrinking-walk-reveal-graph", zoomValues)
    }
}

// More Code by GPT4


function closestPointOnLineGivenByPoints(p1, p2, forPoint) {
    // Convert the points to vectors
    const FA = { x: forPoint[0] - p1[0], y: forPoint[1] - p1[1] };

    let dirVec = {x: p2[0] - p1[0], y: p2[1] - p1[1]};


    // Calculate the parameter t
    const t = (FA.x * dirVec.x + FA.y * dirVec.y) / (dirVec.x * dirVec.x + dirVec.y * dirVec.y);

    // Calculate the coordinates of the closest point P
    const xP = p1[0] + t * dirVec.x;
    const yP = p1[1] + t * dirVec.y;

    // Create and return the closest point P
    return  [xP, yP];
}

function parabolaPoints(focus, directrixPoint1, directrixPoint2, tStart, tEnd, numPoints) {

    // Convert the points to vectors
    const FA = { x: focus[0] - directrixPoint1[0], y: focus[1] - directrixPoint1[1] };

    let dirVec = {x: directrixPoint2[0] - directrixPoint1[0], y: directrixPoint2[1] - directrixPoint1[1]};
    

    // Calculate the parameter t
    const t = (FA.x * dirVec.x + FA.y * dirVec.y) / (dirVec.x * dirVec.x + dirVec.y * dirVec.y);

    // Calculate the coordinates of the closest point P
    const xP = directrixPoint1[0] + t * dirVec.x;
    const yP = directrixPoint1[1] + t * dirVec.y;

    // Create and return the closest point P
    closePoint = [xP, yP];

    // Parabola parameter 'a' is the distance from the focus to the directrix/2
    valueOfA = viewX.distF(closePoint, focus)/2

    // vertex is the midpoint of the focus and the closest point
    vertex = [(focus[0] + closePoint[0])/2, (focus[1] + closePoint[1])/2]

    var magnitudeA = Math.sqrt(dirVec.x * dirVec.x + dirVec.y * dirVec.y);
    var cosAngle = dirVec.x / (magnitudeA * 1);
    
    var angleRad = Math.acos(cosAngle);
    var angleDeg = angleRad * (180 / Math.PI);
    if (dirVec.y < 0) {
        angleDeg = 360 - angleDeg; // Adjust for the fourth quadrant
    }

    let points = [];
    for(let i = 0; i < numPoints; i++){
        let t = tStart + i * (tEnd - tStart) / (numPoints - 1);
        untransformed = [2*valueOfA*t, valueOfA*Math.pow(t, 2)]
        
        rotatedVector = viewX.rotatedVec(untransformed, angleDeg)
        
        thePointOnTheParabola = [rotatedVector[0] + vertex[0], rotatedVector[1] + vertex[1]]

        points.push(thePointOnTheParabola)
    }

    parabolaProperties = {}
    parabolaProperties.points = points
    parabolaProperties.vertex = vertex
    parabolaProperties.focus = focus
    parabolaProperties.directrixPoint1 = directrixPoint1
    parabolaProperties.directrixPoint2 = directrixPoint2
    parabolaProperties.a = valueOfA
    parabolaProperties.angleWithXAxis = angleDeg

    untransformed = [2*valueOfA*1, valueOfA*Math.pow(1, 2)]
    rotatedVector = viewX.rotatedVec(untransformed, angleDeg)
    thePointOnTheParabola = [rotatedVector[0] + vertex[0], rotatedVector[1] + vertex[1]]
    parabolaProperties.latusRectumPointRight = thePointOnTheParabola

    untransformed = [2*valueOfA*(-1), valueOfA*Math.pow(-1, 2)]
    rotatedVector = viewX.rotatedVec(untransformed, angleDeg)
    thePointOnTheParabola = [rotatedVector[0] + vertex[0], rotatedVector[1] + vertex[1]]
    parabolaProperties.latusRectumPointLeft = thePointOnTheParabola

    return parabolaProperties
}


function getParabolicPointData(focus, directrixPoint1, directrixPoint2, tValue) {
    // Convert the points to vectors
    const FA = { x: focus[0] - directrixPoint1[0], y: focus[1] - directrixPoint1[1] };

    let dirVec = {x: directrixPoint2[0] - directrixPoint1[0], y: directrixPoint2[1] - directrixPoint1[1]};


    // Calculate the parameter t
    const t = (FA.x * dirVec.x + FA.y * dirVec.y) / (dirVec.x * dirVec.x + dirVec.y * dirVec.y);

    // Calculate the coordinates of the closest point P
    const xP = directrixPoint1[0] + t * dirVec.x;
    const yP = directrixPoint1[1] + t * dirVec.y;

    // Create and return the closest point P
    closePoint = [xP, yP];

    // Parabola parameter 'a' is the distance from the focus to the directrix/2
    valueOfA = viewX.distF(closePoint, focus)/2

    // vertex is the midpoint of the focus and the closest point
    vertex = [(focus[0] + closePoint[0])/2, (focus[1] + closePoint[1])/2]

    var magnitudeA = Math.sqrt(dirVec.x * dirVec.x + dirVec.y * dirVec.y);
    var cosAngle = dirVec.x / (magnitudeA * 1);

    var angleRad = Math.acos(cosAngle);
    var angleDeg = angleRad * (180 / Math.PI);
    if (dirVec.y < 0) {
        angleDeg = 360 - angleDeg; // Adjust for the fourth quadrant
    }

    untransformed = [2*valueOfA*tValue, valueOfA*Math.pow(tValue, 2)]
    rotatedVector = viewX.rotatedVec(untransformed, angleDeg)
    thePointOnTheParabola = [rotatedVector[0] + vertex[0], rotatedVector[1] + vertex[1]]

    theSlope = (2*valueOfA*tValue)/(2*valueOfA)

    return {point: thePointOnTheParabola, slope: theSlope}
}



// thePoints = parabolaPoints({x: 0, y: 1}, {x: -1, y: -1}, {x: 1, y: -1}, -4, 4, 100)


    // graph 8 : the circle parabola compare

gph8 = {}

gph8.setUpParabolaCircleCompare = function() {
    gph8.graphH = document.getElementById('parabola-circle-compare-graphHolder')
    defaultGraphOptions["xmax"] = upcApp.parabolicCircleGraph["xmax"]
    defaultGraphOptions["ymax"] = upcApp.parabolicCircleGraph["ymax"]
    defaultGraphOptions["xmin"] = upcApp.parabolicCircleGraph["xmin"]
    defaultGraphOptions["ymin"] = upcApp.parabolicCircleGraph["ymin"]
    
    if (window.innerWidth >= 1000) {
        defaultGraphOptions["ymajorgridlinesvisibility"] = "yes"
        defaultGraphOptions["xmajorgridlinesvisibility"] = "yes"
    }

    // defaultGraphOptions["scrollZoom"] = 'yes'
    // defaultGraphOptions["draggability"] = 'yes'


    viewX.addGraph(gph8.graphH, "parabola-circle-compare-graph", defaultGraphOptions)

    defaultGraphOptions["ymajorgridlinesvisibility"] = "no"
    defaultGraphOptions["xmajorgridlinesvisibility"] = "no"

    theParabola = parabolaPoints([0, 1], [-1, -1], [1, -1], -4, 4, 100)
    thePoints = theParabola.points

    lineOptions = { x1: theParabola.latusRectumPointLeft[0], y1: theParabola.latusRectumPointLeft[1], x2: theParabola.latusRectumPointRight[0], y2: theParabola.latusRectumPointRight[1], strokewidth: 2, linecolor: "hsla(0, 0%, 66%,0.2)"}; 
    viewX.addLine("parabola-circle-compare-graph", "parabola-circle-compare-latusRectum", lineOptions);

    lineOptions = { x1: theParabola.latusRectumPointRight[0], y1: theParabola.latusRectumPointRight[1], x2: theParabola.focus[0], y2: theParabola.focus[1], strokewidth: 3, linecolor: "var(--lightBlue)"}; 
    viewX.addLine("parabola-circle-compare-graph", "parabola-circle-compare-radius", lineOptions);

    pointOptions = { x:  theParabola.focus[0], y:  theParabola.focus[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--brightYellow)'};
    viewX.addPoint("parabola-circle-compare-graph", "parabola-circle-compare-focus", pointOptions);

    textOptions = {x:  theParabola.focus[0] + upcApp.parabolicCircleGraph["point-label-gap"], y:  theParabola.focus[1] - upcApp.parabolicCircleGraph["point-label-gap"], text: "F",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--brightYellow)"};
    viewX.addText("parabola-circle-compare-graph", "parabola-circle-compare-focus-label", textOptions);

    circleOptions = {
        x: theParabola.focus[0],
        y: theParabola.focus[1],
        radius: 2*theParabola.a,
        circlecolor: 'hsla(80, 100%, 50%, 0)',
        stroke: "hsla(190, 0%, 60%, 0.5)",
        strokewidth: 0.5,
        strokedasharray: "7, 7",
    };
    viewX.addCircle("parabola-circle-compare-graph", "parabola-circle-compare-circle-dotted", circleOptions);

    // viewX.makeArc = function(gphname, ringname, arcradius, arccenter, arcthickness, arccolor, startanglepercent,endanglepercent, resolution)

    viewX.makeArc("parabola-circle-compare-graph", "parabola-circle-compare-circle-arc", 2, theParabola.focus, 0.9, "var(--lightPink)", 0.5, 1, 100)
    
    var pathOptions = {
        points: thePoints,
        strokewidth: 0.3,
        strokedasharray: "1, 1",
        pathcolor: "hsla(190, 0%, 60%, 0.5)",
        pathfillcolor: "none"
    };
    viewX.addPath("parabola-circle-compare-graph", "parabola-circle-compare-parabola-dotted", pathOptions);
    
    theParabolicArc = parabolaPoints([0, 1], [-1, -1], [1, -1], -1, 1, 50)
    theParabolicArcPoints = theParabolicArc.points

    var pathOptions = {
        points: theParabolicArcPoints,
        strokewidth: 0.9,
        pathcolor: "var(--lightPurple)",
        pathfillcolor: "none"
    };
    viewX.addPath("parabola-circle-compare-graph", "parabola-circle-compare-parabola-arc", pathOptions);
    
    // document.getElementById("parabola-circle-compare-parabolaarc-value").innerHTML = (gph8.slider.value*upc).toFixed(4)
    // document.getElementById("parabola-circle-compare-parabolaradius-value").innerHTML = gph8.slider.value
    // document.getElementById("parabola-circle-compare-circlearc-value").innerHTML = (gph8.slider.value*Math.PI).toFixed(4)
    // document.getElementById("parabola-circle-compare-circleradius-value").innerHTML = gph8.slider.value
    
    document.getElementById("parabola-circle-compare-circle-equation-with-values").innerHTML = "\\(\\color{#737373}{=\\frac{\\color{#e3a0cd}{" + (gph8.slider.value*Math.PI).toFixed(4) + "}}{\\color{#61bdff}{" + gph8.slider.value  + "}}}\\)"

    document.getElementById("parabola-circle-compare-parabola-equation-with-values").innerHTML = "\\(\\color{#737373}{=\\frac{\\color{#e3a0cd}{" + (gph8.slider.value*upc).toFixed(4) + "}}{\\color{#61bdff}{" + gph8.slider.value  + "}}}\\)"
    document.getElementById("parabola-circle-compare-upc-value").innerHTML = upc.toFixed(4)
    document.getElementById("parabola-circle-compare-pi-value").innerHTML = Math.PI.toFixed(4)
    
    typesettingElement1 = document.getElementById("parabola-circle-compare-circle-equation-with-values")

    typesettingElement2 = document.getElementById("parabola-circle-compare-parabola-equation-with-values")

    MathJax.typesetClear([typesettingElement1, typesettingElement2]);
    MathJax.typeset([typesettingElement1, typesettingElement2])

    
}

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(10, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightBlue)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightBlue)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "parabola-circle-compare-Slider");

gph8.slider = document.getElementById("parabola-circle-compare-Slider");
gph8.sliderLabel = document.getElementById("parabola-circle-compare-SliderLabel");
gph8.sliderInfo = document.getElementById("parabola-circle-compare-SliderInfo");

gph8.slider.value = 2
gph8.sliderLabel.innerHTML = gph8.slider.value


gph8.eraseParts = function() {
    viewX.removeCircle("parabola-circle-compare-graph", "parabola-circle-compare-circle-dotted")
    viewX.removePath("parabola-circle-compare-graph", "parabola-circle-compare-parabola-dotted")
    viewX.removePath("parabola-circle-compare-graph", "parabola-circle-compare-parabola-arc")
    viewX.removePath("parabola-circle-compare-graph", "parabola-circle-compare-circle-arc")
}

gph8.slider.addEventListener('input', function() {
    gph8.updateGraph()
    gph8.sliderLabel.innerHTML = gph8.slider.value
    // document.getElementById("parabola-circle-compare-parabolaarc-value").innerHTML = (gph8.slider.value*upc).toFixed(4)

    document.getElementById("parabola-circle-compare-parabola-equation-with-values").innerHTML = "\\(\\color{#737373}{=\\frac{\\color{#e3a0cd}{" + (gph8.slider.value*upc).toFixed(4) + "}}{\\color{#61bdff}{" + gph8.slider.value  + "}}}\\)"


    // document.getElementById("parabola-circle-compare-parabolaradius-value").innerHTML = gph8.slider.value
    // document.getElementById("parabola-circle-compare-circlearc-value").innerHTML = (gph8.slider.value*Math.PI).toFixed(4)

    document.getElementById("parabola-circle-compare-circle-equation-with-values").innerHTML = "\\(\\color{#737373}{=\\frac{\\color{#e3a0cd}{" + (gph8.slider.value*Math.PI).toFixed(4) + "}}{\\color{#61bdff}{" + gph8.slider.value  + "}}}\\)"
    
    // document.getElementById("parabola-circle-compare-circleradius-value").innerHTML = gph8.slider.value
    document.getElementById("parabola-circle-compare-upc-value").innerHTML = upc.toFixed(4)
    document.getElementById("parabola-circle-compare-pi-value").innerHTML = Math.PI.toFixed(4)

    typesettingElement1 = document.getElementById("parabola-circle-compare-circle-equation-with-values")

    typesettingElement2 = document.getElementById("parabola-circle-compare-parabola-equation-with-values")

    MathJax.typesetClear([typesettingElement1, typesettingElement2]);
    MathJax.typeset([typesettingElement1, typesettingElement2])

    
});

gph8.updateGraph = function() {
    gph8.eraseParts()

    directrixDistance = viewX.linearValue(1, 2, 0, -1, gph8.slider.value)

    theParabola = parabolaPoints([0, 1], [-1, directrixDistance], [1, directrixDistance], -4, 4, 100)
    thePoints = theParabola.points

    lineOptions = { x1: theParabola.latusRectumPointLeft[0], y1: theParabola.latusRectumPointLeft[1], x2: theParabola.latusRectumPointRight[0], y2: theParabola.latusRectumPointRight[1]}; 
    viewX.updateLine("parabola-circle-compare-graph", "parabola-circle-compare-latusRectum", lineOptions);

    lineOptions = { x1: theParabola.latusRectumPointRight[0], y1: theParabola.latusRectumPointRight[1], x2: theParabola.focus[0], y2: theParabola.focus[1]}; 
    viewX.updateLine("parabola-circle-compare-graph", "parabola-circle-compare-radius", lineOptions);

    circleOptions = {
        x: theParabola.focus[0],
        y: theParabola.focus[1],
        radius: 2*theParabola.a,
        circlecolor: 'hsla(80, 100%, 50%, 0)',
        stroke: "hsla(190, 0%, 60%, 0.5)",
        strokewidth: 0.5,
        strokedasharray: "7, 7",
    };
    viewX.addCircle("parabola-circle-compare-graph", "parabola-circle-compare-circle-dotted", circleOptions);

    // viewX.makeArc = function(gphname, ringname, arcradius, arccenter, arcthickness, arccolor, startanglepercent,endanglepercent, resolution)

    viewX.makeArc("parabola-circle-compare-graph", "parabola-circle-compare-circle-arc", gph8.slider.value, theParabola.focus, 0.9, "var(--lightPink)", 0.5, 1, 100)
    
    var pathOptions = {
        points: thePoints,
        strokewidth: 0.3,
        strokedasharray: "1, 1",
        pathcolor: "hsla(190, 0%, 60%, 0.5)",
        pathfillcolor: "none"
    };
    viewX.addPath("parabola-circle-compare-graph", "parabola-circle-compare-parabola-dotted", pathOptions);
    
    theParabolicArc = parabolaPoints([0, 1], [-1, directrixDistance], [1, directrixDistance], -1, 1, 50)
    theParabolicArcPoints = theParabolicArc.points

    var pathOptions = {
        points: theParabolicArcPoints,
        strokewidth: 0.9,
        pathcolor: "var(--lightPurple)",
        pathfillcolor: "none"
    };
    viewX.addPath("parabola-circle-compare-graph", "parabola-circle-compare-parabola-arc", pathOptions);
}

// graph 9 : the parabola points

gph9 = {}
gph9.setUpParabolicPointsDescription = function(focusPoint, directrixPoint1, directrixPoint2) {
    gph9.graphH = document.getElementById('parabola-points-description-graphHolder')
    defaultGraphOptions["xmax"] = upcApp.parabolicCircleGraph["xmax"]
    defaultGraphOptions["ymax"] = upcApp.parabolicCircleGraph["ymax"]
    defaultGraphOptions["xmin"] = upcApp.parabolicCircleGraph["xmin"]
    defaultGraphOptions["ymin"] = upcApp.parabolicCircleGraph["ymin"]
    
    // if (window.innerWidth >= 1000) {
    //     defaultGraphOptions["ymajorgridlinesvisibility"] = "yes"
    //     defaultGraphOptions["xmajorgridlinesvisibility"] = "yes"
    // }

    // defaultGraphOptions["scrollZoom"] = 'yes'
    // defaultGraphOptions["draggability"] = 'yes'


    viewX.addGraph(gph9.graphH, "parabola-points-description-graph", defaultGraphOptions)

    defaultGraphOptions["ymajorgridlinesvisibility"] = "no"
    defaultGraphOptions["xmajorgridlinesvisibility"] = "no"

    gph9.theParabola = parabolaPoints(focusPoint, directrixPoint1, directrixPoint2, -4, 4, 100)
    gph9.thePoints = gph9.theParabola.points


    lineOptions = { x1: gph9.theParabola.focus[0], y1: gph9.theParabola.focus[1], x2: gph9.theParabola.directrixPoint2[0], y2: gph9.theParabola.directrixPoint2[1], strokewidth: 0.6, linecolor: "var(--lightPink)"}; 
    viewX.addLine("parabola-points-description-graph", "parabola-points-description-distanceFP", lineOptions);

    lineOptions = { x1: gph9.theParabola.focus[0], y1: gph9.theParabola.focus[1], x2: gph9.theParabola.directrixPoint2[0], y2: gph9.theParabola.directrixPoint2[1], strokewidth: 0.6, linecolor: "var(--lightPink)"}; 
    viewX.addLine("parabola-points-description-graph", "parabola-points-description-distancePD", lineOptions);

    // textOptions = {x:  (gph9.theParabola.directrixPoint1[0] + gph9.theParabola.directrixPoint2[0])/2 + upcApp.parabolicCircleGraph["point-label-gap"]*2.1, y:  (gph9.theParabola.directrixPoint1[1] + gph9.theParabola.directrixPoint2[1])/2 - upcApp.parabolicCircleGraph["point-label-gap"]*2.1, text: "Distance to Focus",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.5, fontFamily: "Nunito",   textcolor: "var(--lightPink)"};
    // viewX.addText("parabola-points-description-graph", "parabola-points-description-FP-label", textOptions);

    // textOptions = {x:  (gph9.theParabola.directrixPoint1[0] + gph9.theParabola.directrixPoint2[0])/2 + upcApp.parabolicCircleGraph["point-label-gap"]*2.1, y:  (gph9.theParabola.directrixPoint1[1] + gph9.theParabola.directrixPoint2[1])/2 - upcApp.parabolicCircleGraph["point-label-gap"]*2.1, text: "Distance to Line",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.5, fontFamily: "Nunito",   textcolor: "var(--lightPink)"};
    // viewX.addText("parabola-points-description-graph", "parabola-points-description-PD-label", textOptions);

    lineOptions = { x1: gph9.theParabola.directrixPoint1[0], y1: gph9.theParabola.directrixPoint1[1], x2: gph9.theParabola.directrixPoint2[0], y2: gph9.theParabola.directrixPoint2[1], strokewidth: 3, linecolor: "var(--lightGreen)", strokedasharray: "7, 7"}; 
    viewX.addLine("parabola-points-description-graph", "parabola-points-description-directrix", lineOptions);

    textOptions = {x:  (gph9.theParabola.directrixPoint1[0] + gph9.theParabola.directrixPoint2[0])/2 + upcApp.parabolicCircleGraph["point-label-gap"]*2.1, y:  (gph9.theParabola.directrixPoint1[1] + gph9.theParabola.directrixPoint2[1])/2 - upcApp.parabolicCircleGraph["point-label-gap"]*2.1, text: "L",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightGreen)"};
    viewX.addText("parabola-points-description-graph", "parabola-points-description-directrix-label", textOptions);

    pointOptions = { x:  gph9.theParabola.focus[0], y:  gph9.theParabola.focus[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--brightYellow)'};
    viewX.addPoint("parabola-points-description-graph", "parabola-points-description-focus", pointOptions);

    textOptions = {x:  gph9.theParabola.focus[0] + upcApp.parabolicCircleGraph["point-label-gap"], y:  gph9.theParabola.focus[1] - upcApp.parabolicCircleGraph["point-label-gap"], text: "F",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--brightYellow)"};
    viewX.addText("parabola-points-description-graph", "parabola-points-description-focus-label", textOptions);

    
    var pathOptions = {
        points: gph9.thePoints,
        strokewidth: 0.3,
        pathcolor: "var(--lightPurple)",
        pathfillcolor: "none"
    };
    pathElementDetails = viewX.addPath("parabola-points-description-graph", "parabola-points-description-parabola", pathOptions);
    pathElementDetails[0].style.opacity = 0
    

    gph9.theParabolaRandom = parabolaPoints(focusPoint, directrixPoint1, directrixPoint2, -2, 2, 600)
    gph9.thePointsRandom = gph9.theParabolaRandom.points.slice()
    gph9.thePointsRandom = viewX.shuffle(gph9.thePointsRandom)

    gph9.thePointsRandom.unshift(gph9.theParabolaRandom.latusRectumPointRight)
    gph9.thePointsRandom.unshift(gph9.theParabolaRandom.latusRectumPointLeft)
    gph9.thePointsRandom.unshift(gph9.theParabolaRandom.vertex)

    gph9.slider.value = 2;
    gph9.showPoints()
    gph9.sliderLabel.innerHTML = gph9.slider.value + " point" + (gph9.slider.value == 1 ? "" : "s")


}

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(10, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPurple)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPurple)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "parabola-points-description-Slider");

gph9.slider = document.getElementById("parabola-points-description-Slider");
gph9.sliderLabel = document.getElementById("parabola-points-description-SliderLabel");
gph9.sliderInfo = document.getElementById("parabola-points-description-SliderInfo");

gph9.slider.value = 1
gph9.sliderLabel.innerHTML = gph9.slider.value + "point" + (gph9.slider.value == 1 ? "" : "s")

gph9.erasePoints = function() {
    for (i = 0; i < 100; i++) {
        viewX.removePoint("parabola-points-description-graph", "parabola-points-description-point-" + i)
    }
}

gph9.showPoints = function() {
    gph9.erasePoints()
    
    var pathOptions = {
        points: gph9.thePoints
    };
    pathElementDetails = viewX.updatePath("parabola-points-description-graph", "parabola-points-description-parabola", pathOptions);
    if (gph9.slider.value > 20) {
        pathElementDetails[0].style.opacity = 0.3*(gph9.slider.value - 20)/100
    }
    else {
        pathElementDetails[0].style.opacity = 0
    }

    for (i = 0; i < gph9.slider.value; i++) {
        pointOptions = { x:  gph9.thePointsRandom[i][0], y:  gph9.thePointsRandom[i][1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)'};
        thePointElement = viewX.addPoint("parabola-points-description-graph", "parabola-points-description-point-" + i, pointOptions);

        if (i == gph9.slider.value - 1) {
            thePointElement[0].style.opacity = 1

            lineOptions = { x1: gph9.theParabola.focus[0], y1: gph9.theParabola.focus[1], x2: gph9.thePointsRandom[i][0], y2: gph9.thePointsRandom[i][1], strokewidth: 0.6, linecolor: "var(--lightPink)"}; 
            viewX.updateLine("parabola-points-description-graph", "parabola-points-description-distanceFP", lineOptions);

            perpendicularPoint = closestPointOnLineGivenByPoints(gph9.theParabolaRandom.directrixPoint1, gph9.theParabolaRandom.directrixPoint2, gph9.thePointsRandom[i]) 

            lineOptions = { x1: gph9.thePointsRandom[i][0], y1: gph9.thePointsRandom[i][1], x2: perpendicularPoint[0], y2: perpendicularPoint[1], strokewidth: 0.6, linecolor: "var(--lightPink)"}; 
            viewX.updateLine("parabola-points-description-graph", "parabola-points-description-distancePD", lineOptions);

            // textOptions = {x:  (gph9.thePointsRandom[i][0] + perpendicularPoint[0])/2 + upcApp.parabolicCircleGraph["point-label-gap"]*1, y:  (gph9.thePointsRandom[i][1] + perpendicularPoint[1])/2 - upcApp.parabolicCircleGraph["point-label-gap"]*1};
            // viewX.updateText("parabola-points-description-graph", "parabola-points-description-PD-label", textOptions);

            // textOptions = {x:  (gph9.thePointsRandom[i][0] + gph9.theParabolaRandom.focus[0])/2 + upcApp.parabolicCircleGraph["point-label-gap"]*1, y:  (gph9.thePointsRandom[i][1] + gph9.theParabolaRandom.focus[1])/2 - upcApp.parabolicCircleGraph["point-label-gap"]*1};
            // viewX.updateText("parabola-points-description-graph", "parabola-points-description-FP-label", textOptions);

        }
        else {
            thePointElement[0].style.opacity = 0.2
        }
    }
}


function pauseAutoplaygph9() {
    clearInterval(gph9.interval);
}

gph9.slider.addEventListener('mouseover', pauseAutoplaygph9);
gph9.slider.addEventListener('touchstart', pauseAutoplaygph9);

gph9.nextValue = function() {
    gph9.slider.value = parseInt(gph9.slider.value) + 1
    if (gph9.slider.value > 15) {
        gph9.slider.value = 1
    }
    gph9.showPoints()
    gph9.sliderLabel.innerHTML = gph9.slider.value + " point" + (gph9.slider.value == 1 ? "" : "s")
}

gph9.slider.addEventListener('input', function() {
    gph9.showPoints()
    gph9.sliderLabel.innerHTML = gph9.slider.value + " point" + (gph9.slider.value == 1 ? "" : "s")
});



// graph 10 : the parabola dimensions

gph10 = {}
gph10.setUpParabolicDescriptionGraph = function() {
    gph10.graphH = document.getElementById('parabola-important-dimensions-graphHolder')
    defaultGraphOptions["xmax"] = upcApp.parabolicImportantDimensionsGraph["xmax"]
    defaultGraphOptions["ymax"] = upcApp.parabolicImportantDimensionsGraph["ymax"]
    defaultGraphOptions["xmin"] = upcApp.parabolicImportantDimensionsGraph["xmin"]
    defaultGraphOptions["ymin"] = upcApp.parabolicImportantDimensionsGraph["ymin"]
    
    // if (window.innerWidth >= 1000) {
    //     defaultGraphOptions["ymajorgridlinesvisibility"] = "yes"
    //     defaultGraphOptions["xmajorgridlinesvisibility"] = "yes"
    // }


    viewX.addGraph(gph10.graphH, "parabola-important-dimensions-graph", defaultGraphOptions)

    defaultGraphOptions["ymajorgridlinesvisibility"] = "no"
    defaultGraphOptions["xmajorgridlinesvisibility"] = "no"

    gph10.theParabola = parabolaPoints([0, 1], [-3, -1], [3, -1], -4, 4, 100)
    gph10.thePoints = gph10.theParabola.points

    
    lineOptions = { x1: -3, y1: 0, x2: 3, y2: 0, strokewidth: 0.6, linecolor: "hsla(0, 0%, 40%, 0.7)"}; 
    viewX.addLine("parabola-important-dimensions-graph", "parabola-important-dimensions-theXAxis", lineOptions);

    lineOptions = { x1: 0, y1: 5, x2: 0, y2: -3, strokewidth: 0.6, linecolor: "hsla(0, 0%, 40%, 0.7)"}; 
    viewX.addLine("parabola-important-dimensions-graph", "parabola-important-dimensions-theYAxis", lineOptions);


    var pathOptions = {
        points: gph10.thePoints,
        strokewidth: 0.3,
        pathcolor: "var(--lightPurple)",
        pathfillcolor: "none"
    };
    pathElementDetails = viewX.addPath("parabola-important-dimensions-graph", "parabola-important-dimensions-parabola", pathOptions);

    var arrowOptions = {
        from: viewX.addVec(gph10.theParabola.focus, [0, -0.1]),
        to: viewX.addVec(gph10.theParabola.vertex, [0, 0.1]),
        strokewidth: 0.4,
        arrowcolor: "var(--lightPink)"
    };
    arrow = viewX.addArrow("parabola-important-dimensions-graph", "parabola-important-dimensions-FC-arrow-1", arrowOptions);

    pointOnLineL = viewX.scalarMultiplyVec(0.5, viewX.addVec(gph10.theParabola.directrixPoint2, gph10.theParabola.directrixPoint1))
    var arrowOptions = {
        to: viewX.addVec(gph10.theParabola.focus, [0, -0.1]),
        from: viewX.addVec(gph10.theParabola.vertex, [0, 0.1]),
        strokewidth: 0.4,
        arrowcolor: "var(--lightPink)"
    };
    arrow = viewX.addArrow("parabola-important-dimensions-graph", "parabola-important-dimensions-FC-arrow-2", arrowOptions);

    midFC = viewX.scalarMultiplyVec(0.5, viewX.addVec(gph10.theParabola.focus, gph10.theParabola.vertex))

    textOptions = {x:  midFC[0] - upcApp.parabolicCircleGraph["point-label-gap"], y:  midFC[1], text: "a",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightPink)"};
    viewX.addText("parabola-important-dimensions-graph", "parabola-important-dimensions-FC-label", textOptions);

    var arrowOptions = {
        from: pointOnLineL,
        to: viewX.addVec(gph10.theParabola.vertex, [0, -0.1]),
        strokewidth: 0.4,
        arrowcolor: "var(--lightPink)"
    };
    arrow = viewX.addArrow("parabola-important-dimensions-graph", "parabola-important-dimensions-CL-arrow-1", arrowOptions);

    var arrowOptions = {
        to: pointOnLineL,
        from: viewX.addVec(gph10.theParabola.vertex, [0, -0.1]),
        strokewidth: 0.4,
        arrowcolor: "var(--lightPink)"
    };
    arrow = viewX.addArrow("parabola-important-dimensions-graph", "parabola-important-dimensions-CL-arrow-2", arrowOptions);

    midCL = viewX.scalarMultiplyVec(0.5, viewX.addVec(gph10.theParabola.vertex, pointOnLineL))
    
    textOptions = {x:  midCL[0] - upcApp.parabolicCircleGraph["point-label-gap"], y:  midCL[1], text: "a",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightPink)"};
    viewX.addText("parabola-important-dimensions-graph", "parabola-important-dimensions-CL-label", textOptions);

    // lineOptions = { x1: gph10.theParabola.vertex[0], y1: gph10.theParabola.vertex[1], x2: (gph10.theParabola.directrixPoint2[0] + gph10.theParabola.directrixPoint1[0])/2, y2: (gph10.theParabola.directrixPoint2[1] + gph10.theParabola.directrixPoint1[1])/2, strokewidth: 2, linecolor: "var(--lightPink)", strokedasharray: "3, 3"}; 
    // viewX.addLine("parabola-important-dimensions-graph", "parabola-important-dimensions-CL", lineOptions);

    pointOptions = { x:  gph10.theParabola.vertex[0], y:  gph10.theParabola.vertex[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)'};
    viewX.addPoint("parabola-important-dimensions-graph", "parabola-important-dimensions-vertex", pointOptions);

    textOptions = {x: gph10.theParabola.vertex[0] + upcApp.parabolicCircleGraph["point-label-gap"], y: gph10.theParabola.vertex[1] - upcApp.parabolicCircleGraph["point-label-gap"], text: "C",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightPurple)"};
    viewX.addText("parabola-important-dimensions-graph", "parabola-important-dimensions-vertex-label", textOptions);

    lineOptions = { x1: gph10.theParabola.directrixPoint1[0], y1: gph10.theParabola.directrixPoint1[1], x2: gph10.theParabola.directrixPoint2[0], y2: gph10.theParabola.directrixPoint2[1], strokewidth: 3, linecolor: "var(--lightGreen)", strokedasharray: "7, 7"}; 
    viewX.addLine("parabola-important-dimensions-graph", "parabola-important-dimensions-directrix", lineOptions);

    lineOptions = { x1: gph10.theParabola.latusRectumPointLeft[0] - 2, y1: gph10.theParabola.latusRectumPointLeft[1], x2: gph10.theParabola.latusRectumPointRight[0] + 2, y2: gph10.theParabola.latusRectumPointRight[1], strokewidth: 1.3, linecolor: "var(--lightOrange)", strokedasharray: "5, 5"}; 
    lineE = viewX.addLine("parabola-important-dimensions-graph", "parabola-important-dimensions-lineM", lineOptions);
    lineE[0].style.opacity = 0.5

    positionForLineMLabel = viewX.addVec(gph10.theParabola.latusRectumPointLeft, viewX.scalarMultiplyVec(2, viewX.directionVec(gph10.theParabola.focus, gph10.theParabola.latusRectumPointLeft)))

    textOptions = {x:  positionForLineMLabel[0] + upcApp.parabolicCircleGraph["point-label-gap"]*2.1, y:  positionForLineMLabel[1] - upcApp.parabolicCircleGraph["point-label-gap"]*2.1, text: "line M",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightOrange)"};
    viewX.addText("parabola-important-dimensions-graph", "parabola-important-dimensions-lineM-label", textOptions);

    lineOptions = { x1: gph10.theParabola.latusRectumPointLeft[0], y1: gph10.theParabola.latusRectumPointLeft[1], x2: gph10.theParabola.latusRectumPointRight[0], y2: gph10.theParabola.latusRectumPointRight[1], strokewidth: 3, linecolor: "var(--lightRed)"}; 
    viewX.addLine("parabola-important-dimensions-graph", "parabola-important-dimensions-latusRectum", lineOptions);

    textOptions = {x:  (gph10.theParabola.directrixPoint1[0] + gph10.theParabola.directrixPoint2[0])/2 + upcApp.parabolicCircleGraph["point-label-gap"]*2.1, y:  (gph10.theParabola.directrixPoint1[1] + gph10.theParabola.directrixPoint2[1])/2 - upcApp.parabolicCircleGraph["point-label-gap"]*2.1, text: "L",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightGreen)"};
    viewX.addText("parabola-important-dimensions-graph", "parabola-important-dimensions-directrix-label", textOptions);

    pointOptions = { x:  gph10.theParabola.focus[0], y:  gph10.theParabola.focus[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--brightYellow)'};
    viewX.addPoint("parabola-important-dimensions-graph", "parabola-important-dimensions-focus", pointOptions);

    textOptions = {x:  gph10.theParabola.focus[0] + upcApp.parabolicCircleGraph["point-label-gap"], y:  gph10.theParabola.focus[1] - upcApp.parabolicCircleGraph["point-label-gap"], text: "F",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--brightYellow)"};
    viewX.addText("parabola-important-dimensions-graph", "parabola-important-dimensions-focus-label", textOptions);

    pointOptions = { x:  gph10.theParabola.latusRectumPointLeft[0], y:  gph10.theParabola.latusRectumPointLeft[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)'};
    viewX.addPoint("parabola-important-dimensions-graph", "parabola-important-dimensions-G", pointOptions);

    textOptions = {x:  gph10.theParabola.latusRectumPointLeft[0] - upcApp.parabolicCircleGraph["point-label-gap"], y:  gph10.theParabola.latusRectumPointLeft[1] - upcApp.parabolicCircleGraph["point-label-gap"], text: "G",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightPurple)"};
    viewX.addText("parabola-important-dimensions-graph", "parabola-important-dimensions-G-label", textOptions);

    pointOptions = { x:  gph10.theParabola.latusRectumPointRight[0], y:  gph10.theParabola.latusRectumPointRight[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)'};
    viewX.addPoint("parabola-important-dimensions-graph", "parabola-important-dimensions-H", pointOptions);

    textOptions = {x:  gph10.theParabola.latusRectumPointRight[0] + upcApp.parabolicCircleGraph["point-label-gap"], y:  gph10.theParabola.latusRectumPointRight[1] - upcApp.parabolicCircleGraph["point-label-gap"], text: "H",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightPurple)"};
    viewX.addText("parabola-important-dimensions-graph", "parabola-important-dimensions-H-label", textOptions);

    BPoint = viewX.addVec(gph10.theParabola.latusRectumPointRight, viewX.subtractVec(gph10.theParabola.vertex, gph10.theParabola.focus))

    pointOptions = { x:  BPoint[0], y:  BPoint[1], pointsize: upcApp.graphPointSize*0.5, pointcolor: 'white'};
    viewX.addPoint("parabola-important-dimensions-graph", "parabola-important-dimensions-BPoint", pointOptions);

    textOptions = {x:  BPoint[0] + upcApp.parabolicCircleGraph["point-label-gap"], y:  BPoint[1] - upcApp.parabolicCircleGraph["point-label-gap"], text: "B",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "white"};
    viewX.addText("parabola-important-dimensions-graph", "parabola-important-dimensions-BPoint-label", textOptions);


    sideShiftDirection = viewX.scalarMultiplyVec(gph10.theParabola.a, viewX.directionVec(gph10.theParabola.focus, gph10.theParabola.latusRectumPointRight))

    var arrowOptions = {
        from: viewX.subtractVec(viewX.addVec(gph10.theParabola.latusRectumPointRight, sideShiftDirection), [0, 0.03]),
        to: viewX.addVec(viewX.addVec(BPoint, sideShiftDirection), [0, 0.03]),
        strokewidth: 0.4,
        arrowcolor: "var(--lightPink)"
    };
    arrow = viewX.addArrow("parabola-important-dimensions-graph", "parabola-important-dimensions-HB-arrow-1", arrowOptions);

    var arrowOptions = {
        to: viewX.subtractVec(viewX.addVec(gph10.theParabola.latusRectumPointRight, sideShiftDirection), [0, 0.03]),
        from: viewX.addVec(viewX.addVec(BPoint, sideShiftDirection), [0, 0.03]),
        strokewidth: 0.4,
        arrowcolor: "var(--lightPink)"
    };

    arrow = viewX.addArrow("parabola-important-dimensions-graph", "parabola-important-dimensions-HB-arrow-2", arrowOptions);

    midHB = viewX.scalarMultiplyVec(0.5, viewX.addVec(gph10.theParabola.latusRectumPointRight, BPoint))

    midHBShifted = viewX.addVec(midHB, sideShiftDirection)
    textOptions = {x:  midHBShifted[0] + upcApp.parabolicCircleGraph["point-label-gap"], y:  midHBShifted[1], text: "a",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightPink)"};
    viewX.addText("parabola-important-dimensions-graph", "parabola-important-dimensions-HB-label", textOptions);



    LPoint = viewX.addVec(gph10.theParabola.latusRectumPointRight, viewX.subtractVec(pointOnLineL, gph10.theParabola.focus))


    sideShiftDirectionMore = viewX.scalarMultiplyVec(gph10.theParabola.a/2, viewX.directionVec(gph10.theParabola.focus, gph10.theParabola.latusRectumPointRight))

    var arrowOptions = {
        from: viewX.subtractVec(viewX.addVec(gph10.theParabola.latusRectumPointRight, sideShiftDirectionMore), [0, 0.03]),
        to: viewX.addVec(viewX.addVec(LPoint, sideShiftDirectionMore), [0, 0.03]),
        strokewidth: 0.4,
        arrowcolor: "var(--lightBlue)"
    };
    arrow = viewX.addArrow("parabola-important-dimensions-graph", "parabola-important-dimensions-HL-arrow-1", arrowOptions);

    var arrowOptions = {
        to: viewX.subtractVec(viewX.addVec(gph10.theParabola.latusRectumPointRight, sideShiftDirectionMore), [0, 0.03]),
        from: viewX.addVec(viewX.addVec(LPoint, sideShiftDirectionMore), [0, 0.03]),
        strokewidth: 0.4,
        arrowcolor: "var(--lightBlue)"
    };

    arrow = viewX.addArrow("parabola-important-dimensions-graph", "parabola-important-dimensions-HL-arrow-2", arrowOptions);

    midHL = viewX.scalarMultiplyVec(0.5, viewX.addVec(gph10.theParabola.latusRectumPointRight, LPoint))

    midHLShifted = viewX.addVec(midHL, sideShiftDirectionMore)
    textOptions = {x:  midHLShifted[0] + upcApp.parabolicCircleGraph["point-label-gap"], y:  midHLShifted[1], text: "2a",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightBlue)"};
    viewX.addText("parabola-important-dimensions-graph", "parabola-important-dimensions-HL-label", textOptions);


    var arrowOptions = {
        from: viewX.addVec(gph10.theParabola.latusRectumPointRight, [0, 0.3]),
        to: viewX.addVec(gph10.theParabola.focus, [0, 0.3]),
        strokewidth: 0.4,
        arrowcolor: "var(--lightBlue)"
    };
    arrow = viewX.addArrow("parabola-important-dimensions-graph", "parabola-important-dimensions-HF-arrow-1", arrowOptions);

    var arrowOptions = {
        to: viewX.addVec(gph10.theParabola.latusRectumPointRight, [0, 0.3]),
        from: viewX.addVec(gph10.theParabola.focus, [0, 0.3]),
        strokewidth: 0.4,
        arrowcolor: "var(--lightBlue)"
    };

    arrow = viewX.addArrow("parabola-important-dimensions-graph", "parabola-important-dimensions-HF-arrow-2", arrowOptions);

    midHF = viewX.scalarMultiplyVec(0.5, viewX.addVec(gph10.theParabola.latusRectumPointRight, gph10.theParabola.focus))

    midHFShifted = viewX.addVec(midHF, [0, 0.3])
    textOptions = {x:  midHFShifted[0], y:  midHFShifted[1] +  upcApp.parabolicCircleGraph["point-label-gap"], text: "2a",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightBlue)"};
    viewX.addText("parabola-important-dimensions-graph", "parabola-important-dimensions-HF-label", textOptions);


    // gph10.slider.value = 2;
    viewX.addAnimation('parabola-important-dimensions-animation', gph10.sliderAnimationOptions)


    // viewX.playAnimation('parabola-important-dimensions-animation', 0, 32, 20)


    

    // gph10.sliderLabel.innerHTML = gph10.slider.value + " point" + (gph10.slider.value == 1 ? "" : "s")


}

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(10, 0%, 20%, 0.7)",
    trackFillColor: "white",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "white",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "parabola-important-dimensions-Slider");

gph10.slider = document.getElementById("parabola-important-dimensions-Slider");
gph10.sliderLabel = document.getElementById("parabola-important-dimensions-SliderInfo");

gph10.sliderAnimationOptions = {}

gph10.animationGenerator = function() {
    gph10.sliderAnimationOptions.keyframes = {
        "0" : {
            "ob0" : {
                'graph': 'parabola-important-dimensions-graph',
                'object': 'parabola-important-dimensions-focus', 
                'options': { opacity: 0}
            }
        }
    }

    gph10.messageOfSteps = [
        'Shall we begin? :)',
        'The focus of the parabola is the <span class="p-brightYellow"> point F</span>.',
        'The focus of the parabola is the <span class="p-brightYellow"> point F</span>.',
        'The <span class="p-lightGreen">fixed line</span> is the directrix of the parabola..',
        'The <span class="p-lightGreen">fixed line</span> is the directrix of the parabola. Here it is called the <span class="p-lightGreen"> line L</span>.',
        'The vertex of the parabola is the <span class="p-lightPurple"> point C</span>.',
        'The vertex of the parabola is the <span class="p-lightPurple"> point C</span>.',
        '<span class="p-lightPink">FC</span> is the shortest distance from the parabola to <span class="p-brightYellow"> focus F</span>.',
        'Let\'s call it <span class="p-lightPink">a</span>.',
        '<span class="p-lightPink">CL</span> is at the same distance "a" from the vertex to <span class="p-lightGreen"> line L</span>.',
        'So, <span class="p-lightPink">CL</span> is "a" too.',
        'There is one point so far, but we can get more points like that forming the  <span class="p-lightPurple">parabola.</span>',
        'Let\'s draw <span class="p-lightOrange"> line M</span>.',
        'Let\'s draw <span class="p-lightOrange"> line M</span>.',
        'The line intersects the parabola at points <span class="p-lightPurple">G </span>..',
        'The line intersects the parabola at points <span class="p-lightPurple">G </span>...',
        'The line intersects the parabola at points <span class="p-lightPurple">G </span>and <span class="p-lightPurple">H</span>.',
        'The line intersects the parabola at points <span class="p-lightPurple">G </span>and <span class="p-lightPurple">H</span>.',
        'By our understanding of the parabola, point <span class="p-lightPurple">H </span> must be at a distance of <span class="p-lightBlue">2a</span>.',
        'By our understanding of the parabola, point <span class="p-lightPurple">H </span> must be at a distance of <span class="p-lightBlue">2a</span>.',
        'Consider point B.',
        'Consider point B.',
        'HB must be at a distance of <span class="p-lightPink">a</span>.',
        'HB must be at a distance of <span class="p-lightPink">a</span>.',
        'HF must be at a distance of <span class="p-lightBlue">2a</span>.',
        'HF must be at a distance of <span class="p-lightBlue">2a</span>.',
        'So, <span class="p-lightRed">Latus Rectum</span> of the parabola spans 4a which is <span class="p-lightBlue">2a</span> + <span class="p-lightBlue">2a</span>',
        'So, <span class="p-lightRed">Latus Rectum</span> of the parabola spans 4a which is <span class="p-lightBlue">2a</span> + <span class="p-lightBlue">2a</span>'
    ]

    gph10.graphObjects = [
        'parabola-important-dimensions-focus', 'parabola-important-dimensions-focus-label', 'parabola-important-dimensions-directrix', 'parabola-important-dimensions-directrix-label', 'parabola-important-dimensions-vertex', 'parabola-important-dimensions-vertex-label','parabola-important-dimensions-FC-arrow-1','parabola-important-dimensions-FC-label','parabola-important-dimensions-CL-arrow-1','parabola-important-dimensions-CL-label','parabola-important-dimensions-parabola','parabola-important-dimensions-lineM','parabola-important-dimensions-lineM-label','parabola-important-dimensions-G','parabola-important-dimensions-G-label','parabola-important-dimensions-H','parabola-important-dimensions-H-label','parabola-important-dimensions-HL-arrow-1','parabola-important-dimensions-HL-label','parabola-important-dimensions-BPoint','parabola-important-dimensions-BPoint-label','parabola-important-dimensions-HB-arrow-1','parabola-important-dimensions-HB-label','parabola-important-dimensions-HF-arrow-1','parabola-important-dimensions-HF-label','parabola-important-dimensions-latusRectum'
    ]

    for(i = 1; i < gph10.graphObjects.length; i++) {
        gph10.sliderAnimationOptions.keyframes[i] = {}
        gph10.sliderAnimationOptions.keyframes[i]["ob0"] = {
            'graph': 'parabola-important-dimensions-graph',
            'object': gph10.graphObjects[i - 1], 
            'options': { opacity: 1}
        }

        gph10.sliderAnimationOptions.keyframes[i]["ob1"] = {
            'graph': 'parabola-important-dimensions-graph',
            'object': gph10.graphObjects[i], 
            'options': { opacity: 0}
        }
    }

    gph10.sliderAnimationOptions.keyframes[gph10.graphObjects.length] = {}
    gph10.sliderAnimationOptions.keyframes[gph10.graphObjects.length]["ob0"] = {
        'graph': 'parabola-important-dimensions-graph',
        'object': gph10.graphObjects[gph10.graphObjects.length - 1], 
        'options': { opacity: 1}
    }
    gph10.sliderAnimationOptions.keyframes[6]["ob2"] = {
        'graph': 'parabola-important-dimensions-graph',
        'object': 'parabola-important-dimensions-FC-arrow-2', 
        'options': { opacity: 0}
    }

    gph10.sliderAnimationOptions.keyframes[7]["ob2"] = {
        'graph': 'parabola-important-dimensions-graph',
        'object': 'parabola-important-dimensions-FC-arrow-2', 
        'options': { opacity: 1}
    }

    gph10.sliderAnimationOptions.keyframes[8]["ob2"] = {
        'graph': 'parabola-important-dimensions-graph',
        'object': 'parabola-important-dimensions-CL-arrow-2', 
        'options': { opacity: 0}
    }

    gph10.sliderAnimationOptions.keyframes[9]["ob2"] = {
        'graph': 'parabola-important-dimensions-graph',
        'object': 'parabola-important-dimensions-CL-arrow-2', 
        'options': { opacity: 1}
    }

    gph10.sliderAnimationOptions.keyframes[17]["ob2"] = {
        'graph': 'parabola-important-dimensions-graph',
        'object': 'parabola-important-dimensions-HL-arrow-2', 
        'options': { opacity: 0}
    }

    gph10.sliderAnimationOptions.keyframes[18]["ob2"] = {
        'graph': 'parabola-important-dimensions-graph',
        'object': 'parabola-important-dimensions-HL-arrow-2', 
        'options': { opacity: 1}
    }

    gph10.sliderAnimationOptions.keyframes[21]["ob2"] = {
        'graph': 'parabola-important-dimensions-graph',
        'object': 'parabola-important-dimensions-HB-arrow-2', 
        'options': { opacity: 0}
    }

    gph10.sliderAnimationOptions.keyframes[22]["ob2"] = {
        'graph': 'parabola-important-dimensions-graph',
        'object': 'parabola-important-dimensions-HB-arrow-2', 
        'options': { opacity: 1}
    }

    gph10.sliderAnimationOptions.keyframes[23]["ob2"] = {
        'graph': 'parabola-important-dimensions-graph',
        'object': 'parabola-important-dimensions-HF-arrow-2', 
        'options': { opacity: 0}
    }

    gph10.sliderAnimationOptions.keyframes[24]["ob2"] = {
        'graph': 'parabola-important-dimensions-graph',
        'object': 'parabola-important-dimensions-HF-arrow-2', 
        'options': { opacity: 1}
    }


    


    // parabola-important-dimensions-FC-arrow-2
    // parabola-important-dimensions-FC-arrow-1
    // parabola-important-dimensions-FC-label

    gph10.slider.max = gph10.graphObjects.length + 1
}

gph10.animationGenerator()


gph10.slider.addEventListener('input', function() {
    gph10.sliderLabel.innerHTML = gph10.messageOfSteps[parseInt(gph10.slider.value)]
    viewX.playAnimationToFrame('parabola-important-dimensions-animation', parseInt(gph10.slider.value), 1)
});

function pauseAutoplaygph10() {
    clearInterval(gph10.interval);
}

gph10.slider.addEventListener('mouseover', pauseAutoplaygph10);
gph10.slider.addEventListener('touchstart', pauseAutoplaygph10);

gph10.nextValue = function() {
    gph10.slider.value = parseInt(gph10.slider.value) + 1
    if (gph10.slider.value == gph10.slider.max) {
        gph10.slider.value = 1
    }
    gph10.sliderLabel.innerHTML = gph10.messageOfSteps[parseInt(gph10.slider.value)]
    viewX.playAnimationToFrame('parabola-important-dimensions-animation', parseInt(gph10.slider.value), 2)
}




// graph 11 : the parabola increasing slope

gph11 = {}
gph11.setUpParabolicIncreasingSlope = function() {
    gph11.graphH = document.getElementById('parabola-increasing-slope-graphHolder')
    defaultGraphOptions["xmax"] = upcApp.parabolicCircleGraph["xmax"]
    defaultGraphOptions["ymax"] = upcApp.parabolicCircleGraph["ymax"]/2
    defaultGraphOptions["xmin"] = upcApp.parabolicCircleGraph["xmin"]/12
    defaultGraphOptions["ymin"] = upcApp.parabolicCircleGraph["ymin"]/5
    
    // if (window.innerWidth >= 1000) {
    //     defaultGraphOptions["ymajorgridlinesvisibility"] = "yes"
    //     defaultGraphOptions["xmajorgridlinesvisibility"] = "yes"
    // }


    viewX.addGraph(gph11.graphH, "parabola-increasing-slope-graph", defaultGraphOptions)

    defaultGraphOptions["ymajorgridlinesvisibility"] = "no"
    defaultGraphOptions["xmajorgridlinesvisibility"] = "no"

    gph11.theParabola = parabolaPoints([0, 0.25], [-3, -0.25], [3, -0.25], 0, 4, 100)
    gph11.thePoints = gph11.theParabola.points

    
    lineOptions = { x1: defaultGraphOptions["xmin"], y1: 0, x2: defaultGraphOptions["xmax"], y2: 0, strokewidth: 0.6, linecolor: "hsla(0, 0%, 40%, 0.7)"}; 
    viewX.addLine("parabola-increasing-slope-graph", "parabola-increasing-slope-theXAxis", lineOptions);

    lineOptions = { x1: 0, y1: defaultGraphOptions["ymax"], x2: 0, y2: defaultGraphOptions["ymin"], strokewidth: 0.6, linecolor: "hsla(0, 0%, 40%, 0.7)"}; 
    viewX.addLine("parabola-increasing-slope-graph", "parabola-increasing-slope-theYAxis", lineOptions);


    var pathOptions = {
        points: gph11.thePoints,
        strokewidth: 0.3,
        pathcolor: "var(--lightPurple)",
        pathfillcolor: "none",
        opacity: 0.3
    };
    pathElementDetails = viewX.addPath("parabola-increasing-slope-graph", "parabola-increasing-slope-parabola", pathOptions);

    pointOptions = { x:  gph11.theParabola.vertex[0], y:  gph11.theParabola.vertex[1], pointsize: upcApp.graphPointSize*0.7, pointcolor: 'var(--lightPurple)', opacity: 0.5};
    viewX.addPoint("parabola-increasing-slope-graph", "parabola-increasing-slope-vertex", pointOptions);


    textOptions = {x: gph11.theParabola.vertex[0] + upcApp.parabolaIncreasingSlopeGraph["point-label-gap"]/2, y: gph11.theParabola.vertex[1] - upcApp.parabolaIncreasingSlopeGraph["point-label-gap"]/2, text: "C",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.6, fontFamily: "Nunito",   textcolor: "var(--lightPurple)", opacity: 0.5};
    viewX.addText("parabola-increasing-slope-graph", "parabola-increasing-slope-vertex-label", textOptions);

    gph11.xValue = gph11.slider.value
    gph11.pointDetails= getParabolicPointData([0, 0.25], [-3, -0.25], [3, -0.25], 2*gph11.xValue)
    gph11.yValue = gph11.pointDetails.point[1]
    gph11.slope = gph11.pointDetails.slope
    gph11.slopeAngle = Math.atan(gph11.slope) * (180 / Math.PI)
    gph11.point = [gph11.xValue, gph11.yValue]

    textOptions = {x: gph11.xValue + upcApp.parabolaIncreasingSlopeGraph["point-label-gap"], y: 0 - upcApp.parabolaIncreasingSlopeGraph["point-label-gap"], text: "x = " + gph11.xValue,  textAlign: "left",  fontSize: upcApp.graphFontSizeLarge*0.62, fontFamily: "Nunito",   textcolor: "var(--lightBlue)", opacity: 0.6};
    viewX.addText("parabola-increasing-slope-graph", "parabola-increasing-slope-xvalue-text", textOptions);

    
    lineOptions = { x1: gph11.xValue, y1: defaultGraphOptions["ymax"], x2: gph11.xValue, y2: defaultGraphOptions["ymin"], strokewidth: 1.2, linecolor: "var(--lightBlue)", strokedasharray: "3, 5", opacity: 0.4}; 
    viewX.addLine("parabola-increasing-slope-graph", "parabola-increasing-slope-xline", lineOptions);

    pointOptions = { x: gph11.xValue, y: gph11.yValue, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)'};
    viewX.addPoint("parabola-increasing-slope-graph", "parabola-increasing-slope-pointOnParabola", pointOptions);

    textOptions = {x: gph11.xValue + upcApp.parabolaIncreasingSlopeGraph["point-label-gap"], y: gph11.yValue - upcApp.parabolaIncreasingSlopeGraph["point-label-gap"], text: "(" + gph11.xValue + ", 2.345)",  textAlign: "left",  fontSize: upcApp.graphFontSizeLarge*0.6, fontFamily: "Nunito",   textcolor: "var(--writingGrey)"};
    viewX.addText("parabola-increasing-slope-graph", "parabola-increasing-slope-pointOnParabola-description", textOptions);

    gph11.deltaForTangent = viewX.rotatedVec([3, 0], gph11.slopeAngle)
    xyTangentEnd = viewX.addVec(gph11.point, gph11.deltaForTangent)
    xyTangentStart = viewX.subtractVec(gph11.point, gph11.deltaForTangent)
    

    lineOptions = { x1: xyTangentEnd[0], y1: xyTangentEnd[1], x2: xyTangentStart[0], y2: xyTangentStart[1], strokewidth: 1, linecolor: "hsla(0, 0%, 90%, 1)", strokedasharray: "4, 4"}; 
    viewX.addLine("parabola-increasing-slope-graph", "parabola-increasing-tangent", lineOptions);

    gph11.arrowDelta = viewX.rotatedVec([0.3, 0], gph11.slopeAngle)
    xyArrowEnd = viewX.addVec(gph11.point, gph11.arrowDelta)
    xyArrowStart = viewX.subtractVec(gph11.point, gph11.arrowDelta)
    
    var arrowOptions = {
        from: xyArrowStart,
        to:xyArrowEnd,
        strokewidth: 0.4,
        arrowcolor: "white"
    };
    arrow = viewX.addArrow("parabola-increasing-slope-graph", "parabola-increasing-slope-steep-arrow", arrowOptions);


    
    pointOptions = { x:  gph11.theParabola.latusRectumPointRight[0], y:  gph11.theParabola.latusRectumPointRight[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)', opacity: 0.5};
    viewX.addPoint("parabola-increasing-slope-graph", "parabola-increasing-slope-H", pointOptions);

    textOptions = {x:  gph11.theParabola.latusRectumPointRight[0] + upcApp.parabolaIncreasingSlopeGraph["point-label-gap"]/2, y:  gph11.theParabola.latusRectumPointRight[1] - upcApp.parabolaIncreasingSlopeGraph["point-label-gap"]/2, text: "H",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.6, fontFamily: "Nunito",   textcolor: "var(--lightPurple)", opacity: 1};
    viewX.addText("parabola-increasing-slope-graph", "parabola-increasing-slope-H-label", textOptions);


    textOptions = {x: gph11.xValue - 4.5*upcApp.parabolaIncreasingSlopeGraph["point-label-gap"], y: gph11.yValue + upcApp.parabolaIncreasingSlopeGraph["point-label-gap"], text: "Steepness : " + gph11.slope.toFixed(2),  textAlign: "right",  fontSize: upcApp.graphFontSizeLarge*0.6, fontFamily: "Nunito",   textcolor: "white", opacity: 0.5};
    viewX.addText("parabola-increasing-slope-graph", "parabola-increasing-slope-steepness-label", textOptions);


    

    var pathOptions = {
        points: gph11.anglePoints(gph11.slopeAngle,gph11.point, 0.2, 20),
        strokewidth: 0.3,
        pathcolor: "var(--lightOrange)",
        pathfillcolor: "var(--writingGrey)",
        opacity: 0.3
    };


    viewX.addPath("parabola-increasing-slope-graph", "parabola-increasing-slope-angle", pathOptions);


    textOptions = {x: gph11.xValue + 2*upcApp.parabolaIncreasingSlopeGraph["point-label-gap"], y: gph11.yValue, text: gph11.slopeAngle.toFixed(2) + " deg",  textAlign: "left",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightOrange)", opacity: 1};
    viewX.addText("parabola-increasing-slope-graph", "parabola-increasing-slope-angle-label", textOptions);

    gph11.updateParabolicIncreasingSlope()

    // viewX.playAnimation('parabola-increasing-slope-animation', 0, 32, 20)


    

    // gph11.sliderLabel.innerHTML = gph11.slider.value + " point" + (gph11.slider.value == 1 ? "" : "s")


}

// viewX.setAnimationFrame('someName', 4)

gph11.updateParabolicIncreasingSlope = function() {
    gph11.xValue = parseFloat(gph11.slider.value)
    gph11.pointDetails= getParabolicPointData([0, 0.25], [-3, -0.25], [3, -0.25], 2*gph11.xValue)
    gph11.yValue = gph11.pointDetails.point[1]
    gph11.slope = gph11.pointDetails.slope
    gph11.slopeAngle = (Math.atan(gph11.slope)) * (180 / Math.PI)
    gph11.point = [gph11.xValue, gph11.yValue]

    textOptions = {x: gph11.xValue + upcApp.parabolaIncreasingSlopeGraph["point-label-gap"]/2, y: upcApp.parabolicCircleGraph["ymin"]/5, text: "x = " + gph11.xValue};
    viewX.updateText("parabola-increasing-slope-graph", "parabola-increasing-slope-xvalue-text", textOptions);
    
    lineOptions = { x1: gph11.xValue, y1: defaultGraphOptions["ymax"]*2, x2: gph11.xValue, y2: defaultGraphOptions["ymin"]}; 
    viewX.updateLine("parabola-increasing-slope-graph", "parabola-increasing-slope-xline", lineOptions);

    viewX.updatePointXY("parabola-increasing-slope-graph", "parabola-increasing-slope-pointOnParabola", gph11.xValue, gph11.yValue);

    textOptions = {x: gph11.xValue + upcApp.parabolaIncreasingSlopeGraph["point-label-gap"]/2, y: gph11.yValue - upcApp.parabolaIncreasingSlopeGraph["point-label-gap"]/2, text: "(" + gph11.xValue.toFixed(2) + ", " + gph11.yValue.toFixed(2) + ")"};
    viewX.updateText("parabola-increasing-slope-graph", "parabola-increasing-slope-pointOnParabola-description", textOptions);

    textOptions = {x: gph11.xValue - 4.5*upcApp.parabolaIncreasingSlopeGraph["point-label-gap"], y: gph11.yValue + upcApp.parabolaIncreasingSlopeGraph["point-label-gap"], text: "Steepness : " + gph11.slope.toFixed(1) + " (" + gph11.slopeAngle.toFixed(1) + "°)"};
    viewX.updateText("parabola-increasing-slope-graph", "parabola-increasing-slope-steepness-label", textOptions);

    gph11.arrowDelta = viewX.rotatedVec([0.2, 0], gph11.slopeAngle)
    xyArrowEnd = viewX.addVec(gph11.point, gph11.arrowDelta)
    xyArrowStart = viewX.subtractVec(gph11.point, gph11.arrowDelta)
    
    var arrowOptions = {
        from: xyArrowStart,
        to:xyArrowEnd,
        strokewidth: 0.4,
        arrowcolor: "white"
    };
    arrow = viewX.updateArrow("parabola-increasing-slope-graph", "parabola-increasing-slope-steep-arrow", arrowOptions);


    gph11.deltaForTangent = viewX.rotatedVec([10, 0], gph11.slopeAngle)
    xyTangentEnd = viewX.addVec(gph11.point, gph11.deltaForTangent)
    xyTangentStart = viewX.subtractVec(gph11.point, gph11.deltaForTangent)

    lineOptions = { x1: xyTangentEnd[0], y1: xyTangentEnd[1], x2: xyTangentStart[0], y2: xyTangentStart[1]}; 
    viewX.updateLine("parabola-increasing-slope-graph", "parabola-increasing-tangent", lineOptions);

    if (gph11.point[0] > 1.3) {
        angleLocation = viewX.subtractVec(gph11.point, viewX.rotatedVec([2, 0], gph11.slopeAngle))
        toUpdateAnglePoints = gph11.anglePoints(gph11.slopeAngle, angleLocation, 0.2, 20)
        
    }
    else {
        angleLocation = viewX.addVec(gph11.point, viewX.rotatedVec([0.5, 0], gph11.slopeAngle))
        toUpdateAnglePoints = gph11.anglePoints(gph11.slopeAngle, angleLocation, 0.2, 20)
    }
    
    textOptions = {x: angleLocation[0] + 1.5*upcApp.parabolaIncreasingSlopeGraph["point-label-gap"], y: angleLocation[1], text: gph11.slopeAngle.toFixed(2) + "°"};
    viewX.updateText("parabola-increasing-slope-graph", "parabola-increasing-slope-angle-label", textOptions);

    viewX.updatePathPoints("parabola-increasing-slope-graph", "parabola-increasing-slope-angle", toUpdateAnglePoints);

}


gph11.anglePoints = function(angle, location, size, numberOfPoints=10) {
    if (numberOfPoints < 10) {
        numberOfPoints = 10
    }

    anglePoints = [location , [location[0] + size, location[1]]]
    for (p = 0; p < (numberOfPoints + 1); p++) {
        quanta = angle*(Math.PI/180)/numberOfPoints
        anglePoints.push([location[0] + size*Math.cos(quanta*p), location[1] + size*Math.sin(quanta*p)])
    }

    anglePoints.push(location)

    return anglePoints
}

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(10, 0%, 20%, 0.7)",
    trackFillColor: "white",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "white",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "parabola-increasing-slope-Slider");

gph11.slider = document.getElementById("parabola-increasing-slope-Slider");
gph11.sliderLabel = document.getElementById("parabola-increasing-slope-SliderLabel");
gph11.sliderInfo = document.getElementById("parabola-increasing-slope-SliderInfo");

gph11.slider.value = 1
gph11.sliderLabel.innerHTML = "x = " + (gph11.slider.value)


gph11.slider.addEventListener('input', function() {
    gph11.updateParabolicIncreasingSlope()
    gph11.sliderLabel.innerHTML = "x = " + (gph11.slider.value)
});


window.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
        upcApp.revealSection()
    }
})


// graph 12 : cutting ribbon

gph12 = {}
gph12.setUpCuttingRibbon = function() {
    gph12.graphH = document.getElementById('cutting-ribbon-graphHolder')
    defaultGraphOptions["xmax"] = 15
    defaultGraphOptions["ymax"] = 3.5
    defaultGraphOptions["xmin"] = -15
    defaultGraphOptions["ymin"] = -3.5
    
    // if (window.innerWidth >= 1000) {
    //     defaultGraphOptions["ymajorgridlinesvisibility"] = "yes"
    //     defaultGraphOptions["xmajorgridlinesvisibility"] = "yes"
    // }

    viewX.addGraph(gph12.graphH, "cutting-ribbon-graph", defaultGraphOptions)

    
    lineOptions = { x1: -10, y1: 0, x2: 2, y2: 0, strokewidth: 7, linecolor: "var(--lightPurple)"}; 
    viewX.addLine("cutting-ribbon-graph", "cutting-ribbon-12-line", lineOptions);

    textOptions = { x: -3.5, y: 1, textcolor: "var(--lightPurple)", text: "12", fontFamily: "Nunito", textAlign: "center"}; 
    viewX.addText("cutting-ribbon-graph", "cutting-ribbon-12-text", textOptions);

    textOptions = { x: -3.5, y: -1.5, textcolor: "var(--writingGrey)", text: "What we have", fontFamily: "Nunito", textAlign: "center", fontSize:  upcApp.graphFontSizeLarge*2}
    viewX.addText("cutting-ribbon-graph", "cutting-ribbon-12-what-text", textOptions);
    

    lineOptions = { x1: 5, y1: 0, x2: 8, y2: 0, strokewidth: 7, linecolor: "var(--lightBlue)"}; 
    viewX.addLine("cutting-ribbon-graph", "cutting-ribbon-3-line", lineOptions);

    textOptions = { x: 6.5, y: 1, textcolor: "var(--lightBlue)", text: "3", fontFamily: "Nunito", textAlign: "center"}; 
    viewX.addText("cutting-ribbon-graph", "cutting-ribbon-3-text", textOptions);

    textOptions = { x: 6.5, y: -1.5, textcolor: "var(--writingGrey)", text: "What we want", fontFamily: "Nunito", textAlign: "center", fontSize:  upcApp.graphFontSizeLarge*2}
    viewX.addText("cutting-ribbon-graph", "cutting-ribbon-3-what-text", textOptions);
}


// graph 13 : cutting ribbon animation

gph13 = {}
gph13.setUpCuttingRibbonAnimation = function() {
    gph13.graphH = document.getElementById('cutting-ribbon-animation-graphHolder')
    defaultGraphOptions["xmax"] = 15
    defaultGraphOptions["ymax"] = 2.5
    defaultGraphOptions["xmin"] = -15
    defaultGraphOptions["ymin"] = -4.5
    
    // if (window.innerWidth >= 1000) {
    //     defaultGraphOptions["ymajorgridlinesvisibility"] = "yes"
    //     defaultGraphOptions["xmajorgridlinesvisibility"] = "yes"
    // }

    viewX.addGraph(gph13.graphH, "cutting-ribbon-animation-graph", defaultGraphOptions)

    lineOptions = { x1: -6, y1: 0, x2: -6 + (12/4), y2: 0, strokewidth: 7, linecolor: "var(--lightPurple)"}; 
    viewX.addLine("cutting-ribbon-animation-graph", "cutting-ribbon-animation-12-cut1", lineOptions);
    lineOptions = { x1: -6 + 1*(12/4), y1: 0, x2: -6 + 1*(12/4) + (12/4), y2: 0, strokewidth: 7, linecolor: "var(--lightPurple)"}; 
    viewX.addLine("cutting-ribbon-animation-graph", "cutting-ribbon-animation-12-cut2", lineOptions);
    lineOptions = { x1: -6 + 2*(12/4), y1: 0, x2: -6 + 2*(12/4) + (12/4), y2: 0, strokewidth: 7, linecolor: "var(--lightPurple)"}; 
    viewX.addLine("cutting-ribbon-animation-graph", "cutting-ribbon-animation-12-cut3", lineOptions);
    lineOptions = { x1: -6 + 3*(12/4), y1: 0, x2: -6 + 3*(12/4) + (12/4), y2: 0, strokewidth: 7, linecolor: "var(--lightPurple)"}; 
    viewX.addLine("cutting-ribbon-animation-graph", "cutting-ribbon-animation-12-cut4", lineOptions);

    
    lineOptions = { x1: -6, y1: 0, x2: 6, y2: 0, strokewidth: 7, linecolor: "var(--lightPurple)"}; 
    viewX.addLine("cutting-ribbon-animation-graph", "cutting-ribbon-animation-12-line", lineOptions);

    textOptions = { x: 0, y: 1, textcolor: "var(--lightPurple)", text: "12", fontFamily: "Nunito", textAlign: "center"}; 
    viewX.addText("cutting-ribbon-animation-graph", "cutting-ribbon-animation-12-text", textOptions);


    textOptions = { x: 6.5, y: 1, textcolor: "var(--lightBlue)", text: "3", fontFamily: "Nunito", textAlign: "center", opacity: 0}; 
    viewX.addText("cutting-ribbon-animation-graph", "cutting-ribbon-animation-3-text", textOptions);

    viewX.addAnimation("cutting-ribbon-animation", gph13.sliderAnimationOptions)
    // setTimeout(function() {
    //     viewX.playAnimationToFrame("cutting-ribbon-animation", 12, 5, 30)
    // }, 2000);
    
}

gph13.sliderAnimationOptions = {}
gph13.sliderAnimationOptions.keyframes = {
    "0" : {
        "ob0" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-12-cut1', 
            'options': { x1: -6, y1: 0, x2: -6 + (12/4), y2: 0, strokewidth: 7, linecolor: "var(--lightPurple)"}
        },
        "ob1" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-12-cut2', 
            'options': { x1: -6 + 1*(12/4), y1: 0, x2: -6 + 1*(12/4) + (12/4), y2: 0, strokewidth: 7, linecolor: "var(--lightPurple)"}
        },
        "ob2" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-12-cut3', 
            'options': { x1: -6 + 2*(12/4), y1: 0, x2: -6 + 2*(12/4) + (12/4), y2: 0, strokewidth: 7, linecolor: "var(--lightPurple)"}
        },
        "ob3" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-12-cut4', 
            'options': { x1: -6 + 3*(12/4), y1: 0, x2: -6 + 3*(12/4) + (12/4), y2: 0, strokewidth: 7, linecolor: "var(--lightPurple)"}
        },
        "ob4" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-3-text', 
            'options': { x: 6.5, y: 1, opacity: 0}
        }
    },
    "1" : {
        "ob0" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-12-cut1', 
            'options': {x1: -6 + 0*(12/4) , y1: -2, x2: -6 + 0*(12/4) + (12/4), y2: -2, linecolor: "var(--lightPurple)"}
        },
        "ob1" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-12-cut2', 
            'options': {x1: -6 + 1*(12/4) , y1: -2, x2: -6 + 1*(12/4) + (12/4), y2: -2, linecolor: "var(--lightPurple)"}
        },
        "ob2" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-12-cut3', 
            'options': {x1: -6 + 2*(12/4) , y1: -2, x2: -6 + 2*(12/4) + (12/4), y2: -2, linecolor: "var(--lightPurple)"}
        },
        "ob3" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-12-cut4', 
            'options': {x1: -6 + 3*(12/4) , y1: -2, x2: -6 + 3*(12/4) + (12/4), y2: -2, linecolor: "var(--lightPurple)"}
        }
    },
    "2" : {
        "ob0" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-12-cut1', 
            'options': {x1: -6 + 0*(12/4) - 1 , y1: -2, x2: -6 + 0*(12/4) + (12/4) - 1, y2: -2, linecolor: "var(--lightBlue)"}
        },
        "ob1" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-12-cut2', 
            'options': {x1: -6 + 1*(12/4) - 0.3, y1: -2, x2: -6 + 1*(12/4) + (12/4) - 0.3, y2: -2, linecolor: "var(--writingGrey)"}
        },
        "ob2" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-12-cut3', 
            'options': {x1: -6 + 2*(12/4) + 0.3 , y1: -2, x2: -6 + 2*(12/4) + (12/4) + 0.3, y2: -2, linecolor: "var(--writingGrey)"}
        },
        "ob3" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-12-cut4', 
            'options': {x1: -6 + 3*(12/4) + 1 , y1: -2, x2: -6 + 3*(12/4) + (12/4) + 1, y2: -2, linecolor: "var(--writingGrey)"}
        }
    },
    "3" : {
        "ob0" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-12-cut1', 
            'options': {y1: -2, y2: -2, linecolor: "var(--lightBlue)"}
        },
        "ob1" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-12-cut2', 
            'options': {y1: -2, y2: -2, linecolor: "var(--writingGrey)"}
        },
        "ob2" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-12-cut3', 
            'options': {y1: -2, y2: -2, linecolor: "var(--writingGrey)"}
        },
        "ob3" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-12-cut4', 
            'options': {y1: -2, y2: -2, linecolor: "var(--writingGrey)"}
        },
        "ob4" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-3-text', 
            'options': { x: -5.5, y: -4, opacity: 0}
        }
    },
    "4" : {
        "ob1" : {
            'graph': 'cutting-ribbon-animation-graph',
            'object': 'cutting-ribbon-animation-3-text', 
            'options': { x: -5.5, y: -4, opacity: 1}
        }
    }
        
}

gph13.messageOfSteps = [
        'Take the <span class="p-lightPurple">ribbon</span> :)',
        'Take the <span class="p-lightPurple">ribbon</span> :)',
        'Cut it into <span class="p-lightOrange"> 4 pieces</span>.',
        'Discard the last 3 pieces.',
        'Keep the <span class="p-lightBlue">1st piece</span>. This piece is of length <span class="p-lightBlue">3</span>.',
        'There you go.'

    ]

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(10, 0%, 20%, 0.7)",
    trackFillColor: "white",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "white",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "cutting-ribbon-animation-Slider");

gph13.slider = document.getElementById("cutting-ribbon-animation-Slider");
gph13.sliderLabel = document.getElementById("cutting-ribbon-animation-SliderInfo");

gph13.slider.addEventListener('input', function() {
gph13.sliderLabel.innerHTML = gph13.messageOfSteps[parseInt(gph13.slider.value)]
    viewX.playAnimationToFrame('cutting-ribbon-animation', parseInt(gph13.slider.value), 1)
});

function pauseAutoplaygph13() {
    clearInterval(gph13.interval);
}

gph13.slider.addEventListener('mouseover', pauseAutoplaygph13);
gph13.slider.addEventListener('touchstart', pauseAutoplaygph13);

gph13.nextValue = function() {
    gph13.slider.value = parseInt(gph13.slider.value) + 1
    if (gph13.slider.value == gph13.slider.max) {
        gph13.slider.value = 0
    }
    gph13.sliderLabel.innerHTML = gph13.messageOfSteps[parseInt(gph13.slider.value)]
    viewX.playAnimationToFrame('cutting-ribbon-animation', parseInt(gph13.slider.value), 2)
}



// graph 14 : shrinking ribbon animation

gph14 = {}
gph14.setUpShrinkingRibbonAnimation = function() {
    gph14.graphH = document.getElementById('shrinking-ribbon-animation-graphHolder')
    defaultGraphOptions["xmax"] = 15
    defaultGraphOptions["ymax"] = 2.5
    defaultGraphOptions["xmin"] = -15
    defaultGraphOptions["ymin"] = -4.5
    
    // if (window.innerWidth >= 1000) {
    //     defaultGraphOptions["ymajorgridlinesvisibility"] = "yes"
    //     defaultGraphOptions["xmajorgridlinesvisibility"] = "yes"
    // }

    viewX.addGraph(gph14.graphH, "shrinking-ribbon-animation-graph", defaultGraphOptions)

    lineOptions = { x1: -6, y1: 0, x2: 6, y2: 0, strokewidth: 7, linecolor: "var(--lightPurple)"}; 
    viewX.addLine("shrinking-ribbon-animation-graph", "shrinking-ribbon-animation-12-copy", lineOptions);

    
    lineOptions = { x1: -6, y1: 0, x2: 6, y2: 0, strokewidth: 7, linecolor: "var(--lightPurple)"}; 
    viewX.addLine("shrinking-ribbon-animation-graph", "shrinking-ribbon-animation-12-line", lineOptions);

    textOptions = { x: 0, y: 1, textcolor: "var(--lightPurple)", text: "12", fontFamily: "Nunito", textAlign: "center"}; 
    viewX.addText("shrinking-ribbon-animation-graph", "shrinking-ribbon-animation-12-text", textOptions);


    textOptions = { x: 6.5, y: 1, textcolor: "var(--lightBlue)", text: "3", fontFamily: "Nunito", textAlign: "center", opacity: 0}; 
    viewX.addText("shrinking-ribbon-animation-graph", "shrinking-ribbon-animation-3-text", textOptions);

    viewX.addAnimation("shrinking-ribbon-animation", gph14.sliderAnimationOptions)
    // setTimeout(function() {
    //     viewX.playAnimationToFrame("shrinking-ribbon-animation", 12, 5, 30)
    // }, 2000);
    
}

gph14.sliderAnimationOptions = {}
gph14.sliderAnimationOptions.keyframes = {
    "0" : {
        "ob0" : {
            'graph': 'shrinking-ribbon-animation-graph',
            'object': 'shrinking-ribbon-animation-12-copy', 
            'options': { x1: -6, y1: 0, x2: 6, y2: 0, strokewidth: 7, linecolor: "var(--lightPurple)"}
        },
        "ob4" : {
            'graph': 'shrinking-ribbon-animation-graph',
            'object': 'shrinking-ribbon-animation-3-text', 
            'options': { x: 6.5, y: 1, opacity: 0}
        }
    },
    "1" : {
        "ob0" : {
            'graph': 'shrinking-ribbon-animation-graph',
            'object': 'shrinking-ribbon-animation-12-copy', 
            'options': {x1: -6 , y1: -2, x2: 6, y2: -2, linecolor: "var(--lightPurple)"}
        }
    },
    "2" : {
        "ob0" : {
            'graph': 'shrinking-ribbon-animation-graph',
            'object': 'shrinking-ribbon-animation-12-copy', 
            'options': {x1: -6 , y1: -2, x2: -3, y2: -2, linecolor: "var(--lightBlue)"}
        },
        "ob1" : {
            'graph': 'shrinking-ribbon-animation-graph',
            'object': 'shrinking-ribbon-animation-3-text', 
            'options': { x: -4.5, y: -4, opacity: 0}
        }
    },
    "3" : {
        "ob1" : {
            'graph': 'shrinking-ribbon-animation-graph',
            'object': 'shrinking-ribbon-animation-3-text', 
            'options': { x: -4.5, y: -4, opacity: 1}
        }
    }
        
}

gph14.messageOfSteps = [
        'Take the <span class="p-lightPurple">line segment</span> :)',
        'Take the <span class="p-lightPurple">line segment</span> :)',
        'Shrink it by a factor of <span class="p-lightOrange"> 4</span>.',
        'This piece is of length <span class="p-lightBlue">3</span>.',
        'There you go.'

    ]

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(10, 0%, 20%, 0.7)",
    trackFillColor: "white",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "white",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "shrinking-ribbon-animation-Slider");

gph14.slider = document.getElementById("shrinking-ribbon-animation-Slider");
gph14.sliderLabel = document.getElementById("shrinking-ribbon-animation-SliderInfo");

gph14.slider.addEventListener('input', function() {
    if (parseFloat(gph14.slider.value) >= 1 && parseFloat(gph14.slider.value) <= 2) {
        if (parseFloat(gph14.slider.value) == 1) {
            gph14.sliderLabel.innerHTML = gph14.messageOfSteps[parseInt(gph14.slider.value)]
        }
        else {
            gph14.sliderLabel.innerHTML = 'Shrink it by a factor of <span class="p-lightOrange"> ' + viewX.linearValue(1, 2, 1, 4, parseFloat(gph14.slider.value)).toFixed(1) + '</span>.'
        }
        
        if (parseFloat(gph14.slider.step) >= 1) {
            gph14.slider.disabled = true
            setTimeout(function() {
                gph14.slider.disabled = false
            }, 10);
        }
        gph14.slider.step = 0.01
    }
    else {
        gph14.sliderLabel.innerHTML = gph14.messageOfSteps[parseInt(gph14.slider.value)]
        gph14.slider.step = 1
    }

    viewX.playAnimationToFrame('shrinking-ribbon-animation', parseFloat(gph14.slider.value), 1)
});

function pauseAutoplaygph14() {
    clearInterval(gph14.interval);
    gph14.slider.step = 0.01
}

gph14.slider.addEventListener('mouseover', pauseAutoplaygph14);
gph14.slider.addEventListener('touchstart', pauseAutoplaygph14);

gph14.nextValue = function() {
    gph14.slider.value = parseFloat(gph14.slider.value) + 1
    if (gph14.slider.value == gph14.slider.max) {
        gph14.slider.value = 0
    }
    gph14.sliderLabel.innerHTML = gph14.messageOfSteps[parseInt(gph14.slider.value)]
    viewX.playAnimationToFrame('shrinking-ribbon-animation', parseInt(gph14.slider.value), 2)
}



// graph 15 : lines, what we have, what we want.

gph15 = {}
gph15.setUpShrinkingLine = function() {
    gph15.graphH = document.getElementById('shrinking-line-graphHolder')
    defaultGraphOptions["xmax"] = 10
    defaultGraphOptions["ymax"] = upcApp.shrinkingLineGraph["ymax"]
    defaultGraphOptions["xmin"] = -8
    defaultGraphOptions["ymin"] = upcApp.shrinkingLineGraph["ymin"]
    
    // if (window.innerWidth >= 1000) {
    //     defaultGraphOptions["ymajorgridlinesvisibility"] = "yes"
    //     defaultGraphOptions["xmajorgridlinesvisibility"] = "yes"
    // }

    viewX.addGraph(gph15.graphH, "shrinking-line-graph", defaultGraphOptions)

    
    lineOptions = { x1: -8, y1: -3, x2: 5, y2: 2, strokewidth: 7, linecolor: "var(--lightPurple)"}; 
    viewX.addLine("shrinking-line-graph", "shrinking-line-12-line", lineOptions);

    textOptions = { x: -2.5, y: 1, textcolor: "var(--lightPurple)", text: "12", fontFamily: "Nunito", textAlign: "center", fontSize:  upcApp.graphFontSizeLarge*1.4};
    viewX.addText("shrinking-line-graph", "shrinking-line-12-text", textOptions);

    textOptions = { x: -2.5, y: -5, textcolor: "var(--writingGrey)", text: "What we have", fontFamily: "Nunito", textAlign: "center", fontSize:  upcApp.graphFontSizeLarge*1.2}
    viewX.addText("shrinking-line-graph", "shrinking-line-12-what-text", textOptions);
    

    lineOptions = { x1: -8 + 13 + 2, y1: -3, x2: -8 + (13/4) + 13 + 2, y2: -3 + (5/4), strokewidth: 7, linecolor: "var(--lightBlue)"}; 
    viewX.addLine("shrinking-line-graph", "shrinking-line-3-line", lineOptions);

    textOptions = { x: 6.5 + 2, y:  -1, textcolor: "var(--lightBlue)", text: "3", fontFamily: "Nunito", textAlign: "center", fontSize:  upcApp.graphFontSizeLarge*1.4};
    viewX.addText("shrinking-line-graph", "shrinking-line-3-text", textOptions);

    textOptions = { x: 6.5 + 2, y: -5, textcolor: "var(--writingGrey)", text: "What we want", fontFamily: "Nunito", textAlign: "center", fontSize:  upcApp.graphFontSizeLarge*1.2}
    viewX.addText("shrinking-line-graph", "shrinking-line-3-what-text", textOptions);
}


// graph 16 : lines, shrinking animation

gph16 = {}
gph16.setUpShrinkingLineAnimation = function() {
    gph16.graphH = document.getElementById('shrinking-line-animation-graphHolder')
    defaultGraphOptions["xmax"] = 10
    defaultGraphOptions["ymax"] = upcApp.shrinkingLineGraph["ymax"]
    defaultGraphOptions["xmin"] = -8
    defaultGraphOptions["ymin"] = upcApp.shrinkingLineGraph["ymin"]
    
    // if (window.innerWidth >= 1000) {
    //     defaultGraphOptions["ymajorgridlinesvisibility"] = "yes"
    //     defaultGraphOptions["xmajorgridlinesvisibility"] = "yes"
    // }

    viewX.addGraph(gph16.graphH, "shrinking-line-animation-graph", defaultGraphOptions)

    
    lineOptions = { x1: -8 + 3, y1: -3, x2: 5 + 3, y2: 2, strokewidth: 7, linecolor: "var(--lightPurple)"}; 
    viewX.addLine("shrinking-line-animation-graph", "shrinking-line-animation-12-line", lineOptions);

    lineOptions = { x1: -8 + 3, y1: -3, x2: 5 + 3, y2: 2, strokewidth: 7, linecolor: "var(--lightPurple)", opacity: 0.1}; 
    viewX.addLine("shrinking-line-animation-graph", "shrinking-line-animation-placeholder-12-line", lineOptions);

    // textOptions = { x: -2.5, y: 1, textcolor: "var(--lightPurple)", text: "12", fontFamily: "Nunito", textAlign: "center", fontSize:  upcApp.graphFontSizeLarge*1.4};
    // viewX.addText("shrinking-line-animation-graph", "shrinking-line-animation-12-text", textOptions);

    // textOptions = { x: -2.5, y: -5, textcolor: "var(--writingGrey)", text: "What we have", fontFamily: "Nunito", textAlign: "center", fontSize:  upcApp.graphFontSizeLarge*1.2}
    // viewX.addText("shrinking-line-animation-graph", "shrinking-line-animation-12-what-text", textOptions);
    

    lineOptions = { x1: -8 + 3, y1: -3, x2: -8 + (13/4) + 3, y2: -3 + (5/4), strokewidth: 7, linecolor: "var(--lightBlue)", opacity: 0.8}; 
    viewX.addLine("shrinking-line-animation-graph", "shrinking-line-animation-3-line", lineOptions);

    textOptions = { x: 6.5 + 2, y:  -1, textcolor: "var(--lightBlue)", text: "3", fontFamily: "Nunito", textAlign: "center", fontSize:  upcApp.graphFontSizeLarge*1.4, opacity: 0};
    viewX.addText("shrinking-line-animation-graph", "shrinking-line-animation-3-text", textOptions);


    rectOptions = { x: -8 + 3, y: 2, w: 13, h: 5, stroke: "hsla(0, 0%, 30%, 1)", strokewidth: 2, strokedasharray: "4, 4" ,  rectcolor: "hsla(190, 100%, 50%, 0)"};

    viewX.addRectangle("shrinking-line-animation-graph", "shrinking-line-animation-12-dotted-rect", rectOptions);

    rectOptions = { x: -8 + 3, y: 2, w: 13, h: 5, stroke: "hsla(0, 0%, 20%, 1)", strokewidth: 0.7,  rectcolor: "hsla(190, 100%, 50%, 0)"};

    viewX.addRectangle("shrinking-line-animation-graph", "shrinking-line-animation-12-rect", rectOptions);

    // textOptions = { x: 6.5 + 2, y: -5, textcolor: "var(--writingGrey)", text: "What we want", fontFamily: "Nunito", textAlign: "center", fontSize:  upcApp.graphFontSizeLarge*1.2}
    // viewX.addText("shrinking-line-animation-graph", "shrinking-line-animation-3-what-text", textOptions);
}


var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(10, 0%, 20%, 0.7)",
    trackFillColor: "white",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "white",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "shrinking-line-x-animation-Slider");
viewX.generateSliderStyles(sliderProperties, "shrinking-line-y-animation-Slider");

gph16.sliderx = document.getElementById("shrinking-line-x-animation-Slider");
gph16.sliderxLabel = document.getElementById("shrinking-line-x-animation-SliderInfo");
gph16.slidery = document.getElementById("shrinking-line-y-animation-Slider");
gph16.slideryLabel = document.getElementById("shrinking-line-y-animation-SliderInfo");

gph16.updateShrinkingLineAnimation = function() {

    gph16.xscaling = viewX.linearValue(1, 4, 1, 0.25, parseFloat(gph16.sliderx.value))
    gph16.yscaling = viewX.linearValue(1, 4, 1, 0.25, parseFloat(gph16.slidery.value))
    
    rectOptions = {x: -8 + 3, y: 2 - (5 - 5*gph16.yscaling), w: 13*gph16.xscaling, h: 5*gph16.yscaling};

    viewX.updateRectangle("shrinking-line-animation-graph", "shrinking-line-animation-12-dotted-rect", rectOptions);


    lineOptions = { x1: -8 + 3, y1: -3, x2: -8 + 3 + 13*gph16.xscaling, y2: -3 + 5*gph16.yscaling}; 
    viewX.updateLine("shrinking-line-animation-graph", "shrinking-line-animation-12-line", lineOptions);

    gph16.sliderxLabel.innerHTML = "Shrinking along x by a factor <span class='p-lightOrange'>" + parseFloat(1/gph16.xscaling).toFixed(1) + "</span>"
    gph16.slideryLabel.innerHTML = "Shrinking along y by a factor <span class='p-lightOrange'>" + parseFloat(1/gph16.yscaling).toFixed(1) + "</span>"

}

gph16.sliderx.addEventListener('input', function() {
    gph16.updateShrinkingLineAnimation();
    if (parseFloat(gph16.slidery.value) >= 4 && parseFloat(gph16.sliderx.value) >= 4) {
        upcApp.anim.show();
        upcApp.anim.goToAndPlay(0);
        upcApp.anim.setSpeed(2)
        upcApp.anim.play();
    }
});

gph16.slidery.addEventListener('input', function() {
    gph16.updateShrinkingLineAnimation();
    if (parseFloat(gph16.slidery.value) >= 4 && parseFloat(gph16.sliderx.value) >= 4) {
        upcApp.anim.show();
        upcApp.anim.goToAndPlay(0);
        upcApp.anim.setSpeed(2)
        upcApp.anim.play();
    }
});



// graph 17 : curves, what we have, what we want.

gph17 = {}
gph17.setUpShrinkingCurve = function() {
    gph17.graphH = document.getElementById('shrinking-curve-graphHolder')
    defaultGraphOptions["xmax"] = upcApp.shrinkingCurveGraph["xmax"] + 1 
    defaultGraphOptions["ymax"] = upcApp.shrinkingCurveGraph["ymax"]
    defaultGraphOptions["xmin"] = upcApp.shrinkingCurveGraph["xmin"] + 1 
    defaultGraphOptions["ymin"] = upcApp.shrinkingCurveGraph["ymin"]


    gph17.curvePathPoints = [[0, 0], [0.1, 0.2], [0.2, 0.4], [0.3, 0.6], [0.5, 0.8], [0.7, 0.95], [1, 1], [1.1, 0.97], [1.4, 0.8], [1.6, 0.5], [1.7, 0.4], [1.8, 0.35], [1.9, 0.39], [2.1, 0.5], [2.6, 0.9], [3, 1.3]]

    // if (window.innerWidth >= 1000) {
    //     defaultGraphOptions["ymajorgridlinesvisibility"] = "yes"
    //     defaultGraphOptions["xmajorgridlinesvisibility"] = "yes"
    // }

    viewX.addGraph(gph17.graphH, "shrinking-curve-graph", defaultGraphOptions)

    
    pathOptions = { points: gph17.curvePathPoints, strokewidth: 2, pathcolor: "var(--lightPurple)"}; 
    viewX.addPath("shrinking-curve-graph", "shrinking-curve-20-line", pathOptions);

    textOptions = { x: 0.3, y: 1, textcolor: "var(--lightPurple)", text: "20", fontFamily: "Nunito", textAlign: "center", fontSize:  upcApp.graphFontSizeLarge*1.4};
    viewX.addText("shrinking-curve-graph", "shrinking-curve-20-text", textOptions);

    textOptions = { x: 1.7, y: -0.3, textcolor: "var(--writingGrey)", text: "What we have", fontFamily: "Nunito", textAlign: "center", fontSize:  upcApp.graphFontSizeLarge*1.2}
    viewX.addText("shrinking-curve-graph", "shrinking-curve-20-what-text", textOptions);

    gph17.translatedPoints = viewX.addVec([4, 0], gph17.curvePathPoints) 
    
    gph17.curvePathPointsScaled = pointsScaled(gph17.translatedPoints, 0.25, 0.25, [4, 0])
    pathOptions = { points: gph17.curvePathPointsScaled, strokewidth: 2, pathcolor: "var(--lightBlue)"};
    viewX.addPath("shrinking-curve-graph", "shrinking-curve-5-line", pathOptions);

    textOptions = { x: 4.3, y: 0.5, textcolor: "var(--lightBlue)", text: "5", fontFamily: "Nunito", textAlign: "center", fontSize:  upcApp.graphFontSizeLarge*1.4};
    viewX.addText("shrinking-curve-graph", "shrinking-curve-5-text", textOptions);

    textOptions = { x: 4.3, y: -0.3, textcolor: "var(--writingGrey)", text: "What we want", fontFamily: "Nunito", textAlign: "center", fontSize:  upcApp.graphFontSizeLarge*1.2}
    viewX.addText("shrinking-curve-graph", "shrinking-curve-5-what-text", textOptions);
}


// graph 18 : curves, shrinking animation

gph18 = {}
gph18.setUpShrinkingCurveAnimation = function() {
    gph18.graphH = document.getElementById('shrinking-curve-animation-graphHolder')
    defaultGraphOptions["xmax"] = upcApp.shrinkingCurveGraph["xmax"]
    defaultGraphOptions["ymax"] = upcApp.shrinkingCurveGraph["ymax"]
    defaultGraphOptions["xmin"] = upcApp.shrinkingCurveGraph["xmin"]
    defaultGraphOptions["ymin"] = upcApp.shrinkingCurveGraph["ymin"]
    


    viewX.addGraph(gph18.graphH, "shrinking-curve-animation-graph", defaultGraphOptions)

    gph18.curvePathPoints = [[0, 0], [0.1, 0.2], [0.2, 0.4], [0.3, 0.6], [0.5, 0.8], [0.7, 0.95], [1, 1], [1.1, 0.97], [1.4, 0.8], [1.6, 0.5], [1.7, 0.4], [1.8, 0.35], [1.9, 0.39], [2.1, 0.5], [2.6, 0.9], [3, 1.3]]


    pathOptions = { points: gph18.curvePathPoints, strokewidth: 2, pathcolor: "var(--lightPurple)"}; 
    viewX.addPath("shrinking-curve-animation-graph", "shrinking-curve-animation-20-line", pathOptions);

    pathOptions = { points: gph18.curvePathPoints, strokewidth: 2, pathcolor: "var(--lightPurple)", opacity: 0.1}; 
    viewX.addPath("shrinking-curve-animation-graph", "shrinking-curve-animation-placeholder-20-line", pathOptions);

    gph18.curveScaledPointsFinal = pointsScaled(gph18.curvePathPoints, 0.25, 0.25, [0, 0])
    pathOptions = {points: gph18.curveScaledPointsFinal, strokewidth: 2, pathcolor: "var(--lightBlue)", opacity: 0.4}; 
    viewX.addPath("shrinking-curve-animation-graph", "shrinking-curve-animation-5-line", pathOptions);


    rectOptions = {x: 0, y: 1.5, w: 3, h: 1.5, stroke: "hsla(0, 0%, 30%, 1)", strokewidth: 2, strokedasharray: "4, 4" ,  rectcolor: "hsla(190, 100%, 50%, 0)"};

    viewX.addRectangle("shrinking-curve-animation-graph", "shrinking-curve-animation-20-dotted-rect", rectOptions);

    rectOptions = { x: 0, y: 1.5, w: 3, h: 1.5, stroke: "hsla(0, 0%, 20%, 1)", strokewidth: 0.7,  rectcolor: "hsla(190, 100%, 50%, 0)"};

    viewX.addRectangle("shrinking-curve-animation-graph", "shrinking-curve-animation-20-rect", rectOptions);

}


var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(10, 0%, 20%, 0.7)",
    trackFillColor: "white",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "white",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "shrinking-curve-x-animation-Slider");
viewX.generateSliderStyles(sliderProperties, "shrinking-curve-y-animation-Slider");


function pointsScaled(points, amountAlongX, amountAlongY, scaleAbout) {
    var scaledPoints = []
    for (var i = 0; i < points.length; i++) {
        differenceVector = viewX.subtractVec(points[i], scaleAbout)
        differenceVectorScaled = [differenceVector[0]*amountAlongX, differenceVector[1]*amountAlongY]
        scaledPoint = viewX.addVec(scaleAbout, differenceVectorScaled)
        scaledPoints.push(scaledPoint)
    }
    return scaledPoints
}


gph18.sliderx = document.getElementById("shrinking-curve-x-animation-Slider");
gph18.sliderxLabel = document.getElementById("shrinking-curve-x-animation-SliderInfo");
gph18.slidery = document.getElementById("shrinking-curve-y-animation-Slider");
gph18.slideryLabel = document.getElementById("shrinking-curve-y-animation-SliderInfo");

gph18.updateShrinkingLineAnimation = function() {

    gph18.xscaling = viewX.linearValue(1, 4, 1, 0.25, parseFloat(gph18.sliderx.value))
    gph18.yscaling = viewX.linearValue(1, 4, 1, 0.25, parseFloat(gph18.slidery.value))
    
    rectOptions = {x: 0, y: 1.5  - 1.5*(1 - gph18.yscaling), w: 3*gph18.xscaling, h: 1.5*gph18.yscaling};

    viewX.updateRectangle("shrinking-curve-animation-graph", "shrinking-curve-animation-20-dotted-rect", rectOptions);


    gph18.curveScaledPoints = pointsScaled(gph18.curvePathPoints, gph18.xscaling, gph18.yscaling, [0, 0])
    viewX.updatePathPoints("shrinking-curve-animation-graph", "shrinking-curve-animation-20-line", gph18.curveScaledPoints);

    gph18.sliderxLabel.innerHTML = "Shrinking along x by a factor <span class='p-lightOrange'>" + parseFloat(1/gph18.xscaling).toFixed(1) + "</span>"
    gph18.slideryLabel.innerHTML = "Shrinking along y by a factor <span class='p-lightOrange'>" + parseFloat(1/gph18.yscaling).toFixed(1) + "</span>"

}

gph18.sliderx.addEventListener('input', function() {
    gph18.updateShrinkingLineAnimation();
    if (parseFloat(gph18.sliderx.value) >= 4 && parseFloat(gph18.slidery.value) >= 4) {
        if (upcApp.revealPoint == 2) {
            upcApp.revealSection()
        }
        upcApp.anim.show();
        upcApp.anim.goToAndPlay(0);
        upcApp.anim.setSpeed(2)
        upcApp.anim.play();
    }
});

gph18.slidery.addEventListener('input', function() {
    gph18.updateShrinkingLineAnimation();
    if (parseFloat(gph18.slidery.value) >= 4 && parseFloat(gph18.sliderx.value) >= 4) {
        if (upcApp.revealPoint == 2) {
            upcApp.revealSection()
        }
        upcApp.anim.show();
        upcApp.anim.goToAndPlay(0);
        upcApp.anim.setSpeed(2)
        upcApp.anim.play();
    }
});

gph18.continueButton = document.getElementById("reveal-3-continueButton");

gph18.continueButton.addEventListener('click', function() {
    if (upcApp.revealPoint == 2) {
        upcApp.revealSection()
    }
});




// graph 19 : average distance simple problem

gph19 = {}
gph19.setUpSimpleProblemAverageAnimation = function() {
    gph19.graphH = document.getElementById('simple-problem-average-animation-graphHolder')
    defaultGraphOptions["xmax"] = 1.1
    defaultGraphOptions["ymax"] = upcApp.averageSymmetryReveal["ymax"]
    defaultGraphOptions["xmin"] = -0.1
    defaultGraphOptions["ymin"] = upcApp.averageSymmetryReveal["ymin"]
    
    viewX.addGraph(gph19.graphH, "simple-problem-average-animation-graph", defaultGraphOptions)

    defaultGraphOptions["ymajorgridlinesvisibility"] = "no"
    defaultGraphOptions["xmajorgridlinesvisibility"] = "no"

    rectOptions = { x: 0, y: 1, w: 1, h: 1, stroke: "var(--lightYellow)", strokewidth: 2, rectcolor: "hsla(190, 100%, 50%, 0)", strokedasharray: "3, 4", opacity: 0.5};

    viewX.addRectangle("simple-problem-average-animation-graph", "simple-problem-average-animation-unit-square", rectOptions);

    pointOnSquare = pickAPointOnSquare([0.8, 0.6])


    lineOptions = { x1: 1, y1: 0.5, x2: 1, y2: 1, strokewidth: 4, linecolor: "var(--brightYellow)", opacity: 0};
    viewX.addLine("simple-problem-average-animation-graph", "simple-problem-average-animation-AB-line", lineOptions);

    lineOptions = { x1: 1, y1: 0.5, x2: 1, y2: 0, strokewidth: 3.5, linecolor: "var(--lightGreen)", opacity: 0};
    viewX.addLine("simple-problem-average-animation-graph", "simple-problem-average-animation-reflect1-line", lineOptions);

    lineOptions = { x1: 0.5, y1: 0, x2: 1, y2: 0, strokewidth: 3, linecolor: "var(--brightYellow)", opacity: 0};
    viewX.addLine("simple-problem-average-animation-graph", "simple-problem-average-animation-reflect2-line", lineOptions);

    lineOptions = { x1: 0.5, y1: 0, x2: 0, y2: 0, strokewidth: 3, linecolor: "var(--lightGreen)", opacity: 0};
    viewX.addLine("simple-problem-average-animation-graph", "simple-problem-average-animation-reflect3-line", lineOptions);

    lineOptions = { x1: 0, y1: 0.5, x2: 0, y2: 0, strokewidth: 3, linecolor: "var(--brightYellow)", opacity: 0};
    viewX.addLine("simple-problem-average-animation-graph", "simple-problem-average-animation-reflect4-line", lineOptions);

    lineOptions = { x1: 0, y1: 0.5, x2: 0, y2: 1, strokewidth: 3, linecolor: "var(--lightGreen)", opacity: 0};
    viewX.addLine("simple-problem-average-animation-graph", "simple-problem-average-animation-reflect5-line", lineOptions);

    lineOptions = { x1: 0, y1: 1, x2: 0.5, y2: 1, strokewidth: 3, linecolor: "var(--brightYellow)", opacity: 0};
    viewX.addLine("simple-problem-average-animation-graph", "simple-problem-average-animation-reflect6-line", lineOptions);

    lineOptions = { x1: 1, y1: 1, x2: 0.5, y2: 1, strokewidth: 3, linecolor: "var(--lightGreen)", opacity: 0};
    viewX.addLine("simple-problem-average-animation-graph", "simple-problem-average-animation-reflect7-line", lineOptions);


    lineOptions = { x1: 0.5, y1: 0.5, x2: pointOnSquare[0], y2:pointOnSquare[1], strokedasharray: "4,4", strokewidth: 0.7, linecolor: "var(--lightPink)"};
    viewX.addLine("simple-problem-average-animation-graph", "simple-problem-average-animation-distance-line", lineOptions);

    pointOptions = { x: 0.5, y: 0.5, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightBlue)'};
    viewX.addPoint("simple-problem-average-animation-graph", "simple-problem-average-animation-center-C", pointOptions);
    textOptions = {x: 0.5 + 0.05, y: 0.5 - 0.08, text: "C",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightBlue)"};
    viewX.addText("simple-problem-average-animation-graph", "simple-problem-average-animation-center-C-label", textOptions);

    pointOptions = { x: pointOnSquare[0], y: pointOnSquare[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)'};
    viewX.addPoint("simple-problem-average-animation-graph", "simple-problem-average-animation-randomPoint-Q", pointOptions);
    textOptions = {x: pointOnSquare[0] + 0.05, y: pointOnSquare[1] - 0.08, text: "Q",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightPurple)"};
    viewX.addText("simple-problem-average-animation-graph", "simple-problem-average-animation-randomPoint-Q-label", textOptions);

    pointOptions = { x: 1, y: 1, pointsize: upcApp.graphPointSize, pointcolor: 'white', opacity: 0};
    viewX.addPoint("simple-problem-average-animation-graph", "simple-problem-average-animation-point-A", pointOptions);

    textOptions = {x: 1 + 0.05, y: 1 - 0.08, text: "A",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "white", opacity: 0};
    viewX.addText("simple-problem-average-animation-graph", "simple-problem-average-animation-point-A-label", textOptions);

    pointOptions = { x: 1, y: 0.5, pointsize: upcApp.graphPointSize, pointcolor: 'white', opacity: 0};
    viewX.addPoint("simple-problem-average-animation-graph", "simple-problem-average-animation-point-B", pointOptions);

    textOptions = {x: 1 + 0.05, y: 0.5 - 0.08, text: "B",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "white", opacity: 0};
    viewX.addText("simple-problem-average-animation-graph", "simple-problem-average-animation-point-B-label", textOptions);

    textOptions = {x: 1 + 0.2, y: 0.5, text: "1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--writingGrey)", opacity: 0};
    viewX.addText("simple-problem-average-animation-graph", "simple-problem-average-animation-unit-length-label", textOptions);

    
    var arrowOptions = {
        from: [1.15, 1],
        to: [1.15, 0],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0
    };
    arrow = viewX.addArrow("simple-problem-average-animation-graph", "simple-problem-average-animation-unit-length-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [1.15, 0],
        to: [1.15, 1],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0
    };
    arrow = viewX.addArrow("simple-problem-average-animation-graph", "simple-problem-average-animation-unit-length-arrow-2", arrowOptions);

    viewX.addAnimation("simple-problem-average-animation", gph19.sliderAnimationOptions)
}

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(10, 0%, 20%, 0.7)",
    trackFillColor: "white",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "white",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "simple-problem-average-animation-Slider");

gph19.slider = document.getElementById("simple-problem-average-animation-Slider");
gph19.sliderLabel = document.getElementById("simple-problem-average-animation-SliderInfo");

gph19.sliderAnimationOptions = {}

gph19.sliderAnimationOptions.keyframes = {
    "1" : {
        "ob0" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect1-line', 
            'options': { opacity: 0}
        },
        "ob1" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect2-line', 
            'options': { opacity: 0}
        },
        "ob2" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect3-line', 
            'options': { opacity: 0}
        },
        "ob3" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect4-line', 
            'options': { opacity: 0}
        },
        "ob4" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect5-line', 
            'options': { opacity: 0}
        },
        "ob5" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect6-line', 
            'options': { opacity: 0}
        },
        "ob6" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect7-line', 
            'options': { opacity: 0}
        },
        "ob7" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-AB-line', 
            'options': { opacity: 0}
        }
    },
    "2" : {
        "ob0" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect1-line', 
            'options': { opacity: 1}
        },
        "ob2" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect3-line', 
            'options': { opacity: 0}
        },
        "ob4" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect5-line', 
            'options': { opacity: 0}
        },
        "ob6" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect7-line', 
            'options': { opacity: 0}
        }
    },
    "3" : {
        "ob0" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect1-line', 
            'options': { opacity: 1}
        },
        "ob1" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect3-line', 
            'options': { opacity: 1}
        },
        "ob2" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect5-line', 
            'options': { opacity: 1}
        },
        "ob3" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect7-line', 
            'options': { opacity: 1}
        },
        "ob4" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect2-line', 
            'options': { opacity: 0}
        },
        "ob5" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect4-line', 
            'options': { opacity: 0}
        },
        "ob6" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect6-line', 
            'options': { opacity: 0}
        },
        "ob7" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-AB-line', 
            'options': { opacity: 0}
        }
    },
    "4" : {
        "ob0" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect2-line', 
            'options': { opacity: 1}
        },
        "ob2" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect4-line', 
            'options': { opacity: 1}
        },
        "ob4" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect6-line', 
            'options': { opacity: 1}
        },
        "ob6" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-AB-line', 
            'options': { opacity: 1}
        },
        "ob7": {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-unit-square', 
            'options': { opacity: 1}
        }
    },
    "5" : {
        "ob7": {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-unit-square', 
            'options': { opacity: 0}
        }
    },
    "6" : {
        "ob0" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect2-line', 
            'options': { opacity: 0}
        },
        "ob2" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect4-line', 
            'options': { opacity: 0}
        },
        "ob4" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect6-line', 
            'options': { opacity: 0}
        },
        "ob6" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-AB-line', 
            'options': { opacity: 1}
        }
    },
    "7" : {
        "ob0" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect7-line', 
            'options': { opacity: 0}
        },
        "ob2" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect3-line', 
            'options': { opacity: 0}
        },
        "ob4" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect5-line', 
            'options': { opacity: 0}
        },
        "ob6" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect1-line', 
            'options': { opacity: 1}
        }
    },
    "8" : {
        "ob6" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-reflect1-line', 
            'options': { opacity: 0}
        },
        "ob0" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-point-B', 
            'options': { opacity: 0}
        },
        "ob1" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-point-B-label', 
            'options': { opacity: 0}
        },
        "ob2" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-point-A', 
            'options': { opacity: 0}
        },
        "ob3" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-point-A-label', 
            'options': { opacity: 0}
        }
    },
    "9" : {
        "ob0" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-point-B', 
            'options': { opacity: 1}
        },
        "ob1" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-point-B-label', 
            'options': { opacity: 1}
        },
        "ob2" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-point-A', 
            'options': { opacity: 1}
        },
        "ob3" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-point-A-label', 
            'options': { opacity: 1}
        },
        "ob4" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-unit-length-arrow-1', 
            'options': { opacity: 0}
        },
        "ob5" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-unit-length-arrow-2', 
            'options': { opacity: 0}
        },
        "ob6" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-unit-length-label', 
            'options': { opacity: 0, text: "1", x: 1.1 + 0.2, y: 0.5}
        }

    },
    "10": {
        "ob4" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-unit-length-arrow-1', 
            'options': { opacity: 1, from: [1.2, 0], to: [1.2, 1]}
        },
        "ob5" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-unit-length-arrow-2', 
            'options': { opacity: 1, from: [1.2, 1], to: [1.2, 0]}
        },
        "ob6" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-unit-length-label', 
            'options': { opacity: 1, text: "0.5", x: 1.1 + 0.2, y: 0.75}
        }
    },
    "11": {
        "ob4" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-unit-length-arrow-1', 
            'options': { opacity: 1, from: [1.2, 0.5], to: [1.2, 1]}
        },
        "ob5" : {
            'graph': 'simple-problem-average-animation-graph',
            'object': 'simple-problem-average-animation-unit-length-arrow-2', 
            'options': { opacity: 1, from: [1.2, 1], to: [1.2, 0.5]}
        }
    }
}



gph19.messageOfSteps = [
        'Shall we begin? :)',
        'The initial problem. Average distance between point C and point Q on the perimeter.',
        'Consider this <span class="p-lightGreen">set of possible cases</span> ',
        'These are all <span class="p-lightGreen">similar pieces</span>, the average of one of them is the average of all of them.',
        'These are all <span class="p-brightYellow">similar pieces</span>, the average of one of them is the average of all of them.',
        'Consider the <span class="p-brightYellow">yellow pieces</span>, since the average is the same, we can ignore all of them and just consider one of them. ',
        'Average of <span class="p-brightYellow">126</span> instead of <span class="p-brightYellow">126126126</span>.',
        'The same thing can be done with the other <span class="p-lightGreen">symmetric segments</span>. Average of <span class="p-lightGreen">126</span> instead of <span class="p-lightGreen">126126126</span>.',
        'In fact, the <span class="p-lightGreen">green</span> and <span class="p-brightYellow">yellow</span> segments have the same average and we can keep only the <span class="p-brightYellow">yellow</span> segment in the calculation of average.',
        'Now we have a simpler problem. What is the average distance between the point C and a point on the <span class="p-brightYellow">line AB</span>?',
        'Now we have a simpler problem. What is the average distance between the point C and a point on the <span class="p-brightYellow">line AB</span>... of length 0.5?',
        'What is the average distance between a point and a point on the <span class="p-brightYellow">line</span>... of length 0.5?',
        'What is the average distance between a point and a point on the <span class="p-brightYellow">line</span>... of length 0.5?'
    ]


gph19.slider.addEventListener('input', function() {
    gph19.sliderLabel.innerHTML = gph19.messageOfSteps[parseInt(gph19.slider.value)]
    viewX.playAnimationToFrame('simple-problem-average-animation', parseInt(gph19.slider.value), 1)
});

function pauseAutoplaygph19() {
    clearInterval(gph19.interval);
}

gph19.slider.addEventListener('mouseover', pauseAutoplaygph19);
gph19.slider.addEventListener('touchstart', pauseAutoplaygph19);

gph19.nextValue = function() {
    gph19.slider.value = parseInt(gph19.slider.value) + 1
    if (gph19.slider.value == gph19.slider.max) {
        gph19.slider.value = 1
    }
    gph19.sliderLabel.innerHTML = gph19.messageOfSteps[parseInt(gph19.slider.value)]
    viewX.playAnimationToFrame('simple-problem-average-animation', parseInt(gph19.slider.value), 2)
}



// graph 20 : simple problem size 0.5

gph20 = {}
gph20.setUpSimpleProblemPointFive = function() {
    gph20.graphH = document.getElementById('simple-problem-description-size05-graphHolder')
    defaultGraphOptions["xmax"] = 1.1
    defaultGraphOptions["ymax"] = 1.1
    defaultGraphOptions["xmin"] = 0.4
    defaultGraphOptions["ymin"] = 0.4
    
    viewX.addGraph(gph20.graphH, "simple-problem-description-size05-graph", defaultGraphOptions)

    defaultGraphOptions["ymajorgridlinesvisibility"] = "no"
    defaultGraphOptions["xmajorgridlinesvisibility"] = "no"

    rectOptions = { x: 0, y: 1, w: 1, h: 1, stroke: "var(--lightYellow)", strokewidth: 2, rectcolor: "hsla(190, 100%, 50%, 0)", strokedasharray: "3, 4", opacity: 0.05};

    viewX.addRectangle("simple-problem-description-size05-graph", "simple-problem-description-size05-unit-square", rectOptions);

    pointOnSquare = pickAPointOnSquare([0.8, 0.6])

    lineOptions = { x1: 1, y1: 0.5, x2: 1, y2: 1, strokewidth: 4, linecolor: "var(--brightYellow)", opacity: 1};
    viewX.addLine("simple-problem-description-size05-graph", "simple-problem-description-size05-AB-line", lineOptions);

    lineOptions = { x1: 0.5, y1: 0.5, x2: pointOnSquare[0], y2:pointOnSquare[1], strokedasharray: "4,4", strokewidth: 0.7, linecolor: "var(--lightPink)"};
    viewX.addLine("simple-problem-description-size05-graph", "simple-problem-description-size05-distance-line", lineOptions);

    pointOptions = { x: 0.5, y: 0.5, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightBlue)'};
    viewX.addPoint("simple-problem-description-size05-graph", "simple-problem-description-size05-center-C", pointOptions);
    textOptions = {x: 0.5 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 0.5 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "C",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightBlue)"};
    viewX.addText("simple-problem-description-size05-graph", "simple-problem-description-size05-center-C-label", textOptions);

    pointOptions = { x: pointOnSquare[0], y: pointOnSquare[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)'};
    viewX.addPoint("simple-problem-description-size05-graph", "simple-problem-description-size05-randomPoint-Q", pointOptions);
    textOptions = {x: pointOnSquare[0] + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: pointOnSquare[1] - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "Q",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightPurple)"};
    viewX.addText("simple-problem-description-size05-graph", "simple-problem-description-size05-randomPoint-Q-label", textOptions);

    pointOptions = { x: 1, y: 1, pointsize: upcApp.graphPointSize, pointcolor: 'white', opacity: 1};
    viewX.addPoint("simple-problem-description-size05-graph", "simple-problem-description-size05-point-A", pointOptions);

    textOptions = {x: 1 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 1 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "A",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "white", opacity: 1};
    viewX.addText("simple-problem-description-size05-graph", "simple-problem-description-size05-point-A-label", textOptions);

    pointOptions = { x: 1, y: 0.5, pointsize: upcApp.graphPointSize, pointcolor: 'white', opacity: 1};
    viewX.addPoint("simple-problem-description-size05-graph", "simple-problem-description-size05-point-B", pointOptions);

    textOptions = {x: 1 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 0.5 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "B",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "white", opacity: 1};
    viewX.addText("simple-problem-description-size05-graph", "simple-problem-description-size05-point-B-label", textOptions);

    textOptions = {x: 1 + 0.15, y: 0.75, text: "0.5",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--brightYellow)", opacity: 1};
    viewX.addText("simple-problem-description-size05-graph", "simple-problem-description-size05-unit-length-label", textOptions);

    
    var arrowOptions = {
        from: [1.1, 1],
        to: [1.1, 0.5],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-description-size05-graph", "simple-problem-description-size05-unit-length-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [1.1, 0.5],
        to: [1.1, 1],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-description-size05-graph", "simple-problem-description-size05-unit-length-arrow-2", arrowOptions);

    var arrowOptions = {
        from: [1, 0.4],
        to: [0.5, 0.4],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-description-size05-graph", "simple-problem-description-size05-unit-length2-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [0.5, 0.4],
        to: [1, 0.4],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-description-size05-graph", "simple-problem-description-size05-unit-length2-arrow-2", arrowOptions);

    textOptions = {x: 0.75, y: 0.5 - 0.15, text: "0.5",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--brightYellow)", opacity: 1};
    viewX.addText("simple-problem-description-size05-graph", "simple-problem-description-size05-unit-length2-label", textOptions);


}


// graph 21 : simple problem size 1

gph21 = {}
gph21.setUpSimpleProblemSizeOne = function() {
    gph21.graphH = document.getElementById('simple-problem-description-size1-graphHolder')
    defaultGraphOptions["xmax"] = 1.1
    defaultGraphOptions["ymax"] = 1.1
    defaultGraphOptions["xmin"] = 0.4
    defaultGraphOptions["ymin"] = 0.4
    
    viewX.addGraph(gph21.graphH, "simple-problem-description-size1-graph", defaultGraphOptions)

    defaultGraphOptions["ymajorgridlinesvisibility"] = "no"
    defaultGraphOptions["xmajorgridlinesvisibility"] = "no"

    rectOptions = { x: 0, y: 1, w: 1, h: 1, stroke: "var(--lightYellow)", strokewidth: 2, rectcolor: "hsla(190, 100%, 50%, 0)", strokedasharray: "3, 4", opacity: 0.05};

    viewX.addRectangle("simple-problem-description-size1-graph", "simple-problem-description-size1-unit-square", rectOptions);

    pointOnSquare = pickAPointOnSquare([0.8, 0.6])

    lineOptions = { x1: 1, y1: 0.5, x2: 1, y2: 1, strokewidth: 4, linecolor: "var(--brightYellow)", opacity: 1};
    viewX.addLine("simple-problem-description-size1-graph", "simple-problem-description-size1-AB-line", lineOptions);

    lineOptions = { x1: 0.5, y1: 0.5, x2: pointOnSquare[0], y2:pointOnSquare[1], strokedasharray: "4,4", strokewidth: 0.7, linecolor: "var(--lightPink)"};
    viewX.addLine("simple-problem-description-size1-graph", "simple-problem-description-size1-distance-line", lineOptions);

    pointOptions = { x: 0.5, y: 0.5, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightBlue)'};
    viewX.addPoint("simple-problem-description-size1-graph", "simple-problem-description-size1-center-C", pointOptions);
    textOptions = {x: 0.5 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 0.5 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "C",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightBlue)"};
    viewX.addText("simple-problem-description-size1-graph", "simple-problem-description-size1-center-C-label", textOptions);

    pointOptions = { x: pointOnSquare[0], y: pointOnSquare[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)'};
    viewX.addPoint("simple-problem-description-size1-graph", "simple-problem-description-size1-randomPoint-Q", pointOptions);
    textOptions = {x: pointOnSquare[0] + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: pointOnSquare[1] - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "Q",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightPurple)"};
    viewX.addText("simple-problem-description-size1-graph", "simple-problem-description-size1-randomPoint-Q-label", textOptions);

    pointOptions = { x: 1, y: 1, pointsize: upcApp.graphPointSize, pointcolor: 'white', opacity: 1};
    viewX.addPoint("simple-problem-description-size1-graph", "simple-problem-description-size1-point-A", pointOptions);

    textOptions = {x: 1 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 1 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "A",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "white", opacity: 1};
    viewX.addText("simple-problem-description-size1-graph", "simple-problem-description-size1-point-A-label", textOptions);

    pointOptions = { x: 1, y: 0.5, pointsize: upcApp.graphPointSize, pointcolor: 'white', opacity: 1};
    viewX.addPoint("simple-problem-description-size1-graph", "simple-problem-description-size1-point-B", pointOptions);

    textOptions = {x: 1 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 0.5 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "B",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "white", opacity: 1};
    viewX.addText("simple-problem-description-size1-graph", "simple-problem-description-size1-point-B-label", textOptions);

    textOptions = {x: 1 + 0.15, y: 0.75, text: "1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--brightYellow)", opacity: 1};
    viewX.addText("simple-problem-description-size1-graph", "simple-problem-description-size1-unit-length-label", textOptions);

    
    var arrowOptions = {
        from: [1.1, 1],
        to: [1.1, 0.5],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-description-size1-graph", "simple-problem-description-size1-unit-length-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [1.1, 0.5],
        to: [1.1, 1],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-description-size1-graph", "simple-problem-description-size1-unit-length-arrow-2", arrowOptions);

    var arrowOptions = {
        from: [1, 0.4],
        to: [0.5, 0.4],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-description-size1-graph", "simple-problem-description-size1-unit-length2-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [0.5, 0.4],
        to: [1, 0.4],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-description-size1-graph", "simple-problem-description-size1-unit-length2-arrow-2", arrowOptions);

    textOptions = {x: 0.75, y: 0.5 - 0.15, text: "1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--brightYellow)", opacity: 1};
    viewX.addText("simple-problem-description-size1-graph", "simple-problem-description-size1-unit-length2-label", textOptions);


}


// graph 22 : simple problem size 1 sweep

gph22 = {}
gph22.setUpSimpleProblemSizeOneSweep = function() {
    gph22.graphH = document.getElementById('simple-problem-size1-sweep-graphHolder')
    defaultGraphOptions["xmax"] = 1.1
    defaultGraphOptions["ymax"] = 1.1
    defaultGraphOptions["xmin"] = 0.4
    defaultGraphOptions["ymin"] = 0.4
    
    viewX.addGraph(gph22.graphH, "simple-problem-size1-sweep-graph", defaultGraphOptions)

    defaultGraphOptions["ymajorgridlinesvisibility"] = "no"
    defaultGraphOptions["xmajorgridlinesvisibility"] = "no"

    rectOptions = { x: 0, y: 1, w: 1, h: 1, stroke: "var(--lightYellow)", strokewidth: 2, rectcolor: "hsla(190, 100%, 50%, 0)", strokedasharray: "3, 4", opacity: 0.05};

    viewX.addRectangle("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-unit-square", rectOptions);

    pointOnSquare = pickAPointOnSquare([0.8, 0.6])

    lineOptions = { x1: 1, y1: 0.5, x2: 1, y2: 1, strokewidth: 4, linecolor: "var(--brightYellow)", opacity: 1};
    viewX.addLine("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-AB-line", lineOptions);

    lineOptions = { x1: 0.5, y1: 0.5, x2: pointOnSquare[0], y2:pointOnSquare[1], strokedasharray: "4,4", strokewidth: 0.7, linecolor: "var(--lightPink)"};
    viewX.addLine("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-distance-line", lineOptions);

    pointOptions = { x: 0.5, y: 0.5, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightBlue)'};
    viewX.addPoint("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-center-C", pointOptions);
    textOptions = {x: 0.5 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 0.5 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "C",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightBlue)"};
    viewX.addText("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-center-C-label", textOptions);



    pointOptions = { x: 1, y: 1, pointsize: upcApp.graphPointSize, pointcolor: 'white', opacity: 1};
    viewX.addPoint("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-point-A", pointOptions);

    textOptions = {x: 1 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 1 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "A",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "white", opacity: 1};
    viewX.addText("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-point-A-label", textOptions);

    pointOptions = { x: 1, y: 0.5, pointsize: upcApp.graphPointSize, pointcolor: 'white', opacity: 1};
    viewX.addPoint("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-point-B", pointOptions);

    textOptions = {x: 1 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 0.5 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "B",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "white", opacity: 1};
    viewX.addText("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-point-B-label", textOptions);

    textOptions = {x: 1 + 0.15, y: 0.75, text: "1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--brightYellow)", opacity: 1};
    viewX.addText("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-unit-length-label", textOptions);

    
    var arrowOptions = {
        from: [1.1, 1],
        to: [1.1, 0.5],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-unit-length-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [1.1, 0.5],
        to: [1.1, 1],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-unit-length-arrow-2", arrowOptions);

    var arrowOptions = {
        from: [1, 0.4],
        to: [0.5, 0.4],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-unit-length2-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [0.5, 0.4],
        to: [1, 0.4],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-unit-length2-arrow-2", arrowOptions);

    textOptions = {x: 0.75, y: 0.5 - 0.15, text: "1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--brightYellow)", opacity: 1};
    viewX.addText("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-unit-length2-label", textOptions);


    pointOptions = { x: pointOnSquare[0], y: pointOnSquare[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)'};
    viewX.addPoint("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-randomPoint-Q", pointOptions);
    textOptions = {x: pointOnSquare[0] + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: pointOnSquare[1] - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "Q",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightPurple)"};
    viewX.addText("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-randomPoint-Q-label", textOptions);

    textOptions = {x: (pointOnSquare[0] + 0.5)/2 - 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: (pointOnSquare[1] + 0.5)/2 - 0.2*upcApp.parabolicCircleGraph["point-label-gap"], text: "1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightPink)", opacity: 1};
    viewX.addText("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-distance-text-label", textOptions);

    gph22.y = viewX.linearValue(0, 1, 0.5, 1, parseFloat(gph22.slider.value))
    gph22.point = [1, gph22.y]
    gph22.distanceValue = 2*viewX.distF([0.5, 0.5], gph22.point)

    gph22.sliderLabel.innerHTML = "At point <span class='p-lightPurple'>Q</span>, giving us the case of distance <span class='p-lightPink'>" + gph22.distanceValue.toFixed(3) + "</span>. Ofcourse, we need to go through all cases."

    viewX.updatePointXY("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-randomPoint-Q", gph22.point[0], gph22.point[1]);

    textOptions = {x: gph22.point[0] + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: gph22.point[1] - upcApp.parabolicCircleGraph["point-label-gap"]*0.2};
    viewX.updateText("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-randomPoint-Q-label", textOptions);


    lineOptions = { x1: 0.5, y1: 0.5, x2: gph22.point[0], y2:gph22.point[1]};
    viewX.updateLine("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-distance-line", lineOptions);

    textOptions = {x: (gph22.point[0] + 0.5)/2 - 0.1*upcApp.parabolicCircleGraph["point-label-gap"], y: (gph22.point[1] + 0.5)/2  + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], text: gph22.distanceValue.toFixed(3)};
    viewX.updateText("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-distance-text-label", textOptions);

}

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPurple)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPurple)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-sweep-Slider");

gph22.slider = document.getElementById("simple-problem-size1-sweep-Slider");
gph22.sliderLabel = document.getElementById("simple-problem-size1-sweep-SliderInfo")

gph22.slider.addEventListener('input', function() {
    gph22.y = viewX.linearValue(0, 1, 0.5, 1, parseFloat(gph22.slider.value))
    gph22.point = [1, gph22.y]
    gph22.distanceValue = 2*viewX.distF([0.5, 0.5], gph22.point)

    gph22.sliderLabel.innerHTML = "At point <span class='p-lightPurple'>Q</span>, giving us the case of distance <span class='p-lightPink'>" + gph22.distanceValue.toFixed(3) + "</span>. Ofcourse, we need to go through all cases."

    viewX.updatePointXY("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-randomPoint-Q", gph22.point[0], gph22.point[1]);

    textOptions = {x: gph22.point[0] + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: gph22.point[1] - upcApp.parabolicCircleGraph["point-label-gap"]*0.2};
    viewX.updateText("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-randomPoint-Q-label", textOptions);


    lineOptions = { x1: 0.5, y1: 0.5, x2: gph22.point[0], y2:gph22.point[1]};
    viewX.updateLine("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-distance-line", lineOptions);

    textOptions = {x: (gph22.point[0] + 0.5)/2 - 0.1*upcApp.parabolicCircleGraph["point-label-gap"], y: (gph22.point[1] + 0.5)/2  + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], text: gph22.distanceValue.toFixed(3)};
    viewX.updateText("simple-problem-size1-sweep-graph", "simple-problem-size1-sweep-distance-text-label", textOptions);
    
});



// graph 23 : simple problem size 1 - two point

gph23 = {}
gph23.setUpSimpleProblemSizeOneTwoPoint = function() {
    gph23.graphH = document.getElementById('simple-problem-size1-2-point-graphHolder')
    defaultGraphOptions["xmax"] = 1.1
    defaultGraphOptions["ymax"] = 1.1
    defaultGraphOptions["xmin"] = 0.4
    defaultGraphOptions["ymin"] = 0.4
    
    viewX.addGraph(gph23.graphH, "simple-problem-size1-2-point-graph", defaultGraphOptions)

    defaultGraphOptions["ymajorgridlinesvisibility"] = "no"
    defaultGraphOptions["xmajorgridlinesvisibility"] = "no"

    rectOptions = { x: 0, y: 1, w: 1, h: 1, stroke: "var(--lightYellow)", strokewidth: 2, rectcolor: "hsla(190, 100%, 50%, 0)", strokedasharray: "3, 4", opacity: 0.05};

    viewX.addRectangle("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-unit-square", rectOptions);

    pointOnSquare = pickAPointOnSquare([0.8, 0.6])

    lineOptions = { x1: 1, y1: 0.5, x2: 1, y2: 1, strokewidth: 4, linecolor: "var(--brightYellow)", opacity: 1};
    viewX.addLine("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-AB-line", lineOptions);

    pointOptions = { x: 0.5, y: 0.5, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightBlue)'};
    viewX.addPoint("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-center-C", pointOptions);
    textOptions = {x: 0.5 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 0.5 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "C",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightBlue)"};
    viewX.addText("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-center-C-label", textOptions);





    textOptions = {x: 1 + 0.15, y: 0.75, text: "1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--writingGrey)", opacity: 1};
    viewX.addText("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-unit-length-label", textOptions);

    
    var arrowOptions = {
        from: [1.1, 1],
        to: [1.1, 0.5],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-unit-length-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [1.1, 0.5],
        to: [1.1, 1],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-unit-length-arrow-2", arrowOptions);

    var arrowOptions = {
        from: [1, 0.4],
        to: [0.5, 0.4],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-unit-length2-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [0.5, 0.4],
        to: [1, 0.4],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-unit-length2-arrow-2", arrowOptions);

    textOptions = {x: 0.75, y: 0.5 - 0.15, text: "1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--writingGrey)", opacity: 1};
    viewX.addText("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-unit-length2-label", textOptions);




    lineOptions = { x1: 0.5, y1: 0.5, x2: 1, y2: 0.5, strokedasharray: "2,2", strokewidth: 0.7, linecolor: "var(--lightPink)"};
    viewX.addLine("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-distance-line-1", lineOptions);

    pointOptions = { x: 1, y: 0.5, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPink)', opacity: 1};
    viewX.addPoint("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-1", pointOptions);

    textOptions = {x: 1 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 0.5 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "B",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightPink)", opacity: 1};
    viewX.addText("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-label-1", textOptions);

    textOptions = {x: (1 + 0.5)/2 - 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: (0.5 + 0.5)/2 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], text: "1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightPink)", opacity: 1};
    viewX.addText("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-distance-text-label-1", textOptions);


    lineOptions = { x1: 0.5, y1: 0.5, x2: 1, y2: 1, strokedasharray: "2,2", strokewidth: 0.7, linecolor: "var(--lightGreen)"};
    viewX.addLine("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-distance-line-2", lineOptions);

    pointOptions = { x: 1, y: 1, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightGreen)', opacity: 1};
    viewX.addPoint("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-2", pointOptions);

    textOptions = {x: 1 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 1 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "A",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightGreen)", opacity: 1};
    viewX.addText("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-label-2", textOptions);

    textOptions = {x: (1 + 0.5)/2 - 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: (1 + 0.5)/2 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], text: "sqrt(2)",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightGreen)", opacity: 1};
    viewX.addText("simple-problem-size1-2-point-graph", "simple-problem-size1-2-point-distance-text-label-2", textOptions);

    gph23.animationGenerator(); 

}

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPurple)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPurple)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-2-point-Slider");

gph23.slider = document.getElementById("simple-problem-size1-2-point-Slider");
gph23.sliderLabel = document.getElementById("simple-problem-size1-2-point-SliderInfo")

gph23.sliderAnimationOptions = {}

gph23.animationGenerator = function() {
    stems = ["simple-problem-size1-2-point-", "simple-problem-size1-2-point-label-", "simple-problem-size1-2-point-distance-line-", "simple-problem-size1-2-point-distance-text-label-"]

    gph23.sliderAnimationOptions.keyframes = {}

    frameNumber = 0
    
    gph23.sliderAnimationOptions.keyframes[frameNumber.toString()] = {}
    for (k = 1; k <= 2; k++ ) {
        for (s = 0; s < stems.length; s++) {
            stem = stems[s]
            gph23.sliderAnimationOptions.keyframes[frameNumber.toString()]["ob-" + k + "-" + s] = {
                'graph': 'simple-problem-size1-2-point-graph',
                'object': stems[s] + k.toString(), 
                'options': { opacity: 0}
            }
        }
    }

    for (k = 1; k <= 2; k++ ) {
        for (s = 0; s < stems.length; s++) {
            stem = stems[s]
            frameNumber = frameNumber + 1
            gph23.sliderAnimationOptions.keyframes[frameNumber.toString()] = {}
            gph23.sliderAnimationOptions.keyframes[frameNumber.toString()]["ob-" + k + "-" + s] = {
                'graph': 'simple-problem-size1-2-point-graph',
                'object': stems[s] + k.toString(), 
                'options': { opacity: 1}
            }

            gph23.sliderAnimationOptions.keyframes[(frameNumber - 1).toString()]["ob-" + k + "-" + s] = {
                'graph': 'simple-problem-size1-2-point-graph',
                'object': stems[s] + k.toString(), 
                'options': { opacity: 0}
            }
        }
    }


    viewX.addAnimation('simple-problem-size1-2-point-animation', gph23.sliderAnimationOptions)
}

gph23.messageOfSteps = [
        'Shall we begin? :)',
        'Let\'s pick point B. ',
        'Let\'s pick point B. ',
        'It is at a distance of 1 unit from C. ',
        'CB = 1 ',
        'Now let\'s pick point A. ',
        'That\'s point A. ',
        'It is at a distance of sqaure root of 2 from C. By Pythagoras theorem ',
        'So.. CA = 1.414...'
    ]

gph23.slider.step = 1
gph23.slider.min = 0
gph23.slider.max = 2*4  


gph23.slider.addEventListener('input', function() {
    gph23.sliderLabel.innerHTML = gph23.messageOfSteps[parseInt(gph23.slider.value)]
    viewX.playAnimationToFrame('simple-problem-size1-2-point-animation', parseInt(gph23.slider.value), 1)
});

function pauseAutoplaygph23() {
    clearInterval(gph23.interval);
}

gph23.slider.addEventListener('mouseover', pauseAutoplaygph23);
gph23.slider.addEventListener('touchstart', pauseAutoplaygph23);

gph23.nextValue = function() {
    gph23.slider.value = parseInt(gph23.slider.value) + 1
    if (gph23.slider.value == gph23.slider.max) {
        gph23.slider.value = 1
    }
    gph23.sliderLabel.innerHTML = gph23.messageOfSteps[parseInt(gph23.slider.value)]
    viewX.playAnimationToFrame('simple-problem-size1-2-point-animation', parseInt(gph23.slider.value), 2)
}



// graph 24 : simple problem size 1 - three point

gph24 = {}
gph24.setUpSimpleProblemSizeOneThreePoint = function() {
    gph24.graphH = document.getElementById('simple-problem-size1-3-point-graphHolder')
    defaultGraphOptions["xmax"] = 1.1
    defaultGraphOptions["ymax"] = 1.1
    defaultGraphOptions["xmin"] = 0.4
    defaultGraphOptions["ymin"] = 0.4
    
    viewX.addGraph(gph24.graphH, "simple-problem-size1-3-point-graph", defaultGraphOptions)

    defaultGraphOptions["ymajorgridlinesvisibility"] = "no"
    defaultGraphOptions["xmajorgridlinesvisibility"] = "no"

    rectOptions = { x: 0, y: 1, w: 1, h: 1, stroke: "var(--lightYellow)", strokewidth: 2, rectcolor: "hsla(190, 100%, 50%, 0)", strokedasharray: "3, 4", opacity: 0.05};

    viewX.addRectangle("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-unit-square", rectOptions);

    pointOnSquare = pickAPointOnSquare([0.8, 0.6])

    lineOptions = { x1: 1, y1: 0.5, x2: 1, y2: 1, strokewidth: 4, linecolor: "var(--brightYellow)", opacity: 1};
    viewX.addLine("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-AB-line", lineOptions);

    pointOptions = { x: 0.5, y: 0.5, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightBlue)'};
    viewX.addPoint("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-center-C", pointOptions);
    textOptions = {x: 0.5 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 0.5 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "C",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightBlue)"};
    viewX.addText("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-center-C-label", textOptions);



    textOptions = {x: 1 + 0.15, y: 0.75 - (1/8), text: "1/2",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--writingGrey)", opacity: 1};
    viewX.addText("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-unit-length-side-1-label", textOptions);
    
    var arrowOptions = {
        from: [1.1, 0.5],
        to: [1.1, 0.75],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-unit-length-side-1-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [1.1, 0.75],
        to: [1.1, 0.5],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-unit-length-side-1-arrow-2", arrowOptions);


    textOptions = {x: 1 + 0.15, y: 0.75 + (1/8), text: "1/2",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--writingGrey)", opacity: 1};
    viewX.addText("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-unit-length-side-2-label", textOptions);
    
    var arrowOptions = {
        from: [1.1, 1],
        to: [1.1, 0.75],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-unit-length-side-2-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [1.1, 0.75],
        to: [1.1, 1],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-unit-length-side-2-arrow-2", arrowOptions);


    

    var arrowOptions = {
        from: [1, 0.4],
        to: [0.5, 0.4],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-unit-length2-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [0.5, 0.4],
        to: [1, 0.4],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-unit-length2-arrow-2", arrowOptions);

    textOptions = {x: 0.75, y: 0.5 - 0.15, text: "1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--writingGrey)", opacity: 1};
    viewX.addText("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-unit-length2-label", textOptions);




    lineOptions = { x1: 0.5, y1: 0.5, x2: 1, y2: 0.5, strokedasharray: "2,2", strokewidth: 0.7, linecolor: "var(--lightPink)"};
    viewX.addLine("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-distance-line-1", lineOptions);

    pointOptions = { x: 1, y: 0.5, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPink)', opacity: 1};
    viewX.addPoint("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-1", pointOptions);

    textOptions = {x: 1 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 0.5 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "B",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightPink)", opacity: 1};
    viewX.addText("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-label-1", textOptions);

    textOptions = {x: (1 + 0.5)/2 - 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: (0.5 + 0.5)/2 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], text: "1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightPink)", opacity: 1};
    viewX.addText("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-distance-text-label-1", textOptions);


    lineOptions = { x1: 0.5, y1: 0.5, x2: 1, y2: 1, strokedasharray: "2,2", strokewidth: 0.7, linecolor: "var(--lightGreen)"};
    viewX.addLine("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-distance-line-3", lineOptions);

    pointOptions = { x: 1, y: 1, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightGreen)', opacity: 1};
    viewX.addPoint("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-3", pointOptions);

    textOptions = {x: 1 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 1 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "A",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightGreen)", opacity: 1};
    viewX.addText("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-label-3", textOptions);

    textOptions = {x: (1 + 0.5)/2 - 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: (1 + 0.5)/2 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], text: "sqrt(2)",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightGreen)", opacity: 1};
    viewX.addText("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-distance-text-label-3", textOptions);


    lineOptions = { x1: 0.5, y1: 0.5, x2: 1, y2: 0.75, strokedasharray: "2,2", strokewidth: 0.7, linecolor: "var(--lightYellow)"};
    viewX.addLine("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-distance-line-2", lineOptions);

    pointOptions = { x: 1, y: 0.75, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightYellow)', opacity: 1};
    viewX.addPoint("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-2", pointOptions);

    textOptions = {x: 1 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 0.75 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "E",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightYellow)", opacity: 1};
    viewX.addText("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-label-2", textOptions);

    textOptions = {x: (1 + 0.5)/2 - 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: (0.75 + 0.5)/2 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], text: "sqrt(5)/2",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightYellow)", opacity: 1};
    viewX.addText("simple-problem-size1-3-point-graph", "simple-problem-size1-3-point-distance-text-label-2", textOptions);

    gph24.animationGenerator(); 

}

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPurple)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPurple)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-3-point-Slider");

gph24.slider = document.getElementById("simple-problem-size1-3-point-Slider");
gph24.sliderLabel = document.getElementById("simple-problem-size1-3-point-SliderInfo")

gph24.sliderAnimationOptions = {}

gph24.animationGenerator = function() {
    stems = ["simple-problem-size1-3-point-", "simple-problem-size1-3-point-label-", "simple-problem-size1-3-point-distance-line-", "simple-problem-size1-3-point-distance-text-label-"]

    gph24.sliderAnimationOptions.keyframes = {}

    frameNumber = 0
    
    gph24.sliderAnimationOptions.keyframes[frameNumber.toString()] = {}
    for (k = 1; k <= 3; k++ ) {
        for (s = 0; s < stems.length; s++) {
            stem = stems[s]
            gph24.sliderAnimationOptions.keyframes[frameNumber.toString()]["ob-" + k + "-" + s] = {
                'graph': 'simple-problem-size1-3-point-graph',
                'object': stems[s] + k.toString(), 
                'options': { opacity: 0}
            }
        }
    }

    for (k = 1; k <= 3; k++ ) {
        for (s = 0; s < stems.length; s++) {
            stem = stems[s]
            frameNumber = frameNumber + 1
            gph24.sliderAnimationOptions.keyframes[frameNumber.toString()] = {}
            gph24.sliderAnimationOptions.keyframes[frameNumber.toString()]["ob-" + k + "-" + s] = {
                'graph': 'simple-problem-size1-3-point-graph',
                'object': stems[s] + k.toString(), 
                'options': { opacity: 1}
            }

            gph24.sliderAnimationOptions.keyframes[(frameNumber - 1).toString()]["ob-" + k + "-" + s] = {
                'graph': 'simple-problem-size1-3-point-graph',
                'object': stems[s] + k.toString(), 
                'options': { opacity: 0}
            }
        }
    }


    viewX.addAnimation('simple-problem-size1-3-point-animation', gph24.sliderAnimationOptions)
}

gph24.messageOfSteps = [
        'Shall we begin? :)',
        'Let\'s pick point B. ',
        'Let\'s pick point B. ',
        'It is at a distance of 1 unit from C. ',
        'CB = 1 ',
        'Now let\'s pick point E. ',
        'That\'s point E. ',
        'It is at a distance of sqaure root of 5..  divided by 2 from C. By Pythagoras theorem ',
        'So.. CE = 1.118...',
        'Now let\'s pick point A. ',
        'That\'s point A. ',
        'It is at a distance of sqaure root of 2 from C. By Pythagoras theorem ',
        'So.. CA = 1.414...'
    ]

gph24.slider.step = 1
gph24.slider.min = 0
gph24.slider.max = 3*4  


gph24.slider.addEventListener('input', function() {
    gph24.sliderLabel.innerHTML = gph24.messageOfSteps[parseInt(gph24.slider.value)]
    viewX.playAnimationToFrame('simple-problem-size1-3-point-animation', parseInt(gph24.slider.value), 1)
});

function pauseAutoplaygph24() {
    clearInterval(gph24.interval);
}

gph24.slider.addEventListener('mouseover', pauseAutoplaygph24);
gph24.slider.addEventListener('touchstart', pauseAutoplaygph24);

gph24.nextValue = function() {
    gph24.slider.value = parseInt(gph24.slider.value) + 1
    if (gph24.slider.value == gph24.slider.max) {
        gph24.slider.value = 1
    }
    gph24.sliderLabel.innerHTML = gph24.messageOfSteps[parseInt(gph24.slider.value)]
    viewX.playAnimationToFrame('simple-problem-size1-3-point-animation', parseInt(gph24.slider.value), 2)
}



// graph 25 : simple problem size 1 - n point

gph25 = {}
gph25.setUpSimpleProblemSizeOneNPoint = function() {
    gph25.graphH = document.getElementById('simple-problem-size1-n-point-graphHolder')
    defaultGraphOptions["xmax"] = 1.1
    defaultGraphOptions["ymax"] = 1.1
    defaultGraphOptions["xmin"] = 0.4
    defaultGraphOptions["ymin"] = 0.4
    
    viewX.addGraph(gph25.graphH, "simple-problem-size1-n-point-graph", defaultGraphOptions)

    defaultGraphOptions["ymajorgridlinesvisibility"] = "no"
    defaultGraphOptions["xmajorgridlinesvisibility"] = "no"

    rectOptions = { x: 0, y: 1, w: 1, h: 1, stroke: "var(--lightYellow)", strokewidth: 2, rectcolor: "hsla(190, 100%, 50%, 0)", strokedasharray: "3, 4", opacity: 0.05};

    viewX.addRectangle("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-unit-square", rectOptions);

    pointOnSquare = pickAPointOnSquare([0.8, 0.6])

    lineOptions = { x1: 1, y1: 0.5, x2: 1, y2: 1, strokewidth: 4, linecolor: "var(--brightYellow)", opacity: 1};
    viewX.addLine("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-AB-line", lineOptions);

    pointOptions = { x: 0.5, y: 0.5, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightBlue)'};
    viewX.addPoint("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-center-C", pointOptions);
    textOptions = {x: 0.5 + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: 0.5 - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "C",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightBlue)"};
    viewX.addText("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-center-C-label", textOptions);

    var arrowOptions = {
        from: [1, 0.4],
        to: [0.5, 0.4],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-unit-length-bottom-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [0.5, 0.4],
        to: [1, 0.4],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-unit-length-bottom-arrow-2", arrowOptions);

    textOptions = {x: 0.75, y: 0.5 - 0.15, text: "1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--writingGrey)", opacity: 1};
    viewX.addText("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-unit-length-bottom-label", textOptions);

    
    gph25.additionalSetup();


    

}

gph25.additionalSetup = function() {
    gph25.numberOfPoints = parseInt(gph25.pointsNumberslider.value)
    for (p = 1; p < gph25.numberOfPoints; p++) {

        textOptions = {x: 1 + 0.15, y: 0.5 + (p - 1)*(0.5/(gph25.numberOfPoints - 1)) + (0.25/(gph25.numberOfPoints - 1)), text: "1/" + (gph25.numberOfPoints - 1),  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--writingGrey)", opacity: 1};
        viewX.addText("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-unit-length-side-label-" + p, textOptions);
        
        var arrowOptions = {
            from: [1.1, 0.5 + (p - 1)*(0.5/(gph25.numberOfPoints - 1))],
            to: [1.1, 0.5 + p*(0.5/(gph25.numberOfPoints - 1))],
            strokewidth: 0.4,
            arrowcolor: "var(--writingGrey)",
            opacity: 0.3
        };
        arrow = viewX.addArrow("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-unit-length-side-1st-arrow-" + p, arrowOptions);

        var arrowOptions = {
            from: [1.1, 0.5 + p*(0.5/(gph25.numberOfPoints - 1))],
            to: [1.1, 0.5 + (p - 1)*(0.5/(gph25.numberOfPoints - 1))],
            strokewidth: 0.4,
            arrowcolor: "var(--writingGrey)",
            opacity: 0.3
        };
        arrow = viewX.addArrow("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-unit-length-side-2nd-arrow-" + p, arrowOptions);
    }

    for (p = 0; p < gph25.numberOfPoints; p++) {
        pointPlacement = [1, 0.5 + p*(0.5/(gph25.numberOfPoints - 1))]
        lineOptions = { x1: 0.5, y1: 0.5, x2: pointPlacement[0], y2: pointPlacement[1], strokedasharray: "2,2", strokewidth: 0.7, linecolor: "var(--lightPink)", opacity: 0.5};
        viewX.addLine("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-distance-line-" + (p + 1), lineOptions);

        pointOptions = { x: pointPlacement[0], y: pointPlacement[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPink)', opacity: 1};
        viewX.addPoint("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-" + (p + 1), pointOptions);

        textOptions = {x: pointPlacement[0] + 0.2*upcApp.parabolicCircleGraph["point-label-gap"], y: pointPlacement[1] - upcApp.parabolicCircleGraph["point-label-gap"]*0.2, text: "Q" + (p + 1),  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.8, fontFamily: "Raleway",   textcolor: "var(--lightPink)", opacity: 0.5};
        viewX.addText("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-label-" + (p + 1), textOptions);

    
        textOptions = {x: (pointPlacement[0] + 0.5)/2 - 0.1*upcApp.parabolicCircleGraph["point-label-gap"], y: (pointPlacement[1] + 0.5)/2 + 0.1*upcApp.parabolicCircleGraph["point-label-gap"], text: (viewX.distF(pointPlacement, [0.5, 0.5])*2).toFixed(2),  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightPink)", opacity: 0.5};
        viewX.addText("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-distance-text-label-" + (p + 1), textOptions);
    }

    gph25.pointsNumbersliderLabel.innerHTML = "Number of <span class='p-lightPink'>points</span>: " + gph25.pointsNumberslider.value


    gph25.animationGenerator(); 
    pauseAutoplaygph25()

    gph25.interval = setInterval(gph25.nextValue, 2000);
}

gph25.deleteAdditionalSetup = function() {
    
    gph25.numberOfPoints = parseInt(gph25.pointsNumberslider.value)

    for (p = 1; p < parseInt(gph25.pointsNumberslider.max); p++) {
        viewX.removeText("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-unit-length-side-label-" + p);
        viewX.removeArrow("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-unit-length-side-1st-arrow-" + p);
        viewX.removeArrow("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-unit-length-side-2nd-arrow-" + p);
    }

    for (p = 0; p < parseInt(gph25.pointsNumberslider.max); p++) {
        viewX.removeLine("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-distance-line-" + (p + 1));
        viewX.removePoint("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-" + (p + 1));
        viewX.removeText("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-label-" + (p + 1));
        viewX.removeText("simple-problem-size1-n-point-graph", "simple-problem-size1-n-point-distance-text-label-" + (p + 1));
    }

}




var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "white",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "white",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-n-point-Slider");

gph25.slider = document.getElementById("simple-problem-size1-n-point-Slider");
gph25.sliderLabel = document.getElementById("simple-problem-size1-n-point-SliderInfo")


var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPurple)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPurple)",
    opacity: 0.7
};
viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-n-point-selection-Slider");

gph25.pointsNumberslider = document.getElementById("simple-problem-size1-n-point-selection-Slider");
gph25.pointsNumbersliderLabel = document.getElementById("simple-problem-size1-n-point-selection-SliderInfo")

gph25.pointsNumberslider.addEventListener('input', function() {
    
    gph25.deleteAdditionalSetup()
    gph25.additionalSetup()
});

gph25.sliderAnimationOptions = {}

gph25.animationGenerator = function() {
    stems = ["simple-problem-size1-n-point-", "simple-problem-size1-n-point-label-", "simple-problem-size1-n-point-distance-line-", "simple-problem-size1-n-point-distance-text-label-"]

    gph25.sliderAnimationOptions.keyframes = {}

    frameNumber = 0
    
    gph25.sliderAnimationOptions.keyframes[frameNumber.toString()] = {}
    for (k = 1; k <= gph25.numberOfPoints; k++ ) {
        for (s = 0; s < stems.length; s++) {
            stem = stems[s]
            gph25.sliderAnimationOptions.keyframes[frameNumber.toString()]["ob-" + k + "-" + s] = {
                'graph': 'simple-problem-size1-n-point-graph',
                'object': stems[s] + k.toString(), 
                'options': { opacity: 0}
            }
        }
    }

    for (k = 1; k <= gph25.numberOfPoints; k++ ) {
        for (s = 0; s < stems.length; s++) {
            stem = stems[s]
            frameNumber = frameNumber + 1
            gph25.sliderAnimationOptions.keyframes[frameNumber.toString()] = {}

            opacityToSet = 0.5
            if (s == 0) {
                opacityToSet = 1
            }
            gph25.sliderAnimationOptions.keyframes[frameNumber.toString()]["ob-" + k + "-" + s] = {
                'graph': 'simple-problem-size1-n-point-graph',
                'object': stems[s] + k.toString(), 
                'options': { opacity: opacityToSet}
            }

            gph25.sliderAnimationOptions.keyframes[(frameNumber - 1).toString()]["ob-" + k + "-" + s] = {
                'graph': 'simple-problem-size1-n-point-graph',
                'object': stems[s] + k.toString(), 
                'options': { opacity: 0}
            }
        }
    }

    gph25.slider.max = gph25.numberOfPoints*4  

    viewX.addAnimation('simple-problem-size1-n-point-animation', gph25.sliderAnimationOptions)

    gph25.messageOfSteps = []

    gph25.messageOfSteps.push('Shall we begin? :)')

    for (p = 1; p <= gph25.numberOfPoints; p++) {
        pointPlacement = [1, 0.5 + (p - 1)*(0.5/(gph25.numberOfPoints - 1))]
        gph25.messageOfSteps.push('Let\'s pick point <span class="p-lightPink">Q<sub>' + p + '</sub></span>. ')
        gph25.messageOfSteps.push('Let\'s pick point <span class="p-lightPink">Q<sub>' + p + '</sub></span>. ')
        gph25.messageOfSteps.push('It is at a distance of ' + (viewX.distF([0.5, 0.5], pointPlacement)*2).toFixed(2) + ' from C. ')
        gph25.messageOfSteps.push('CQ<sub>' + p + '</sub> = <span class="p-lightPink">' + (viewX.distF([0.5, 0.5], pointPlacement)*2).toFixed(2) + '</span> ')
    }
}

gph25.messageOfSteps = []

gph25.slider.step = 1
gph25.slider.min = 0
gph25.slider.max = parseInt(gph25.pointsNumberslider.value)*4  


gph25.slider.addEventListener('input', function() {
    gph25.sliderLabel.innerHTML = gph25.messageOfSteps[parseInt(gph25.slider.value)]
    viewX.playAnimationToFrame('simple-problem-size1-n-point-animation', parseInt(gph25.slider.value), 1)
});

function pauseAutoplaygph25() {
    clearInterval(gph25.interval);
}

gph25.slider.addEventListener('mouseover', pauseAutoplaygph25);
gph25.slider.addEventListener('touchstart', pauseAutoplaygph25);

gph25.nextValue = function() {
    gph25.slider.value = parseInt(gph25.slider.value) + 1
    if (gph25.slider.value == gph25.slider.max) {
        gph25.slider.value = 1
    }
    gph25.sliderLabel.innerHTML = gph25.messageOfSteps[parseInt(gph25.slider.value)]
    viewX.playAnimationToFrame('simple-problem-size1-n-point-animation', parseInt(gph25.slider.value), 2)
}




// graph 26 : simple problem size 1 - two point

gph26 = {}
gph26.samples = {}

gph26.generateSampleData = function(numberOfSamples, center=[0, 0], sideLength=2 ) {

    condition = {}

    // Picking Samples

    condition.samples = {}
    condition.globalValues = {}
    condition.globalValues.center = center
    condition.globalValues.sideLength = sideLength
    condition.globalValues.numberOfSamples = numberOfSamples
    condition.globalValues.distanceBetweenSamples = 0.5*sideLength/(numberOfSamples - 1)

    for (sm = 0; sm < numberOfSamples; sm++) {
        condition.samples[sm] = {}
        condition.samples[sm].point = viewX.addVec(viewX.addVec(center, [sideLength/2, 0]), [0, condition.globalValues.distanceBetweenSamples*sm])

        condition.samples[sm].name = "Q" + (sm + 1)
        condition.samples[sm].color = "var(--lightOrange)"
        if (sm % 2 == 0) {
            condition.samples[sm].color = "var(--lightPink)"
        }
        
        condition.samples[sm].distanceLabel = viewX.distF(center, condition.samples[sm].point).toFixed(2)
    }

    // On Addition, where the lines go to. 

    pointVector = center
    for (sm = 0; sm < numberOfSamples; sm++) {
        pointVector = viewX.addVec(pointVector,  viewX.subtractVec(condition.samples[sm].point, center))
        condition.samples[sm].pointOnAddition = pointVector
    }

    // Final point locations

    for (sm = 0; sm < numberOfSamples; sm++) {
        condition.samples[sm].finalPoint = viewX.addVec(center, viewX.scalarMultiplyVec(1/numberOfSamples, viewX.subtractVec(condition.samples[sm].pointOnAddition, center)))
    }

    return Object.assign({}, condition)
}


gph26.setUpSimpleProblemSizeOneTwoPointAdding = function() {
    gph26.graphH = document.getElementById('simple-problem-size1-2-point-adding-graphHolder')
    defaultGraphOptions["xmax"] = 2 + 0.1
    defaultGraphOptions["ymax"] = 2 + 0.1
    defaultGraphOptions["xmin"] = 1 - 0.1
    defaultGraphOptions["ymin"] = 1 - 0.1
    
    viewX.addGraph(gph26.graphH, "simple-problem-size1-2-point-adding-graph", defaultGraphOptions)

    defaultGraphOptions["ymajorgridlinesvisibility"] = "no"
    defaultGraphOptions["xmajorgridlinesvisibility"] = "no"

    pointOnSquare = pickAPointOnSquare([0.8, 0.6])

    lineOptions = { x1: 2, y1: 1, x2: 2, y2: 2, strokewidth: 4, linecolor: "var(--brightYellow)", opacity: 0.5};
    viewX.addLine("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-AB-line", lineOptions);

    pointOptions = { x: 1, y: 1, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightBlue)', opacity: 1};
    viewX.addPoint("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-center-C", pointOptions);

    textOptions = {x: 1 + 0.4*upcApp.parabolicCircleGraph["point-label-gap"], y: 1 - upcApp.parabolicCircleGraph["point-label-gap"]*0.5, text: "C",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightBlue)", opacity: 0.4};
    viewX.addText("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-center-C-label", textOptions);

    



    textOptions = {x: 2 + 0.3, y: 1.5, text: "1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--writingGrey)", opacity: 1};
    viewX.addText("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-unit-length-label", textOptions);

    
    var arrowOptions = {
        from: [2.2, 2],
        to: [2.2, 1],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-unit-length-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [2.2, 1],
        to: [2.2, 2],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-unit-length-arrow-2", arrowOptions);

    rectOptions = { x: 1, y: 2, w: 1, h: 1, stroke: "var(--lightYellow)", strokewidth: 2, rectcolor: "hsla(190, 100%, 50%, 0)", strokedasharray: "3, 4", opacity: 0};

    viewX.addRectangle("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-rect", rectOptions);




    gph26.condition = gph26.generateSampleData(2, [1, 1], 2)

    gph26.samples = gph26.condition.samples

    gph26.samples[1].color = "var(--lightGreen)"
    gph26.samples[1].name = "A"
    gph26.samples[0].name = "B"
    gph26.samples[1].distanceLabel = "√2"
    gph26.samples[0].distanceLabel = "1"

    for (cs = 0; cs < gph26.condition.globalValues.numberOfSamples; cs++) {
        lineOptions = { x1: gph26.condition.globalValues.center[0], y1: gph26.condition.globalValues.center[1], x2: gph26.samples[cs].point[0], y2: gph26.samples[cs].point[1], strokedasharray: "2,2", strokewidth: 1.3, linecolor: gph26.samples[cs].color};
        viewX.addLine("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-distance-line-" + (cs + 1), lineOptions);

        pointOptions = { x: gph26.samples[cs].point[0], y: gph26.samples[cs].point[1], pointsize: upcApp.graphPointSize, pointcolor: gph26.samples[cs].color, opacity: 1};
        viewX.addPoint("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-" + (cs + 1), pointOptions);

        textOptions = {x: gph26.samples[cs].point[0] + 0.2*gph26.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], y: gph26.samples[cs].point[1] - upcApp.parabolicCircleGraph["point-label-gap"]*0.2*gph26.condition.globalValues.sideLength, text: gph26.samples[cs].name,  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: gph26.samples[cs].color, opacity: 0.5};
        viewX.addText("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-label-" + (cs + 1), textOptions);

        textOptions = {x: (gph26.samples[cs].point[0] + gph26.condition.globalValues.center[0])/2 - 0.2*gph26.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], y: (gph26.samples[cs].point[1] + gph26.condition.globalValues.center[1])/2 + 0.2*gph26.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], text:gph26.samples[cs].distanceLabel,  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: gph26.samples[cs].color, opacity: 1};
        viewX.addText("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-distance-text-label-" + (cs + 1), textOptions);

        lineOptions = { x1: 0.5, y1: 0.5, x2: gph26.samples[cs].point[0], y2: gph26.samples[cs].point[1], strokedasharray: "2,2", strokewidth: 1.3, linecolor: gph26.samples[cs].color, opacity: 0};
        viewX.addLine("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-distance-line-placeholder-" + (cs + 1), lineOptions);

        pointOptions = { x: gph26.samples[cs].point[0], y: gph26.samples[cs].point[1], pointsize: upcApp.graphPointSize, pointcolor: gph26.samples[cs].color, opacity: 0};
        viewX.addPoint("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-placeholder-" + (cs + 1), pointOptions);
    }

}

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPurple)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPurple)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-2-point-adding-Slider");

gph26.slider = document.getElementById("simple-problem-size1-2-point-adding-Slider");

gph26.slider.step = 0.001
gph26.slider.min = 0
gph26.slider.max = 1

gph26.addCurve = function() {
    
    gph26.scaleX = viewX.linearValue(0, 1, 1, 1/gph26.condition.globalValues.numberOfSamples, parseFloat(gph26.sliderForScalingX.value))

    gph26.scaleY = viewX.linearValue(0, 1, 1, 1/gph26.condition.globalValues.numberOfSamples, parseFloat(gph26.sliderForScalingY.value))

    for (cs = 0; cs < gph26.condition.globalValues.numberOfSamples; cs++) {
        gph26.moveX = viewX.linearValue(0, 1, gph26.samples[cs].point[0], gph26.samples[cs].pointOnAddition[0], parseFloat(gph26.slider.value))

        gph26.moveY = viewX.linearValue(0, 1, gph26.samples[cs].point[1], gph26.samples[cs].pointOnAddition[1], parseFloat(gph26.slider.value))

        startXY = gph26.condition.globalValues.center
        if (cs != 0) {
            startXY = gph26.samples[cs - 1].pointOnAddition
        }
        
        gph26.moveStartX = viewX.linearValue(0, 1, gph26.condition.globalValues.center[0],startXY[0], parseFloat(gph26.slider.value))

        gph26.moveStartY = viewX.linearValue(0, 1, gph26.condition.globalValues.center[1],startXY[1], parseFloat(gph26.slider.value))

        lineOptions = { x1: gph26.moveStartX, y1:  gph26.moveStartY, x2:  gph26.moveX, y2:  gph26.moveY};

        viewX.updateLine("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-distance-line-placeholder-" + (cs + 1), lineOptions);

        scaledPoints = pointsScaled([[gph26.moveStartX, gph26.moveStartY], [gph26.moveX, gph26.moveY]], gph26.scaleX, gph26.scaleY, gph26.condition.globalValues.center)

        lineOptions = { x1: scaledPoints[0][0], y1: scaledPoints[0][1], x2: scaledPoints[1][0], y2: scaledPoints[1][1]};

        viewX.updateLine("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-distance-line-" + (cs + 1), lineOptions);


        nameToUse = viewX.distF(scaledPoints[0], scaledPoints[1]).toFixed(2)

        textOptions = {x: (scaledPoints[0][0] + scaledPoints[1][0])/2 - 0.2*gph26.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], y: (scaledPoints[0][1] + scaledPoints[1][1])/2 + 0.2*gph26.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], text: nameToUse};
        viewX.updateText("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-distance-text-label-" + (cs + 1), textOptions);


    }

    
    if (gph26.selectedMenu == 'Scale') {

        for (cs = 0; cs < gph26.condition.globalValues.numberOfSamples; cs++) {
            lineOptions = {opacity: 0.2};
            viewX.updateLine("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-distance-line-placeholder-" + (cs + 1), lineOptions);
        }

        maxRectBounds = gph26.condition.samples[gph26.condition.globalValues.numberOfSamples - 1].pointOnAddition
        minRectBounds = gph26.condition.globalValues.center

        rectWidth = viewX.linearValue(0, 1, maxRectBounds[0] - minRectBounds[0], (maxRectBounds[0] - minRectBounds[0])/gph26.condition.globalValues.numberOfSamples, parseFloat(gph26.sliderForScalingX.value))

        rectHeight = viewX.linearValue(0, 1, maxRectBounds[1] - minRectBounds[1], (maxRectBounds[1] - minRectBounds[1])/gph26.condition.globalValues.numberOfSamples, parseFloat(gph26.sliderForScalingY.value))

        minRectBounds[0]

        rectOptions = {opacity: 0.2, w: rectWidth, h: rectHeight, x: minRectBounds[0], y: minRectBounds[1]  + rectHeight};
        viewX.updateRectangle("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-rect", rectOptions);

    }
    else if (gph26.selectedMenu == 'Add') {

        rectOptions = {opacity: 0};

        viewX.updateRectangle("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-rect", rectOptions);

        for (cs = 0; cs < gph26.condition.globalValues.numberOfSamples; cs++) {
            lineOptions = {opacity: 0};
            viewX.updateLine("simple-problem-size1-2-point-adding-graph", "simple-problem-size1-2-point-adding-distance-line-placeholder-" + (cs + 1), lineOptions);
        }
    }

}

gph26.slider.addEventListener('input', function() {
    gph26.addCurve()

    if (gph26.slider.value >= gph26.slider.max) {
        if (upcApp.revealPoint == 3) {
            upcApp.revealSection()
        }
    }
});

function pauseAutoplaygph26() {
    clearInterval(gph26.interval);
}

gph26.slider.addEventListener('mouseover', pauseAutoplaygph26);
gph26.slider.addEventListener('touchstart', pauseAutoplaygph26);

gph26.nextValue = function() {
    gph26.slider.value = parseInt(gph26.slider.value) + 0.001

    
    if (gph26.slider.value > gph26.slider.max) {
        gph26.slider.value = 0
    }
    gph26.addCurve()
}


gph26.continueButton = document.getElementById("reveal-4-continueButton");

gph26.continueButton.addEventListener('click', function() {
    if (upcApp.revealPoint == 3) {
        upcApp.revealSection()
    }
});

gph26.continueButtonA = document.getElementById("reveal-5-continueButton");
gph26.continueButtonA.addEventListener('click', function() {
    if (upcApp.revealPoint == 4) {
        upcApp.revealSection()
    }
});

gph26.selectedMenu = 'Add'
gph26.handleMenuSelect = function() {
    document.getElementById('gph26-menu-add').classList.remove('menuTopButtonSelected')
    document.getElementById('gph26-menu-scale').classList.remove('menuTopButtonSelected')
    document.getElementById('gph26-menu-add').classList.remove('menuTopButton')
    document.getElementById('gph26-menu-scale').classList.remove('menuTopButton')

        if (gph26.selectedMenu == 'Add') {
        document.getElementById('gph26-menu-add').classList.add('menuTopButtonSelected')
        document.getElementById('gph26-menu-scale').classList.add('menuTopButton')

        document.getElementById("gph26-section-add").style.display = "block";
        document.getElementById("gph26-section-scale").style.display = "none";
        }
        else if (gph26.selectedMenu == 'Scale') {
        document.getElementById('gph26-menu-scale').classList.add('menuTopButtonSelected')
        document.getElementById('gph26-menu-add').classList.add('menuTopButton')

        document.getElementById("gph26-section-add").style.display = "none";
        document.getElementById("gph26-section-scale").style.display = "block";
        }
}

gph26.handleMenuSelect();

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPurple)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPurple)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-2-point-scaling-along-y-Slider");

gph26.sliderForScalingY = document.getElementById("simple-problem-size1-2-point-scaling-along-y-Slider");

viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-2-point-scaling-along-x-Slider");

gph26.sliderForScalingX = document.getElementById("simple-problem-size1-2-point-scaling-along-x-Slider");

gph26.sliderForScalingX.addEventListener('input', function() {
    gph26.addCurve()

    if (gph26.sliderForScalingX.value >= gph26.sliderForScalingX.max && gph26.sliderForScalingY.value >= gph26.sliderForScalingY.max) {
        if (upcApp.revealPoint == 4) {
            upcApp.revealSection()
        }
    }
});

gph26.sliderForScalingY.addEventListener('input', function() {
    gph26.addCurve()

    if (gph26.sliderForScalingX.value >= gph26.sliderForScalingX.max && gph26.sliderForScalingY.value >= gph26.sliderForScalingY.max) {
        if (upcApp.revealPoint == 4) {
            upcApp.revealSection()
        }
    }
});


// graph 27 : simple problem size 1 - three point

gph27 = {}
gph27.samples = {}

gph27.setUpSimpleProblemSizeOneThreePointAdding = function() {
    gph27.graphH = document.getElementById('simple-problem-size1-3-point-adding-graphHolder')
    defaultGraphOptions["xmax"] = 2 + 0.1
    defaultGraphOptions["ymax"] = 2 + 0.1
    defaultGraphOptions["xmin"] = 1 - 0.1
    defaultGraphOptions["ymin"] = 1 - 0.1
    
    viewX.addGraph(gph27.graphH, "simple-problem-size1-3-point-adding-graph", defaultGraphOptions)

    defaultGraphOptions["ymajorgridlinesvisibility"] = "no"
    defaultGraphOptions["xmajorgridlinesvisibility"] = "no"

    pointOnSquare = pickAPointOnSquare([0.8, 0.6])

    lineOptions = { x1: 2, y1: 1, x2: 2, y2: 2, strokewidth: 4, linecolor: "var(--brightYellow)", opacity: 0.5};
    viewX.addLine("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-AB-line", lineOptions);

    pointOptions = { x: 1, y: 1, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightBlue)', opacity: 1};
    viewX.addPoint("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-center-C", pointOptions);

    textOptions = {x: 1 + 0.4*upcApp.parabolicCircleGraph["point-label-gap"], y: 1 - upcApp.parabolicCircleGraph["point-label-gap"]*0.5, text: "C",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightBlue)", opacity: 0.4};
    viewX.addText("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-center-C-label", textOptions);

    



    textOptions = {x: 2 + 0.3, y: 1.5, text: "1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--writingGrey)", opacity: 1};
    viewX.addText("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-unit-length-label", textOptions);

    
    var arrowOptions = {
        from: [2.2, 2],
        to: [2.2, 1],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-unit-length-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [2.2, 1],
        to: [2.2, 2],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-unit-length-arrow-2", arrowOptions);

    rectOptions = { x: 1, y: 2, w: 1, h: 1, stroke: "var(--lightYellow)", strokewidth: 2, rectcolor: "hsla(190, 100%, 50%, 0)", strokedasharray: "3, 4", opacity: 0};

    viewX.addRectangle("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-rect", rectOptions);




    gph27.condition = gph26.generateSampleData(3, [1, 1], 2)

    gph27.samples = gph27.condition.samples

    gph27.samples[2].color = "var(--lightGreen)"
    gph27.samples[2].name = "A"
    gph27.samples[0].name = "B"
    gph27.samples[2].distanceLabel = "√2"
    gph27.samples[0].distanceLabel = "1"

    gph27.samples[1].name = "Q"
    gph27.samples[1].color = "var(--lightOrange)"
    gph27.samples[1].distanceLabel = "√2 / 2"

    for (cs = 0; cs < gph27.condition.globalValues.numberOfSamples; cs++) {
        lineOptions = { x1: gph27.condition.globalValues.center[0], y1: gph27.condition.globalValues.center[1], x2: gph27.samples[cs].point[0], y2: gph27.samples[cs].point[1], strokedasharray: "2,2", strokewidth: 1.3, linecolor: gph27.samples[cs].color};
        viewX.addLine("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-distance-line-" + (cs + 1), lineOptions);

        pointOptions = { x: gph27.samples[cs].point[0], y: gph27.samples[cs].point[1], pointsize: upcApp.graphPointSize, pointcolor: gph27.samples[cs].color, opacity: 1};
        viewX.addPoint("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-" + (cs + 1), pointOptions);

        textOptions = {x: gph27.samples[cs].point[0] + 0.2*gph27.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], y: gph27.samples[cs].point[1] - upcApp.parabolicCircleGraph["point-label-gap"]*0.2*gph27.condition.globalValues.sideLength, text: gph27.samples[cs].name,  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: gph27.samples[cs].color, opacity: 0.5};
        viewX.addText("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-label-" + (cs + 1), textOptions);

        textOptions = {x: (gph27.samples[cs].point[0] + gph27.condition.globalValues.center[0])/2 - 0.2*gph27.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], y: (gph27.samples[cs].point[1] + gph27.condition.globalValues.center[1])/2 + 0.2*gph27.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], text:gph27.samples[cs].distanceLabel,  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: gph27.samples[cs].color, opacity: 1};
        viewX.addText("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-distance-text-label-" + (cs + 1), textOptions);

        lineOptions = { x1: 0.5, y1: 0.5, x2: gph27.samples[cs].point[0], y2: gph27.samples[cs].point[1], strokedasharray: "2,2", strokewidth: 1.3, linecolor: gph27.samples[cs].color, opacity: 0};
        viewX.addLine("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-distance-line-placeholder-" + (cs + 1), lineOptions);

        pointOptions = { x: gph27.samples[cs].point[0], y: gph27.samples[cs].point[1], pointsize: upcApp.graphPointSize, pointcolor: gph27.samples[cs].color, opacity: 0};
        viewX.addPoint("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-placeholder-" + (cs + 1), pointOptions);
    }

}

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPurple)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPurple)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-3-point-adding-Slider");

gph27.slider = document.getElementById("simple-problem-size1-3-point-adding-Slider");

gph27.slider.step = 0.001
gph27.slider.min = 0
gph27.slider.max = 1

gph27.addCurve = function() {
    
    gph27.scaleX = viewX.linearValue(0, 1, 1, 1/gph27.condition.globalValues.numberOfSamples, parseFloat(gph27.sliderForScalingX.value))

    gph27.scaleY = viewX.linearValue(0, 1, 1, 1/gph27.condition.globalValues.numberOfSamples, parseFloat(gph27.sliderForScalingY.value))

    for (cs = 0; cs < gph27.condition.globalValues.numberOfSamples; cs++) {
        gph27.moveX = viewX.linearValue(0, 1, gph27.samples[cs].point[0], gph27.samples[cs].pointOnAddition[0], parseFloat(gph27.slider.value))

        gph27.moveY = viewX.linearValue(0, 1, gph27.samples[cs].point[1], gph27.samples[cs].pointOnAddition[1], parseFloat(gph27.slider.value))

        startXY = gph27.condition.globalValues.center
        if (cs != 0) {
            startXY = gph27.samples[cs - 1].pointOnAddition
        }
        
        gph27.moveStartX = viewX.linearValue(0, 1, gph27.condition.globalValues.center[0],startXY[0], parseFloat(gph27.slider.value))

        gph27.moveStartY = viewX.linearValue(0, 1, gph27.condition.globalValues.center[1],startXY[1], parseFloat(gph27.slider.value))

        lineOptions = { x1: gph27.moveStartX, y1:  gph27.moveStartY, x2:  gph27.moveX, y2:  gph27.moveY};

        viewX.updateLine("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-distance-line-placeholder-" + (cs + 1), lineOptions);

        scaledPoints = pointsScaled([[gph27.moveStartX, gph27.moveStartY], [gph27.moveX, gph27.moveY]], gph27.scaleX, gph27.scaleY, gph27.condition.globalValues.center)

        lineOptions = { x1: scaledPoints[0][0], y1: scaledPoints[0][1], x2: scaledPoints[1][0], y2: scaledPoints[1][1]};

        viewX.updateLine("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-distance-line-" + (cs + 1), lineOptions);


        nameToUse = viewX.distF(scaledPoints[0], scaledPoints[1]).toFixed(2)

        textOptions = {x: (scaledPoints[0][0] + scaledPoints[1][0])/2 - 0.2*gph27.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], y: (scaledPoints[0][1] + scaledPoints[1][1])/2 + 0.2*gph27.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], text: nameToUse};
        viewX.updateText("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-distance-text-label-" + (cs + 1), textOptions);


    }

    
    if (gph27.selectedMenu == 'Scale') {

        for (cs = 0; cs < gph27.condition.globalValues.numberOfSamples; cs++) {
            lineOptions = {opacity: 0.2};
            viewX.updateLine("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-distance-line-placeholder-" + (cs + 1), lineOptions);
        }

        maxRectBounds = gph27.condition.samples[gph27.condition.globalValues.numberOfSamples - 1].pointOnAddition
        minRectBounds = gph27.condition.globalValues.center

        rectWidth = viewX.linearValue(0, 1, maxRectBounds[0] - minRectBounds[0], (maxRectBounds[0] - minRectBounds[0])/gph27.condition.globalValues.numberOfSamples, parseFloat(gph27.sliderForScalingX.value))

        rectHeight = viewX.linearValue(0, 1, maxRectBounds[1] - minRectBounds[1], (maxRectBounds[1] - minRectBounds[1])/gph27.condition.globalValues.numberOfSamples, parseFloat(gph27.sliderForScalingY.value))

        minRectBounds[0]

        rectOptions = {opacity: 0.2, w: rectWidth, h: rectHeight, x: minRectBounds[0], y: minRectBounds[1]  + rectHeight};
        viewX.updateRectangle("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-rect", rectOptions);

    }
    else if (gph27.selectedMenu == 'Add') {

        rectOptions = {opacity: 0};

        viewX.updateRectangle("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-rect", rectOptions);

        for (cs = 0; cs < gph27.condition.globalValues.numberOfSamples; cs++) {
            lineOptions = {opacity: 0};
            viewX.updateLine("simple-problem-size1-3-point-adding-graph", "simple-problem-size1-3-point-adding-distance-line-placeholder-" + (cs + 1), lineOptions);
        }
    }

}


gph27.slider.addEventListener('input', function() {
    gph27.addCurve()

    if (gph27.slider.value >= gph27.slider.max) {
        if (upcApp.revealPoint == 5) {
            upcApp.revealSection()
        }
    }
});

function pauseAutoplaygph27() {
    clearInterval(gph27.interval);
}

gph27.slider.addEventListener('mouseover', pauseAutoplaygph27);
gph27.slider.addEventListener('touchstart', pauseAutoplaygph27);

gph27.nextValue = function() {
    gph27.slider.value = parseInt(gph27.slider.value) + 0.001

    
    if (gph27.slider.value > gph27.slider.max) {
        gph27.slider.value = 0
    }
    gph27.addCurve()
}


gph27.continueButton = document.getElementById("reveal-6-continueButton");

gph27.continueButton.addEventListener('click', function() {
    if (upcApp.revealPoint == 5) {
        upcApp.revealSection()
    }
});

gph27.continueButtonA = document.getElementById("reveal-7-continueButton");
gph27.continueButtonA.addEventListener('click', function() {
    if (upcApp.revealPoint == 6) {
        upcApp.revealSection()
    }
});

gph27.selectedMenu = 'Add'
gph27.handleMenuSelect = function() {
    document.getElementById('gph27-menu-add').classList.remove('menuTopButtonSelected')
    document.getElementById('gph27-menu-scale').classList.remove('menuTopButtonSelected')
    document.getElementById('gph27-menu-add').classList.remove('menuTopButton')
    document.getElementById('gph27-menu-scale').classList.remove('menuTopButton')

        if (gph27.selectedMenu == 'Add') {
        document.getElementById('gph27-menu-add').classList.add('menuTopButtonSelected')
        document.getElementById('gph27-menu-scale').classList.add('menuTopButton')

        document.getElementById("gph27-section-add").style.display = "block";
        document.getElementById("gph27-section-scale").style.display = "none";
        }
        else if (gph27.selectedMenu == 'Scale') {
        document.getElementById('gph27-menu-scale').classList.add('menuTopButtonSelected')
        document.getElementById('gph27-menu-add').classList.add('menuTopButton')

        document.getElementById("gph27-section-add").style.display = "none";
        document.getElementById("gph27-section-scale").style.display = "block";
        }
}

gph27.handleMenuSelect();

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPurple)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPurple)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-3-point-scaling-along-y-Slider");

gph27.sliderForScalingY = document.getElementById("simple-problem-size1-3-point-scaling-along-y-Slider");

viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-3-point-scaling-along-x-Slider");

gph27.sliderForScalingX = document.getElementById("simple-problem-size1-3-point-scaling-along-x-Slider");

gph27.sliderForScalingX.addEventListener('input', function() {
    gph27.addCurve()

    if (gph27.sliderForScalingX.value >= gph27.sliderForScalingX.max && gph27.sliderForScalingY.value >= gph27.sliderForScalingY.max) {
        if (upcApp.revealPoint == 6) {
            upcApp.revealSection()
        }
    }
});

gph27.sliderForScalingY.addEventListener('input', function() {
    gph27.addCurve()

    if (gph27.sliderForScalingX.value >= gph27.sliderForScalingX.max && gph27.sliderForScalingY.value >= gph27.sliderForScalingY.max) {
        if (upcApp.revealPoint == 6) {
            upcApp.revealSection()
        }
    }
});


// graph 28 : simple problem size 1 - four point

gph28 = {}
gph28.samples = {}

gph28.setUpSimpleProblemSizeOneFourPointAdding = function() {
    gph28.graphH = document.getElementById('simple-problem-size1-4-point-adding-graphHolder')
    defaultGraphOptions["xmax"] = 2 + 0.1
    defaultGraphOptions["ymax"] = 2 + 0.1
    defaultGraphOptions["xmin"] = 1 - 0.1
    defaultGraphOptions["ymin"] = 1 - 0.1
    
    viewX.addGraph(gph28.graphH, "simple-problem-size1-4-point-adding-graph", defaultGraphOptions)

    defaultGraphOptions["ymajorgridlinesvisibility"] = "no"
    defaultGraphOptions["xmajorgridlinesvisibility"] = "no"

    pointOnSquare = pickAPointOnSquare([0.8, 0.6])

    lineOptions = { x1: 2, y1: 1, x2: 2, y2: 2, strokewidth: 4, linecolor: "var(--brightYellow)", opacity: 0.5};
    viewX.addLine("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-AB-line", lineOptions);

    pointOptions = { x: 1, y: 1, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightBlue)', opacity: 1};
    viewX.addPoint("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-center-C", pointOptions);

    textOptions = {x: 1 + 0.4*upcApp.parabolicCircleGraph["point-label-gap"], y: 1 - upcApp.parabolicCircleGraph["point-label-gap"]*0.5, text: "C",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightBlue)", opacity: 0.4};
    viewX.addText("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-center-C-label", textOptions);

    



    textOptions = {x: 2 + 0.3, y: 1.5, text: "1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--writingGrey)", opacity: 1};
    viewX.addText("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-unit-length-label", textOptions);

    
    var arrowOptions = {
        from: [2.2, 2],
        to: [2.2, 1],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-unit-length-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [2.2, 1],
        to: [2.2, 2],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-unit-length-arrow-2", arrowOptions);

    rectOptions = { x: 1, y: 2, w: 1, h: 1, stroke: "var(--lightYellow)", strokewidth: 2, rectcolor: "hsla(190, 100%, 50%, 0)", strokedasharray: "3, 4", opacity: 0};

    viewX.addRectangle("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-rect", rectOptions);




    gph28.condition = gph26.generateSampleData(4, [1, 1], 2)

    gph28.samples = gph28.condition.samples

    gph28.samples[3].color = "var(--lightGreen)"
    gph28.samples[3].name = "A"
    gph28.samples[0].name = "B"
    gph28.samples[3].distanceLabel = "√2"
    gph28.samples[0].distanceLabel = "1"

    gph28.samples[1].name = "Q"
    gph28.samples[1].color = "var(--lightOrange)"

    gph28.samples[2].name = "K"
    gph28.samples[2].color = "var(--lightOrange)"

    for (cs = 0; cs < gph28.condition.globalValues.numberOfSamples; cs++) {
        lineOptions = { x1: gph28.condition.globalValues.center[0], y1: gph28.condition.globalValues.center[1], x2: gph28.samples[cs].point[0], y2: gph28.samples[cs].point[1], strokedasharray: "2,2", strokewidth: 1.3, linecolor: gph28.samples[cs].color};
        viewX.addLine("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-distance-line-" + (cs + 1), lineOptions);

        pointOptions = { x: gph28.samples[cs].point[0], y: gph28.samples[cs].point[1], pointsize: upcApp.graphPointSize, pointcolor: gph28.samples[cs].color, opacity: 1};
        viewX.addPoint("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-" + (cs + 1), pointOptions);

        textOptions = {x: gph28.samples[cs].point[0] + 0.2*gph28.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], y: gph28.samples[cs].point[1] - upcApp.parabolicCircleGraph["point-label-gap"]*0.2*gph28.condition.globalValues.sideLength, text: gph28.samples[cs].name,  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: gph28.samples[cs].color, opacity: 0.5};
        viewX.addText("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-label-" + (cs + 1), textOptions);

        textOptions = {x: (gph28.samples[cs].point[0] + gph28.condition.globalValues.center[0])/2 - 0.2*gph28.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], y: (gph28.samples[cs].point[1] + gph28.condition.globalValues.center[1])/2 + 0.2*gph28.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], text:gph28.samples[cs].distanceLabel,  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: gph28.samples[cs].color, opacity: 1};
        viewX.addText("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-distance-text-label-" + (cs + 1), textOptions);

        lineOptions = { x1: 0.5, y1: 0.5, x2: gph28.samples[cs].point[0], y2: gph28.samples[cs].point[1], strokedasharray: "2,2", strokewidth: 1.3, linecolor: gph28.samples[cs].color, opacity: 0};
        viewX.addLine("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-distance-line-placeholder-" + (cs + 1), lineOptions);

        pointOptions = { x: gph28.samples[cs].point[0], y: gph28.samples[cs].point[1], pointsize: upcApp.graphPointSize, pointcolor: gph28.samples[cs].color, opacity: 0};
        viewX.addPoint("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-placeholder-" + (cs + 1), pointOptions);
    }

}

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPurple)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPurple)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-4-point-adding-Slider");

gph28.slider = document.getElementById("simple-problem-size1-4-point-adding-Slider");

gph28.slider.step = 0.001
gph28.slider.min = 0
gph28.slider.max = 1
gph28.slider.value = 0

gph28.addCurve = function() {
    
    gph28.scaleX = viewX.linearValue(0, 1, 1, 1/gph28.condition.globalValues.numberOfSamples, parseFloat(gph28.sliderForScalingX.value))

    gph28.scaleY = viewX.linearValue(0, 1, 1, 1/gph28.condition.globalValues.numberOfSamples, parseFloat(gph28.sliderForScalingY.value))

    for (cs = 0; cs < gph28.condition.globalValues.numberOfSamples; cs++) {
        gph28.moveX = viewX.linearValue(0, 1, gph28.samples[cs].point[0], gph28.samples[cs].pointOnAddition[0], parseFloat(gph28.slider.value))

        gph28.moveY = viewX.linearValue(0, 1, gph28.samples[cs].point[1], gph28.samples[cs].pointOnAddition[1], parseFloat(gph28.slider.value))

        startXY = gph28.condition.globalValues.center
        if (cs != 0) {
            startXY = gph28.samples[cs - 1].pointOnAddition
        }
        
        gph28.moveStartX = viewX.linearValue(0, 1, gph28.condition.globalValues.center[0],startXY[0], parseFloat(gph28.slider.value))

        gph28.moveStartY = viewX.linearValue(0, 1, gph28.condition.globalValues.center[1],startXY[1], parseFloat(gph28.slider.value))

        lineOptions = { x1: gph28.moveStartX, y1:  gph28.moveStartY, x2:  gph28.moveX, y2:  gph28.moveY};

        viewX.updateLine("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-distance-line-placeholder-" + (cs + 1), lineOptions);

        scaledPoints = pointsScaled([[gph28.moveStartX, gph28.moveStartY], [gph28.moveX, gph28.moveY]], gph28.scaleX, gph28.scaleY, gph28.condition.globalValues.center)

        lineOptions = { x1: scaledPoints[0][0], y1: scaledPoints[0][1], x2: scaledPoints[1][0], y2: scaledPoints[1][1]};

        viewX.updateLine("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-distance-line-" + (cs + 1), lineOptions);


        nameToUse = viewX.distF(scaledPoints[0], scaledPoints[1]).toFixed(2)

        textOptions = {x: (scaledPoints[0][0] + scaledPoints[1][0])/2 - 0.2*gph28.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], y: (scaledPoints[0][1] + scaledPoints[1][1])/2 + 0.2*gph28.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], text: nameToUse};
        viewX.updateText("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-distance-text-label-" + (cs + 1), textOptions);


    }

    
    if (gph28.selectedMenu == 'Scale') {

        for (cs = 0; cs < gph28.condition.globalValues.numberOfSamples; cs++) {
            lineOptions = {opacity: 0.2};
            viewX.updateLine("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-distance-line-placeholder-" + (cs + 1), lineOptions);
        }

        maxRectBounds = gph28.condition.samples[gph28.condition.globalValues.numberOfSamples - 1].pointOnAddition
        minRectBounds = gph28.condition.globalValues.center

        rectWidth = viewX.linearValue(0, 1, maxRectBounds[0] - minRectBounds[0], (maxRectBounds[0] - minRectBounds[0])/gph28.condition.globalValues.numberOfSamples, parseFloat(gph28.sliderForScalingX.value))

        rectHeight = viewX.linearValue(0, 1, maxRectBounds[1] - minRectBounds[1], (maxRectBounds[1] - minRectBounds[1])/gph28.condition.globalValues.numberOfSamples, parseFloat(gph28.sliderForScalingY.value))

        rectOptions = {opacity: 0.2, w: rectWidth, h: rectHeight, x: minRectBounds[0], y: minRectBounds[1]  + rectHeight};
        viewX.updateRectangle("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-rect", rectOptions);

    }
    else if (gph28.selectedMenu == 'Add') {

        // rectOptions = {opacity: 0};

        // viewX.updateRectangle("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-rect", rectOptions);

        for (cs = 0; cs < gph28.condition.globalValues.numberOfSamples; cs++) {
            lineOptions = {opacity: 0};
            viewX.updateLine("simple-problem-size1-4-point-adding-graph", "simple-problem-size1-4-point-adding-distance-line-placeholder-" + (cs + 1), lineOptions);
        }
    }

}


gph28.slider.addEventListener('input', function() {
    gph28.addCurve()

    if (gph28.slider.value >= gph28.slider.max) {
        if (upcApp.revealPoint == 8) {
            upcApp.revealSection()
        }
    }
});

function pauseAutoplaygph28() {
    clearInterval(gph28.interval);
}

gph28.slider.addEventListener('mouseover', pauseAutoplaygph28);
gph28.slider.addEventListener('touchstart', pauseAutoplaygph28);

gph28.nextValue = function() {
    gph28.sliderForScalingX.value = parseFloat(gph28.sliderForScalingX.value) + 0.01

    if (gph28.sliderForScalingX.value > gph28.sliderForScalingX.max) {
        gph28.sliderForScalingX.value = 0
    }
    gph28.addCurve()
}


gph28.continueButton = document.getElementById("reveal-8-continueButton");

gph28.continueButton.addEventListener('click', function() {
    if (upcApp.revealPoint == 7) {
        upcApp.revealSection()
    }
});

gph28.continueButtonA = document.getElementById("reveal-9-continueButton");
gph28.continueButtonA.addEventListener('click', function() {
    if (upcApp.revealPoint == 8) {
        upcApp.revealSection()
    }
});

gph28.selectedMenu = 'Scale'
gph28.handleMenuSelect = function() {
    document.getElementById('gph28-menu-add').classList.remove('menuTopButtonSelected')
    document.getElementById('gph28-menu-scale').classList.remove('menuTopButtonSelected')
    document.getElementById('gph28-menu-add').classList.remove('menuTopButton')
    document.getElementById('gph28-menu-scale').classList.remove('menuTopButton')

        if (gph28.selectedMenu == 'Add') {
        document.getElementById('gph28-menu-add').classList.add('menuTopButtonSelected')
        document.getElementById('gph28-menu-scale').classList.add('menuTopButton')

        document.getElementById("gph28-section-add").style.display = "block";
        document.getElementById("gph28-section-scale").style.display = "none";
        }
        else if (gph28.selectedMenu == 'Scale') {
        document.getElementById('gph28-menu-scale').classList.add('menuTopButtonSelected')
        document.getElementById('gph28-menu-add').classList.add('menuTopButton')

        document.getElementById("gph28-section-add").style.display = "none";
        document.getElementById("gph28-section-scale").style.display = "block";
        }
}

gph28.handleMenuSelect();

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPurple)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPurple)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-4-point-scaling-along-y-Slider");

gph28.sliderForScalingY = document.getElementById("simple-problem-size1-4-point-scaling-along-y-Slider");

viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-4-point-scaling-along-x-Slider");

gph28.sliderForScalingX = document.getElementById("simple-problem-size1-4-point-scaling-along-x-Slider");

gph28.sliderForScalingX.addEventListener('input', function() {
    gph28.addCurve()

    if (gph28.sliderForScalingX.value >= gph28.sliderForScalingX.max && gph28.sliderForScalingY.value >= gph28.sliderForScalingY.max) {
        if (upcApp.revealPoint == 7) {
            upcApp.revealSection()
        }
    }
});

gph28.sliderForScalingY.addEventListener('input', function() {
    gph28.addCurve()

    if (gph28.sliderForScalingX.value >= gph28.sliderForScalingX.max && gph28.sliderForScalingY.value >= gph28.sliderForScalingY.max) {
        if (upcApp.revealPoint == 7) {
            upcApp.revealSection()
        }
    }
});



// graph 29 : simple problem size 1 - n point

gph29 = {}
gph29.samples = {}

gph29.setUpSimpleProblemSizeOneNPointAdding = function() {
    gph29.graphH = document.getElementById('simple-problem-size1-N-point-adding-graphHolder')
    defaultGraphOptions["xmax"] = 2 + 0.1
    defaultGraphOptions["ymax"] = 2 + 0.1
    defaultGraphOptions["xmin"] = 1 - 0.1
    defaultGraphOptions["ymin"] = 1 - 0.1
    
    viewX.addGraph(gph29.graphH, "simple-problem-size1-N-point-adding-graph", defaultGraphOptions)

    defaultGraphOptions["ymajorgridlinesvisibility"] = "no"
    defaultGraphOptions["xmajorgridlinesvisibility"] = "no"

    pointOnSquare = pickAPointOnSquare([0.8, 0.6])

    lineOptions = { x1: 2, y1: 1, x2: 2, y2: 2, strokewidth: 4, linecolor: "var(--brightYellow)", opacity: 0.5};
    viewX.addLine("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-AB-line", lineOptions);

    pointOptions = { x: 1, y: 1, pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightBlue)', opacity: 1};
    viewX.addPoint("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-center-C", pointOptions);

    textOptions = {x: 1 + 0.4*upcApp.parabolicCircleGraph["point-label-gap"], y: 1 - upcApp.parabolicCircleGraph["point-label-gap"]*0.5, text: "C",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--lightBlue)", opacity: 0.4};
    viewX.addText("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-center-C-label", textOptions);

    



    textOptions = {x: 2 + 0.3, y: 1.5, text: "1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: "var(--writingGrey)", opacity: 1};
    viewX.addText("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-unit-length-label", textOptions);

    
    var arrowOptions = {
        from: [2.2, 2],
        to: [2.2, 1],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-unit-length-arrow-1", arrowOptions);

    var arrowOptions = {
        from: [2.2, 1],
        to: [2.2, 2],
        strokewidth: 0.4,
        arrowcolor: "var(--writingGrey)",
        opacity: 0.3
    };
    arrow = viewX.addArrow("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-unit-length-arrow-2", arrowOptions);

    rectOptions = { x: 1, y: 2, w: 1, h: 1, stroke: "var(--lightYellow)", strokewidth: 2, rectcolor: "hsla(190, 100%, 50%, 0)", strokedasharray: "3, 4", opacity: 0};

    viewX.addRectangle("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-rect", rectOptions);


    gph29.sampleNPoints();

}


gph29.sampleNPoints = function() {
    

    gph29.condition = gph26.generateSampleData(parseInt(gph29.slider.value), [1, 1], 2)

    gph29.samples = gph29.condition.samples

    gph29.samples[gph29.condition.globalValues.numberOfSamples - 1].color = "var(--lightGreen)"
    gph29.samples[gph29.condition.globalValues.numberOfSamples - 1].name = "A"
    gph29.samples[0].name = "B"
    gph29.samples[gph29.condition.globalValues.numberOfSamples - 1].distanceLabel = "√2"
    gph29.samples[0].distanceLabel = "1"

    for (cs = 0; cs < gph29.condition.globalValues.numberOfSamples; cs++) {

        if (gph29.condition.globalValues.numberOfSamples > 7) {
            
            gapFactor = viewX.linearValue(7, 30, 0.2, 0.01, parseFloat(gph29.slider.value))
            fontFactor = upcApp.graphFontSizeLarge*viewX.linearValue(7, 30, 1, 0.3, parseFloat(gph29.slider.value))
            pointFactor = viewX.linearValue(7, 30, 1, 0.3, parseFloat(gph29.slider.value))
        }
        else {
            gapFactor = 0.2
            fontFactor = upcApp.graphFontSizeLarge
            pointFactor = 1
        }
        

        lineOptions = { x1: gph29.condition.globalValues.center[0], y1: gph29.condition.globalValues.center[1], x2: gph29.samples[cs].point[0], y2: gph29.samples[cs].point[1], strokedasharray: "2,2", strokewidth: 1.3, linecolor: gph29.samples[cs].color};
        viewX.addLine("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-distance-line-" + (cs + 1), lineOptions);

        pointOptions = { x: gph29.samples[cs].point[0], y: gph29.samples[cs].point[1], pointsize: upcApp.graphPointSize*pointFactor, pointcolor: gph29.samples[cs].color, opacity: 1};
        viewX.addPoint("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-" + (cs + 1), pointOptions);

        



        textOptions = {x: gph29.samples[cs].point[0] + gapFactor*gph29.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], y: gph29.samples[cs].point[1] - upcApp.parabolicCircleGraph["point-label-gap"]*gapFactor*gph29.condition.globalValues.sideLength, text: gph29.samples[cs].name,  textAlign: "center",  fontSize: fontFactor, fontFamily: "Raleway",   textcolor: gph29.samples[cs].color, opacity: 0.5};
        viewX.addText("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-label-" + (cs + 1), textOptions);

        textOptions = {x: (gph29.samples[cs].point[0] + gph29.condition.globalValues.center[0])/2 - 0.2*gph29.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], y: (gph29.samples[cs].point[1] + gph29.condition.globalValues.center[1])/2 + 0.2*gph29.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], text:gph29.samples[cs].distanceLabel,  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge, fontFamily: "Raleway",   textcolor: gph29.samples[cs].color, opacity: 1};
        viewX.addText("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-distance-text-label-" + (cs + 1), textOptions);

        lineOptions = { x1: 0.5, y1: 0.5, x2: gph29.samples[cs].point[0], y2: gph29.samples[cs].point[1], strokedasharray: "2,2", strokewidth: 1.3, linecolor: gph29.samples[cs].color, opacity: 0};
        viewX.addLine("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-distance-line-placeholder-" + (cs + 1), lineOptions);

        pointOptions = { x: gph29.samples[cs].point[0], y: gph29.samples[cs].point[1], pointsize: upcApp.graphPointSize*pointFactor, pointcolor: gph29.samples[cs].color, opacity: 0};
        viewX.addPoint("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-placeholder-" + (cs + 1), pointOptions);


    }
}

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPurple)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPurple)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-N-point-selections-Slider");

gph29.slider = document.getElementById("simple-problem-size1-N-point-selections-Slider");
gph29.sliderInfo = document.getElementById("simple-problem-size1-N-point-selections-SliderInfo");

gph29.slider.step = 1
gph29.slider.min = 3
gph29.slider.max = 30
gph29.slider.value = 6


viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-N-point-adding-Slider");

gph29.sliderAdding = document.getElementById("simple-problem-size1-N-point-adding-Slider");

gph29.sliderAdding.step = 0.001
gph29.sliderAdding.min = 0
gph29.sliderAdding.max = 1
gph29.sliderAdding.value = 0

gph29.addCurve = function() {
    
    gph29.scaleX = viewX.linearValue(0, 1, 1, 1/gph29.condition.globalValues.numberOfSamples, parseFloat(gph29.sliderForScalingX.value))

    gph29.scaleY = viewX.linearValue(0, 1, 1, 1/gph29.condition.globalValues.numberOfSamples, parseFloat(gph29.sliderForScalingY.value))

    for (cs = 0; cs < gph29.condition.globalValues.numberOfSamples; cs++) {
        gph29.moveX = viewX.linearValue(0, 1, gph29.samples[cs].point[0], gph29.samples[cs].pointOnAddition[0], parseFloat(gph29.sliderAdding.value))

        gph29.moveY = viewX.linearValue(0, 1, gph29.samples[cs].point[1], gph29.samples[cs].pointOnAddition[1], parseFloat(gph29.sliderAdding.value))

        startXY = gph29.condition.globalValues.center
        if (cs != 0) {
            startXY = gph29.samples[cs - 1].pointOnAddition
        }
        
        gph29.moveStartX = viewX.linearValue(0, 1, gph29.condition.globalValues.center[0],startXY[0], parseFloat(gph29.sliderAdding.value))

        gph29.moveStartY = viewX.linearValue(0, 1, gph29.condition.globalValues.center[1],startXY[1], parseFloat(gph29.sliderAdding.value))

        lineOptions = { x1: gph29.moveStartX, y1:  gph29.moveStartY, x2:  gph29.moveX, y2:  gph29.moveY};

        viewX.updateLine("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-distance-line-placeholder-" + (cs + 1), lineOptions);

        scaledPoints = pointsScaled([[gph29.moveStartX, gph29.moveStartY], [gph29.moveX, gph29.moveY]], gph29.scaleX, gph29.scaleY, gph29.condition.globalValues.center)

        lineOptions = { x1: scaledPoints[0][0], y1: scaledPoints[0][1], x2: scaledPoints[1][0], y2: scaledPoints[1][1]};

        viewX.updateLine("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-distance-line-" + (cs + 1), lineOptions);

        if ((gph29.condition.globalValues.numberOfSamples < 8 && gph29.sliderForScalingX.value < 0.2 && gph29.sliderForScalingY.value < 0.2) || (gph29.sliderAdding.value > 0.4 && gph29.sliderForScalingX.value < 0.5 && gph29.sliderForScalingY.value < 0.5)) {
            nameToUse = viewX.distF(scaledPoints[0], scaledPoints[1]).toFixed(2)
        }
        else {
            nameToUse = " "
        }
        

        textOptions = {x: (scaledPoints[0][0] + scaledPoints[1][0])/2 - 0.2*gph29.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], y: (scaledPoints[0][1] + scaledPoints[1][1])/2 + 0.2*gph29.condition.globalValues.sideLength*upcApp.parabolicCircleGraph["point-label-gap"], text: nameToUse};
        viewX.updateText("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-distance-text-label-" + (cs + 1), textOptions);


    }

    
    if (gph29.selectedMenu == 'Scale') {

        for (cs = 0; cs < gph29.condition.globalValues.numberOfSamples; cs++) {
            lineOptions = {opacity: 0.2};
            viewX.updateLine("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-distance-line-placeholder-" + (cs + 1), lineOptions);
        }

        maxRectBounds = gph29.condition.samples[gph29.condition.globalValues.numberOfSamples - 1].pointOnAddition
        minRectBounds = gph29.condition.globalValues.center

        rectWidth = viewX.linearValue(0, 1, maxRectBounds[0] - minRectBounds[0], (maxRectBounds[0] - minRectBounds[0])/gph29.condition.globalValues.numberOfSamples, parseFloat(gph29.sliderForScalingX.value))

        rectHeight = viewX.linearValue(0, 1, maxRectBounds[1] - minRectBounds[1], (maxRectBounds[1] - minRectBounds[1])/gph29.condition.globalValues.numberOfSamples, parseFloat(gph29.sliderForScalingY.value))

        rectOptions = {opacity: 0.2, w: rectWidth, h: rectHeight, x: minRectBounds[0], y: minRectBounds[1]  + rectHeight};
        viewX.updateRectangle("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-rect", rectOptions);

    }
    else if (gph29.selectedMenu == 'Add') {

        // rectOptions = {opacity: 0};

        // viewX.updateRectangle("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-rect", rectOptions);

        for (cs = 0; cs < gph29.condition.globalValues.numberOfSamples; cs++) {
            lineOptions = {opacity: 0};
            viewX.updateLine("simple-problem-size1-N-point-adding-graph", "simple-problem-size1-N-point-adding-distance-line-placeholder-" + (cs + 1), lineOptions);
        }
    }

}

gph29.slider.addEventListener('input', function() {
    viewX.removeGraph("simple-problem-size1-N-point-adding-graph")
    gph29.setUpSimpleProblemSizeOneNPointAdding()
    gph29.addCurve()

    gph29.sliderInfo.innerHTML = "Sampled " + gph29.slider.value + " point" + (gph29.slider.value > 1 ? "s" : "")
});


gph29.sliderAdding.addEventListener('input', function() {
    gph29.addCurve()

    if (gph29.sliderAdding.value >= gph29.sliderAdding.max) {
        if (upcApp.revealPoint == 8) {
            upcApp.revealSection()
        }
    }
});

function pauseAutoplaygph29() {
    clearInterval(gph29.interval);
}

gph29.sliderAdding.addEventListener('mouseover', pauseAutoplaygph29);
gph29.sliderAdding.addEventListener('touchstart', pauseAutoplaygph29);

gph29.nextValue = function() {
    gph29.sliderForScalingX.value = parseFloat(gph29.sliderForScalingX.value) + 0.01

    if (gph29.sliderForScalingX.value > gph29.sliderForScalingX.max) {
        gph29.sliderForScalingX.value = 0
    }
    gph29.addCurve()
}


gph29.continueButton = document.getElementById("reveal-10-continueButton");

gph29.continueButton.addEventListener('click', function() {
    if (upcApp.revealPoint == 9) {
        upcApp.revealSection()
    }
});

gph29.continueButtonA = document.getElementById("reveal-11-continueButton");
gph29.continueButtonA.addEventListener('click', function() {
    if (upcApp.revealPoint == 10) {
        upcApp.revealSection()
    }
});

gph29.selectedMenu = 'Scale'
gph29.handleMenuSelect = function() {
    document.getElementById('gph29-menu-add').classList.remove('menuTopButtonSelected')
    document.getElementById('gph29-menu-scale').classList.remove('menuTopButtonSelected')
    document.getElementById('gph29-menu-add').classList.remove('menuTopButton')
    document.getElementById('gph29-menu-scale').classList.remove('menuTopButton')

        if (gph29.selectedMenu == 'Add') {
        document.getElementById('gph29-menu-add').classList.add('menuTopButtonSelected')
        document.getElementById('gph29-menu-scale').classList.add('menuTopButton')

        document.getElementById("gph29-section-add").style.display = "block";
        document.getElementById("gph29-section-scale").style.display = "none";
        }
        else if (gph29.selectedMenu == 'Scale') {
        document.getElementById('gph29-menu-scale').classList.add('menuTopButtonSelected')
        document.getElementById('gph29-menu-add').classList.add('menuTopButton')

        document.getElementById("gph29-section-add").style.display = "none";
        document.getElementById("gph29-section-scale").style.display = "block";
        }
}

gph29.handleMenuSelect();

var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(280, 0%, 20%, 0.7)",
    trackFillColor: "var(--lightPurple)",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "var(--lightPurple)",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-N-point-scaling-along-y-Slider");

gph29.sliderForScalingY = document.getElementById("simple-problem-size1-N-point-scaling-along-y-Slider");

gph29.sliderForScalingYInfo = document.getElementById("simple-problem-size1-N-point-scaling-along-y-SliderInfo");

viewX.generateSliderStyles(sliderProperties, "simple-problem-size1-N-point-scaling-along-x-Slider");

gph29.sliderForScalingX = document.getElementById("simple-problem-size1-N-point-scaling-along-x-Slider");

gph29.sliderForScalingXInfo = document.getElementById("simple-problem-size1-N-point-scaling-along-x-SliderInfo");

gph29.sliderForScalingX.addEventListener('input', function() {
    gph29.addCurve()

    gph29.sliderForScalingXInfo.innerHTML = "Scaling down along x by a factor of " + (1/gph29.scaleX).toFixed(2)

    if (gph29.sliderForScalingX.value >= gph29.sliderForScalingX.max && gph29.sliderForScalingY.value >= gph29.sliderForScalingY.max) {
        if (upcApp.revealPoint == 9) {
            upcApp.revealSection()
        }
    }
});

gph29.sliderForScalingY.addEventListener('input', function() {
    gph29.addCurve()

    gph29.sliderForScalingYInfo.innerHTML = "Scaling down along y by a factor of " + (1/gph29.scaleY).toFixed(2)

    if (gph29.sliderForScalingX.value >= gph29.sliderForScalingX.max && gph29.sliderForScalingY.value >= gph29.sliderForScalingY.max) {
        if (upcApp.revealPoint == 9) {
            upcApp.revealSection()
        }
    }
});



// graph 30 : pointH, CH and our curve

gph30 = {}
gph30.setUpPointHRevealGraph = function() {
    gph30.graphH = document.getElementById('pointH-reveal-graphHolder')
    defaultGraphOptions["xmax"] = upcApp.parabolicCircleGraph["xmax"]
    defaultGraphOptions["ymax"] = upcApp.parabolicCircleGraph["ymax"]/1.3
    defaultGraphOptions["xmin"] = upcApp.parabolicCircleGraph["xmin"]/6
    defaultGraphOptions["ymin"] = upcApp.parabolicCircleGraph["ymin"]/5
    
    // if (window.innerWidth >= 1000) {
    //     defaultGraphOptions["ymajorgridlinesvisibility"] = "yes"
    //     defaultGraphOptions["xmajorgridlinesvisibility"] = "yes"
    // }


    viewX.addGraph(gph30.graphH, "pointH-reveal-graph", defaultGraphOptions)

    

    defaultGraphOptions["ymajorgridlinesvisibility"] = "no"
    defaultGraphOptions["xmajorgridlinesvisibility"] = "no"

    gph30.theParabola = parabolaPoints([0, 1], [-3, -1], [3, -1], -4, 4, 100)
    gph30.thePoints = gph30.theParabola.points


    lineOptions = { x1: 2, y1: 0, x2: 2, y2: 2, strokewidth: 4, linecolor: "var(--brightYellow)", opacity: 0.5};
    viewX.addLine("pointH-reveal-graph", "pointH-reveal-AB-line", lineOptions);
    
    pointOptions = { x:  2, y:  2, pointsize: upcApp.graphPointSize*0.8, pointcolor: 'white'};
    viewX.addPoint("pointH-reveal-graph", "pointH-reveal-APoint", pointOptions);

    textOptions = {x:  2 + upcApp.parabolicCircleGraph["point-label-gap"], y:  2 - upcApp.parabolicCircleGraph["point-label-gap"], text: "A",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "white"};
    viewX.addText("pointH-reveal-graph", "pointH-reveal-APoint-label", textOptions);

    
    lineOptions = { x1: -3, y1: 0, x2: 3, y2: 0, strokewidth: 0.6, linecolor: "hsla(0, 0%, 40%, 0.7)"}; 
    viewX.addLine("pointH-reveal-graph", "pointH-reveal-theXAxis", lineOptions);

    lineOptions = { x1: 0, y1: 5, x2: 0, y2: -3, strokewidth: 0.6, linecolor: "hsla(0, 0%, 40%, 0.7)"}; 
    viewX.addLine("pointH-reveal-graph", "pointH-reveal-theYAxis", lineOptions);

    var pathOptions = {
        points: gph30.thePoints,
        strokewidth: 0.3,
        pathcolor: "var(--lightPurple)",
        pathfillcolor: "none",
        opacity: 0.2
    };
    pathElementDetails = viewX.addPath("pointH-reveal-graph", "pointH-reveal-parabola", pathOptions);


    gph30.cHParabola = parabolaPoints([0, 1], [-3, -1], [3, -1], 0, 1, 40)
    gph30.cHPoints = gph30.cHParabola.points

    var pathOptions = {
        points: gph30.cHPoints,
        strokewidth: 2,
        pathcolor: "var(--lightPurple)",
        pathfillcolor: "none",
        opacity: 0.4
    };
    pathElementDetails = viewX.addPath("pointH-reveal-graph", "pointH-reveal-CH-curve-parabola", pathOptions);

    midFC = viewX.scalarMultiplyVec(0.5, viewX.addVec(gph30.theParabola.focus, gph30.theParabola.vertex))
    

    pointOptions = { x:  gph30.theParabola.vertex[0], y:  gph30.theParabola.vertex[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)'};
    viewX.addPoint("pointH-reveal-graph", "pointH-reveal-vertex", pointOptions);

    textOptions = {x: gph30.theParabola.vertex[0] + upcApp.parabolicCircleGraph["point-label-gap"], y: gph30.theParabola.vertex[1] - upcApp.parabolicCircleGraph["point-label-gap"], text: "C",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightPurple)"};
    viewX.addText("pointH-reveal-graph", "pointH-reveal-vertex-label", textOptions);

    pointOptions = { x:  gph30.theParabola.focus[0], y:  gph30.theParabola.focus[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--brightYellow)'};
    viewX.addPoint("pointH-reveal-graph", "pointH-reveal-focus", pointOptions);

    textOptions = {x:  gph30.theParabola.focus[0] + upcApp.parabolicCircleGraph["point-label-gap"], y:  gph30.theParabola.focus[1] - upcApp.parabolicCircleGraph["point-label-gap"], text: "F",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--brightYellow)"};
    viewX.addText("pointH-reveal-graph", "pointH-reveal-focus-label", textOptions);

    pointOptions = { x:  gph30.theParabola.latusRectumPointLeft[0], y:  gph30.theParabola.latusRectumPointLeft[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)', opacity: 0.2};
    viewX.addPoint("pointH-reveal-graph", "pointH-reveal-G", pointOptions);

    textOptions = {x:  gph30.theParabola.latusRectumPointLeft[0] - upcApp.parabolicCircleGraph["point-label-gap"], y:  gph30.theParabola.latusRectumPointLeft[1] - upcApp.parabolicCircleGraph["point-label-gap"], text: "G",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightPurple)", opacity: 0.2};
    viewX.addText("pointH-reveal-graph", "pointH-reveal-G-label", textOptions);

    pointOptions = { x:  gph30.theParabola.latusRectumPointRight[0], y:  gph30.theParabola.latusRectumPointRight[1], pointsize: upcApp.graphPointSize, pointcolor: 'var(--lightPurple)'};
    viewX.addPoint("pointH-reveal-graph", "pointH-reveal-H", pointOptions);

    textOptions = {x:  gph30.theParabola.latusRectumPointRight[0] + upcApp.parabolicCircleGraph["point-label-gap"], y:  gph30.theParabola.latusRectumPointRight[1] - upcApp.parabolicCircleGraph["point-label-gap"], text: "H",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightPurple)"};
    viewX.addText("pointH-reveal-graph", "pointH-reveal-H-label", textOptions);

    BPoint = viewX.addVec(gph30.theParabola.latusRectumPointRight, viewX.subtractVec(gph30.theParabola.vertex, gph30.theParabola.focus))

    pointOptions = { x:  BPoint[0], y:  BPoint[1], pointsize: upcApp.graphPointSize*0.8, pointcolor: 'white'};
    viewX.addPoint("pointH-reveal-graph", "pointH-reveal-BPoint", pointOptions);

    textOptions = {x:  BPoint[0] + upcApp.parabolicCircleGraph["point-label-gap"], y:  BPoint[1] - upcApp.parabolicCircleGraph["point-label-gap"], text: "B",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "white"};
    viewX.addText("pointH-reveal-graph", "pointH-reveal-BPoint-label", textOptions);


    sideShiftDirection = viewX.scalarMultiplyVec(gph30.theParabola.a*0.5, viewX.directionVec(gph30.theParabola.focus, gph30.theParabola.latusRectumPointRight))

    var arrowOptions = {
        from: viewX.subtractVec(viewX.addVec(gph30.theParabola.latusRectumPointRight, sideShiftDirection), [0, 0.01]),
        to: viewX.addVec(viewX.addVec(BPoint, sideShiftDirection), [0, 0.01]),
        strokewidth: 0.4,
        arrowcolor: "var(--lightPink)"
    };
    arrow = viewX.addArrow("pointH-reveal-graph", "pointH-reveal-HB-arrow-1", arrowOptions);

    var arrowOptions = {
        to: viewX.subtractVec(viewX.addVec(gph30.theParabola.latusRectumPointRight, sideShiftDirection), [0, 0.01]),
        from: viewX.addVec(viewX.addVec(BPoint, sideShiftDirection), [0, 0.01]),
        strokewidth: 0.4,
        arrowcolor: "var(--lightPink)"
    };

    arrow = viewX.addArrow("pointH-reveal-graph", "pointH-reveal-HB-arrow-2", arrowOptions);

    midHB = viewX.scalarMultiplyVec(0.5, viewX.addVec(gph30.theParabola.latusRectumPointRight, BPoint))

    midHBShifted = viewX.addVec(midHB, sideShiftDirection)
    textOptions = {x:  midHBShifted[0] + upcApp.parabolicCircleGraph["point-label-gap"], y:  midHBShifted[1], text: "a = 0.5",  textAlign: "left",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightPink)"};
    viewX.addText("pointH-reveal-graph", "pointH-reveal-HB-label", textOptions);



    var arrowOptions = {
        from: viewX.addVec(gph30.theParabola.latusRectumPointRight, [0, 0.3]),
        to: viewX.addVec(gph30.theParabola.focus, [0, 0.3]),
        strokewidth: 0.4,
        arrowcolor: "var(--lightBlue)"
    };
    arrow = viewX.addArrow("pointH-reveal-graph", "pointH-reveal-HF-arrow-1", arrowOptions);

    var arrowOptions = {
        to: viewX.addVec(gph30.theParabola.latusRectumPointRight, [0, 0.3]),
        from: viewX.addVec(gph30.theParabola.focus, [0, 0.3]),
        strokewidth: 0.4,
        arrowcolor: "var(--lightBlue)"
    };

    arrow = viewX.addArrow("pointH-reveal-graph", "pointH-reveal-HF-arrow-2", arrowOptions);

    midHF = viewX.scalarMultiplyVec(0.5, viewX.addVec(gph30.theParabola.latusRectumPointRight, gph30.theParabola.focus))

    midHFShifted = viewX.addVec(midHF, [0, 0.3])
    textOptions = {x:  midHFShifted[0], y:  midHFShifted[1] +  upcApp.parabolicCircleGraph["point-label-gap"], text: "2a = 1",  textAlign: "center",  fontSize: upcApp.graphFontSizeLarge*0.7, fontFamily: "Nunito",   textcolor: "var(--lightBlue)"};
    viewX.addText("pointH-reveal-graph", "pointH-reveal-HF-label", textOptions);


    gph30.sampleNPoints();


}



gph30.sampleNPoints = function() {
    
    gph30.condition = gph26.generateSampleData(parseInt(gph30.slider.value), [0, 0], 4)

    gph30.samples = gph30.condition.samples

    gph30.samples[gph30.condition.globalValues.numberOfSamples - 1].color = "var(--lightGreen)"
    gph30.samples[gph30.condition.globalValues.numberOfSamples - 1].name = "A"
    gph30.samples[0].name = "B"
    gph30.samples[gph30.condition.globalValues.numberOfSamples - 1].distanceLabel = "√2"
    gph30.samples[0].distanceLabel = "1"

    for (cs = 0; cs < gph30.condition.globalValues.numberOfSamples; cs++) {

        if (gph30.condition.globalValues.numberOfSamples > 7) {
            
            gapFactor = viewX.linearValue(7, 30, 0.2, 0.01, parseFloat(gph30.slider.value))
            fontFactor = upcApp.graphFontSizeLarge*viewX.linearValue(7, 30, 1, 0.3, parseFloat(gph30.slider.value))
            pointFactor = viewX.linearValue(7, 30, 1, 0.3, parseFloat(gph30.slider.value))
        }
        else {
            gapFactor = 0.2
            fontFactor = upcApp.graphFontSizeLarge
            pointFactor = 1
        }
        

        previousPT = gph30.condition.globalValues.center
        if (cs != 0) {
            previousPT = gph30.samples[cs - 1].finalPoint
        }

        lineOptions = { x1: previousPT[0], y1: previousPT[1], x2: gph30.samples[cs].finalPoint[0], y2: gph30.samples[cs].finalPoint[1],  strokewidth: 4, linecolor: gph30.samples[cs].color};
        viewX.addLine("pointH-reveal-graph", "pointH-reveal-distance-line-" + (cs + 1), lineOptions);

    }
}


var sliderProperties = {
    minwidth: '200px',
    width: '50%',
    height: 5,
    trackColor: "hsla(10, 0%, 20%, 0.7)",
    trackFillColor: "white",
    thumbWidth: 15,
    thumbHeight: 15,
    thumbColor: "white",
    opacity: 0.7
};

viewX.generateSliderStyles(sliderProperties, "pointH-reveal-Slider");

gph30.slider = document.getElementById("pointH-reveal-Slider");
gph30.sliderLabel = document.getElementById("pointH-reveal-SliderInfo");

gph30.slider.value = 3
gph30.slider.step = 1
gph30.slider.min = 2
gph30.slider.max = 30

gph30.sliderLabel.innerHTML = "Number of points : " + gph30.slider.value

gph30.slider.addEventListener('input', function() {
    gph30.sliderLabel.innerHTML = "Number of points : " + gph30.slider.value

    viewX.removeGraph("pointH-reveal-graph")
    gph30.setUpPointHRevealGraph()

});

function pauseAutoplaygph30() {
    clearInterval(gph30.interval);
}

gph30.slider.addEventListener('mouseover', pauseAutoplaygph30);
gph30.slider.addEventListener('touchstart', pauseAutoplaygph30);

gph30.nextValue = function() {
    gph30.slider.value = parseInt(gph30.slider.value) + 1
    if (gph30.slider.value == gph30.slider.max) {
        gph30.slider.value = 1
    }
    // gph30.sliderLabel.innerHTML = gph30.messageOfSteps[parseInt(gph30.slider.value)]
}

