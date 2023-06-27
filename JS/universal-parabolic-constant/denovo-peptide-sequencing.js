
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


