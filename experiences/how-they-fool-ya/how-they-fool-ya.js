

// Check if device is mobile based on screen size
var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

visualization = {}
visualization.intro = {}
visualization.intro.textWidth = isMobile ? 20 : 10
visualization.intro.startingTextX = isMobile ? -8 : -1
visualization.intro.startingTextY = isMobile ? 2 : 4
visualization.intro.guitarStartingX = isMobile ? -9 : -7
visualization.intro.guitarStartingY = isMobile ? 5 : 4
visualization.intro.guitarColor = isMobile ? 'hsla(198, 100%, 70%, 0.2)' : 'hsla(198, 100%, 70%, 0.3)'
visualization.intro.fontSizes = {}
visualization.intro.fontSizes.title = isMobile ? "33px" : "50px"
visualization.intro.fontSizes.grantName = isMobile ? "22px" : "27px"
visualization.intro.fontSizes.threeB1bText = isMobile ? "15px" : "18px"
visualization.intro.fontSizes.videoLinkText = isMobile ? "15px" : "17px"
visualization.intro.fontSizes.startButton = isMobile ? "18px" : "23px"
visualization.intro.videoLinkTextDistance = isMobile ? 1 : 0.3
visualization.intro.videoLinkTextWidth = isMobile ? 6 : 6
visualization.intro.startButtonDistance = isMobile ? 1 : 1
visualization.intro.startButtonWidth = isMobile ? 3 : 2
visualization.intro.quoteTextDistance = isMobile ? 3 : 2
visualization.intro.quoteTextWidth = isMobile ? 6 : 6

visualization.currentMainScene = null

var space = rhyform.createSpaceInElement('#mainDisplay', name="mainSpace");
space.camera.setBounds({x: -7, y: -15, width: 20, height: 20});
rhyform.font = "Gaegu";


visualizationScenes = {}

async function intro() {
    
    document.getElementById('mainDisplay').scrollIntoView({behavior: 'smooth', block: 'start'});

    
    if (visualizationScenes.circleScene) {
        visualizationScenes.circleScene.clear()
        rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.circleScene.name)
    }

    if (visualizationScenes.borweinScene) {
        visualizationScenes.borweinScene.clear()
        rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.borweinScene.name)
    }

    if (visualizationScenes.intro) {
        visualizationScenes.intro.clear()
        rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.intro.name)
    }

    if (visualizationScenes.primeModulo4Scene) {
        visualizationScenes.primeModulo4Scene.clear()
        rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.primeModulo4Scene.name)
    }


    var introScene = rhyform.createScene('Intro Play Scene');
    introScene.selectSpace(space);


    visualizationScenes.intro = introScene

    visualization.currentMainScene = introScene
    
    introSong = rhyform.createAudio('peaceful-background-172763.mp3')
    introSong.play().startNextImmediately()


    rhyform.fontSize = visualization.intro.fontSizes.title




    mainTitle = rhyform.createText('How they fool ya').place.at(x=visualization.intro.startingTextX, y=visualization.intro.startingTextY).loadWith.width(visualization.intro.textWidth).addTag('intro')
    mainTitle.write().startNextImmediately()


    guitar = await rhyform.generateVectorImage('guitar-notes.png', at={x: visualization.intro.guitarStartingX, y: visualization.intro.guitarStartingY}, color="none",  fillcolor=visualization.intro.guitarColor, width=5.5)
    
    guitar.addTag('intro')
    guitar.show()


    // await guitar.change.url('guitar-notes.png')




    // pseudoPointsObjects = []
    // for (let i = 0; i < 100; i++) {

    //     // sine wave
    //     sineX = i/10
    //     sineY = 2*Math.sin(sineX)


    //     pseudoPointObject = rhyform.createPoint().place.at(x=sineX, y=sineY).loadWith.size(0.1).addTag('intro')
    //     pseudoPointsObjects.push(pseudoPointObject)
    // }

    // someCurve = rhyform.createCurve(pseudoPointsObjects) 
    // someCurve.draw()

    
    grantName = rhyform.createText('by Grant Sanderson')
        .loadWith.width(visualization.intro.textWidth)
        .loadWith.fontSize(visualization.intro.fontSizes.grantName)
        .loadWith.color('hsla(190, 0%, 70%, 1)')
        .place.below(mainTitle).addTag('intro')

    grantName.write()

    gradientColor = rhyform.createGradient(at=[{position: 0, color: 'hsla(199, 100%, 70%, 1)'}, {position: 0.2, color: 'hsla(34, 100%, 50%, 1)'}, {position: 1, color: 'hsla(41, 100%, 70%, 1)'}])

    threeB1bText = rhyform.createText('3Blue1Brown')
    .loadWith.width(visualization.intro.textWidth)
    .loadWith.fontSize(visualization.intro.fontSizes.threeB1bText)
    .loadWith.color(gradientColor)
    .place.below(grantName).addTag('intro')
    
    threeB1bText.write()

    videoLinkText = rhyform.createText('Interactive inspired by 🎥<a href="https://www.youtube.com/watch?v=NOCsdhzo6Jg" style="color: hsla(198, 30%, 60%, 1);" target="blank"> How They Fool Ya (live) | Math parody of Hallelujah</a>')
    .loadWith.fontSize(visualization.intro.fontSizes.videoLinkText)
    .loadWith.width(visualization.intro.videoLinkTextWidth)
    .place.below(threeB1bText, atDistance=visualization.intro.videoLinkTextDistance)
    .loadWith.color('hsla(199, 0%, 50%, 1)')
    .addTag('intro')

    videoLinkText.show()

    buttonGradientColor = rhyform.createGradient(at=[{position: 0, color: 'hsla(41, 100%, 70%, 1)'}, {position: 0.2, color: 'hsla(41, 100%, 50%, 1)'}, {position: 1, color: 'hsla(198, 100%, 70%, 1)'}])

    startButton = rhyform.createButton('Start', onClick=circleScene)
    .loadWith.fontSize(visualization.intro.fontSizes.startButton)
    .loadWith.width(visualization.intro.startButtonWidth).place.below(videoLinkText, atDistance=visualization.intro.startButtonDistance).addTag('intro').loadWith.color(buttonGradientColor)
    startButton.show()


    // "Nature uses only the longest threads to weave her patterns, so that each small piece of her fabric reveals the organization of the entire tapestry. Richard P. Feynman"

    quoteText = rhyform.createText("Nature uses only the longest threads to weave her patterns, so that each small piece of her fabric reveals the organization of the entire tapestry.")

    quoteText.loadWith.fontSize('15px').loadWith.color('hsla(198, 0%, 50%, 0.6)').loadWith.width(visualization.intro.quoteTextWidth).place.below(startButton, atDistance=visualization.intro.quoteTextDistance).addTag('intro')



    quoteAuthor = rhyform.createText("Richard P. Feynman").loadWith.fontSize('15px').loadWith.color(gradientColor).loadWith.width(visualization.intro.textWidth*0.6).place.below(quoteText, atDistance=3*space.camera.labelDistance).addTag('intro')

    quoteText.write(lettersPerSecond=40)
    quoteAuthor.write()
    
    // console.log(guitar)

    // quoteExpression = await rhyform.generateEquation(expression="x", at={x: 0, y: -6}, color='white', fontSize=1)

    // quoteExpression.show()

    // introScene.resetToFrame(1)

    mainSong = rhyform.createAudio('how-they-fool-ya.m4a')
    

    introScene.play()
}

function integralSum(func, a, b, n) {
    sum = 0
    dx = (b-a)/n

    for (let i = 0; i < n; i++) {
        x = a + i*dx
        sum += func(x)*dx
    }

    return sum
}

function borwein(x, args) {
    n = args.n
    if (x == 0) {
        return 1
    }
    else {
        product = 1
        for (let i = 1; i <= n; i=i+2) {
            product *= Math.sin(i*x)/(i*x)
        }

        return product
    }
}

function getPoints(funcX, startX, endX, n, funcArgsObject) {
    points = []

    dx = (endX-startX)/n

    for (let i = 0; i < n; i++) {
        x = startX + i*dx
        y = funcX(x, funcArgsObject)

        points.push([x, y])
    }

    return points
}

// int_sum = integralSum(borwein, 0, 10000, 1000000)
// console.log(int_sum)
// console.log(Math.PI/2)

async function generateCircleSegmentation(name, number_of_points, circleRadius, center) {
    circleSegmentationVisualization = {}

    circleSegmentationVisualization.circleRadius = circleRadius
    circleSegmentationVisualization.numberOfPoints = number_of_points

    circleSegmentationVisualization.circleCenter = rhyform.createPoint().addTag('circleCenter').place.at(x=center[0], y=center[1])
    circleSegmentationVisualization.mainCircle = rhyform.createCircle(circleSegmentationVisualization.circleCenter, radius=circleRadius).loadWith.color('hsla(198, 100%, 50%, 1)').addTag('circle').addTag(name).addTag('circle-' + name)

    // circleSegmentationVisualization.circleCenter = circleCenter
    // circleSegmentationVisualization.mainCircle = mainCircle

    points = []
    circleSegmentationVisualization.pointsNames = []

    for (let i = 0; i < number_of_points; i++) {
        // Almost Evenly spaced points on the circle
        angle = 2*Math.PI/number_of_points
        offsetAngle = Math.random()*angle/1.4

        circleSegmentationVisualization.point = rhyform.createPoint().place.at(x=circleRadius*Math.cos(angle*i+offsetAngle) + circleSegmentationVisualization.circleCenter.coordinates.x, y=circleRadius*Math.sin(angle*i+offsetAngle) + circleSegmentationVisualization.circleCenter.coordinates.y)

        
        circleSegmentationVisualization.point.angle = angle*i+offsetAngle
        
        circleSegmentationVisualization.point.loadWith.size(visualization.circleInteractive.pointSize).addTag('points').addTag(name).addTag('point-' + name)
        points.push(circleSegmentationVisualization.point);
        circleSegmentationVisualization.pointsNames.push(circleSegmentationVisualization.point.name)

    }

    lines = []


    // mainCircle.show().startNextImmediately();

    chords = []

    for (let i = 0; i < number_of_points; i++) {
        for (let j = i; j < number_of_points; j++) {
            pointI = points[i]
            pointJ = points[j]

            if (i != j) {
                
                circleSegmentationVisualization.line = rhyform.createLine(pointI, pointJ).addTag('lines').addTag(name).addTag('line-' + name).loadWith.thickness(visualization.circleInteractive.lineThickness)

                circleSegmentationVisualization.line.pointIndices = [i, j]

                if (i == j - 1 || (i == 0 && j == number_of_points - 1)) {
                    circleSegmentationVisualization.line.isBoundaryChord = true
                    circleSegmentationVisualization.line.loadWith.color('hsla(0, 0%, 100%, 1)')

                    if (pointI.immediateNeighbours == null) {
                        pointI.immediateNeighbours = []
                    }

                    if (pointJ.immediateNeighbours == null) {
                        pointJ.immediateNeighbours = []
                    }

                    if (pointI.immediateNeighbours.indexOf(pointJ) == -1) {
                        pointI.immediateNeighbours.push(pointJ)
                    }

                    if (pointJ.immediateNeighbours.indexOf(pointI) == -1) {
                        pointJ.immediateNeighbours.push(pointI)
                    }

                }
                else {
                    circleSegmentationVisualization.line.isBoundaryChord = false
                    circleSegmentationVisualization.line.loadWith.color('hsla(0, 0%, 100%, 1)')
                }

                // line.draw(lengthPerSecond=3).startNextImmediately();

                chords.push(circleSegmentationVisualization.line)

                
            }

            

            

        }
    }


    circleSegmentationVisualization.points = points
    // circleSegmentationVisualization.pointsNames = pointsNames
    circleSegmentationVisualization.chords = chords

    regions = {}

    for (let i = 0; i < points.length; i++) {
        point = points[i]
        // point.show().startNextImmediately();
    }

    if (number_of_points >= 4) {
        intersectionPoints = []

        for (let i = 0; i < chords.length; i++) {
            for (let j = i; j < chords.length; j++) {
                if (i != j) {
                    chordA = chords[i]
                    chordB = chords[j]

                    chordIntersectionSignatureArray = chordA.pointIndices.concat(chordB.pointIndices).sort()
                    let set = new Set(chordIntersectionSignatureArray);

                    if (set.size == 4) {



                        // console.log(chordA)
                        // console.log(chordB)

                        if (!chordA.isBoundaryChord && !chordB.isBoundaryChord) {

                        }
                    
                        if (chordA.intersectionPoints == null) {
                            chordA.intersectionPoints = []
                        }

                        if (chordB.intersectionPoints == null) {
                            chordB.intersectionPoints = []
                        }

                        if (chordA.intersectionPointsNames == null) {
                            chordA.intersectionPointsNames = []
                        }

                        if (chordB.intersectionPointsNames == null) {
                            chordB.intersectionPointsNames = []
                        }

                        // compute intersection using
                        // viewX.libraryFunctions.intersectionBetweenRayAndLineSegment = function(ray, lineSegment)
                        //     A = ray.from
                        //     B = ray.to
                        //     C = lineSegment.betweenPoint1
                        //     D = lineSegment.betweenPoint2

                        chordAPoint1 = [chordA.point1.coordinates.x, chordA.point1.coordinates.y]
                        chordAPoint2 = [chordA.point2.coordinates.x, chordA.point2.coordinates.y]

                        chordBPoint1 = [chordB.point1.coordinates.x, chordB.point1.coordinates.y]
                        chordBPoint2 = [chordB.point2.coordinates.x, chordB.point2.coordinates.y]

                        lineSegmentA = {point1: chordAPoint1, point2: chordAPoint2}
                        lineSegmentB = {point1: chordBPoint1, point2: chordBPoint2}

                        intersection = viewX.libraryFunctions.intersectionBetweenLineSegments(lineSegmentA, lineSegmentB)

                        // console.log(intersection)

                        // Check if outside the circle 
                        // Also circleCenter is the origin

                        isInside = true

                        if (intersection != null) {

                            distanceToPointFromCenter = viewX.distF([intersection[0], intersection[1]], [circleSegmentationVisualization.circleCenter.coordinates.x, circleSegmentationVisualization.circleCenter.coordinates.y])

                            if (distanceToPointFromCenter > circleRadius) {
                                isInside = false
                            }
                        }

                        intersectionPrecision = 10

                        if (intersection != null && isInside) {
                            intersectionAsString = intersection[0].toFixed(intersectionPrecision) + ',' + intersection[1].toFixed(intersectionPrecision)
                            if (chordA.intersectionPointsNames.indexOf(intersectionAsString) == -1 && chordB.intersectionPointsNames.indexOf(intersectionAsString) == -1) {
                                 
                                circleSegmentationVisualization.point = rhyform.createPoint().place.at(x=intersection[0], y=intersection[1])

                                circleSegmentationVisualization.point.loadWith.size(0.2).loadWith.color('white').addTag('intersectionPoints').addTag(name).addTag('intersectionPoint-' + name)
                                // point.show().startNextImmediately();
                                circleSegmentationVisualization.point.chord = [chordA, chordB]

                                if (chordA.intersectionPointsNames.indexOf(intersectionAsString) == -1) {
                                    chordA.intersectionPointsNames.push(intersectionAsString)
                                    chordA.intersectionPoints.push(circleSegmentationVisualization.point)
                                }

                                if (chordB.intersectionPointsNames.indexOf(intersectionAsString) == -1) {
                                    chordB.intersectionPointsNames.push(intersectionAsString)
                                    chordB.intersectionPoints.push(circleSegmentationVisualization.point)
                                }

                                
                                intersectionPoints.push(circleSegmentationVisualization.point)
                                circleSegmentationVisualization.point.isIntersectionPoint = true

                            }
                        }
                    }
                }
            }
        }


        for (let i = 0; i < chords.length; i++) {
            chord = chords[i]

            a = chord.pointIndices[0]
            b = chord.pointIndices[1]

            point = points[a]
            point.chord = [chordA, chordB]
            chord.intersectionPoints.push(point)

            point = points[b]
            point.chord = [chordA, chordB]
            chord.intersectionPoints.push(point)

        }



        for (let i = 0; i < intersectionPoints.length; i++) {
            point = intersectionPoints[i]

            chordA = point.chord[0]
            chordB = point.chord[1]

            // console.log(point.element)

            // console.log(chordA.element)


            point.neighboursOnChordA = chordA.intersectionPoints.filter(function(value, index, arr){ return value != point;})

            neighbourDistances = []
            neighbourVectors = []
            for (let j = 0; j < point.neighboursOnChordA.length; j++) {
                neighbour = point.neighboursOnChordA[j]

                neighbourVector = viewX.subtractVec([point.coordinates.x, point.coordinates.y], [neighbour.coordinates.x, neighbour.coordinates.y])

                neighbourVectors.push(neighbourVector)

                distance = viewX.distF([point.coordinates.x, point.coordinates.y], [neighbour.coordinates.x, neighbour.coordinates.y])

                neighbourDistances.push({point: neighbour, distance: distance})
            }

            neighbourVectorReference = neighbourVectors[0]

            negativeGroup = []
            positiveGroup = []

            for (let j = 0; j < neighbourDistances.length; j++) {
                neighbour = neighbourDistances[j].point

                neighbourVector = neighbourVectors[j]

                dotProduct = viewX.dotProduct(neighbourVectorReference, neighbourVector)

                if (dotProduct < 0) {
                    negativeGroup.push(neighbourDistances[j])
                }
                else {
                    positiveGroup.push(neighbourDistances[j])
                }
            }



            negativeGroup.sort(function(a, b) {
                return a.distance - b.distance;
            });

            positiveGroup.sort(function(a, b) {
                return a.distance - b.distance;
            });

            closestInPositive = positiveGroup[0]
            closestInNegative = negativeGroup[0]

            point.immediateNeighboursOnChordA = [closestInPositive.point, closestInNegative.point]

            point.neighboursOnChordB = chordB.intersectionPoints.filter(function(value, index, arr){ return value != point;})

            neighbourDistances = []
            neighbourVectors = []
            for (let j = 0; j < point.neighboursOnChordB.length; j++) {
                neighbour = point.neighboursOnChordB[j]

                neighbourVector = viewX.subtractVec([point.coordinates.x, point.coordinates.y], [neighbour.coordinates.x, neighbour.coordinates.y])

                neighbourVectors.push(neighbourVector)

                distance = viewX.distF([point.coordinates.x, point.coordinates.y], [neighbour.coordinates.x, neighbour.coordinates.y])

                neighbourDistances.push({point: neighbour, distance: distance})
            }

            neighbourVectorReference = neighbourVectors[0]

            negativeGroup = []
            positiveGroup = []

            for (let j = 0; j < neighbourDistances.length; j++) {
                neighbour = neighbourDistances[j].point

                neighbourVector = neighbourVectors[j]

                dotProduct = viewX.dotProduct(neighbourVectorReference, neighbourVector)

                if (dotProduct < 0) {
                    negativeGroup.push(neighbourDistances[j])
                }
                else {
                    positiveGroup.push(neighbourDistances[j])
                }
            }

            negativeGroup.sort(function(a, b) {
                return a.distance - b.distance;
            });

            positiveGroup.sort(function(a, b) {
                return a.distance - b.distance;
            });

            closestInPositive = positiveGroup[0]
            closestInNegative = negativeGroup[0]

            point.immediateNeighboursOnChordB = [closestInPositive.point, closestInNegative.point]

            if (point.immediateNeighbours == null) {
                point.immediateNeighbours = []
            }


            neighboursFound = point.immediateNeighboursOnChordA.concat(point.immediateNeighboursOnChordB)

            for (let j = 0; j < neighboursFound.length; j++) {
                neighbour = neighboursFound[j]

                if (point.immediateNeighbours.indexOf(neighbour) == -1) {
                    point.immediateNeighbours.push(neighbour)
                }
            }

            for (let j = 0; j < point.immediateNeighbours.length; j++) {
                neighbour = point.immediateNeighbours[j]

                if (neighbour.immediateNeighbours == null) {
                    neighbour.immediateNeighbours = []
                }

                if (neighbour.immediateNeighbours.indexOf(point) == -1) {
                    neighbour.immediateNeighbours.push(point)
                }
            }


            
        }

        for (let i = 0; i < intersectionPoints.length; i++) {
            point = intersectionPoints[i]

            // start at every neighbour, go clockwise, and find the region

            for (let j = 0; j < point.immediateNeighbours.length; j++) {

                region = {}
                region.points = []

                // console.log("New Region")

                region.length = 0
                
                neighbour = point.immediateNeighbours[j]
                vectoralDirectionOfNeighbour = viewX.subtractVec([neighbour.coordinates.x, neighbour.coordinates.y], [point.coordinates.x, point.coordinates.y])

                region.points.push(neighbour)
                currentPoint = neighbour
                previousPoint = point

                currentVectoralDirection = vectoralDirectionOfNeighbour

                // console.log(currentPoint.element)
                // console.log(currentPoint.name)

                while (currentPoint.name != point.name) {

                    potentialNextPoints = currentPoint.immediateNeighbours

                    dotProducts = []
                    angles = []

                    for (let k = 0; k < potentialNextPoints.length; k++) {
                        potentialNextPoint = potentialNextPoints[k]

                        // if (potentialNextPoint.isIntersectionPoint == null) {
                        //     console.log(potentialNextPoint)
                        // }

                        if (potentialNextPoint != previousPoint) {

                            nextVectoralDirectionOfNextPoint = viewX.subtractVec([potentialNextPoint.coordinates.x, potentialNextPoint.coordinates.y], [currentPoint.coordinates.x, currentPoint.coordinates.y])

                            dotProduct = viewX.dotProduct(currentVectoralDirection, nextVectoralDirectionOfNextPoint)


                            angleBetween = viewX.angleBetweenVecs(currentVectoralDirection, nextVectoralDirectionOfNextPoint)
                            

                            dotProducts.push({point: potentialNextPoint, dotProduct: dotProduct, vectoralDirection: nextVectoralDirectionOfNextPoint, angleBetween: angleBetween})
                        }



                    }

                    dotProducts.sort(function(a, b) {
                        return a.angleBetween - b.angleBetween;
                    });

                    nextPoint = dotProducts[0].point
                    currentVectoralDirection = dotProducts[0].vectoralDirection
                    
                    // console.log(currentPoint.element)
                    
                    previousPoint = currentPoint
                    currentPoint = nextPoint


                    region.points.push(currentPoint)

                    if (region.points.length > 10) {
                        break
                    }
                    // console.log(currentPoint.element)
                    // console.log(currentPoint.name)
                }

                region.pointNames = [ ] 
                region.pointElements = [ ]
                stringForRegion = ''
                for (let j = 0; j < region.points.length; j++) {
                    point = region.points[j]

                    region.pointNames.push(point.name)
                    region.pointElements.push(point.element)


                }

                region.pointNames.sort()

                stringForRegion = region.pointNames.join()

                if (regions[stringForRegion] == null) {
                    regions[stringForRegion] = region
                }

            }

            

            // break
        }

        
        circleSegmentationVisualization.intersectionPoints = intersectionPoints
    }


    if (number_of_points == 3) {
        region = {}
        region.pointNames = []
        region.pointElements = []

        pointsForRegion = []

        for (let i = 0; i < points.length; i++) {
            point = points[i]

            region.pointNames.push(point.name)
            region.pointElements.push(point.element)

            pointsForRegion.push(point)
        }

        region.points = pointsForRegion

        region.pointNames.sort()

        stringForRegion = region.pointNames.join()

        if (regions[stringForRegion] == null) {
            regions[stringForRegion] = region
        }

    }

    for (let i = 0; i < points.length; i++) {
        point = points[i]
        nextPoint = points[(i+1)%points.length]

        if (i == points.length - 1) {
            startingAngle = point.angle
            endingAngle = nextPoint.angle + 2*Math.PI
        }
        else {
            startingAngle = Math.min(point.angle, nextPoint.angle)
            endingAngle = Math.max(point.angle, nextPoint.angle)
        }


        pointsForRegion = []
        numberOfPointForRegionArc = 20

        
        region = {}
        region.pointNames = [ ]
        region.pointElements = [ ]
        
        for (let j = 0; j < numberOfPointForRegionArc; j++) {
            angleForPoint = startingAngle + (endingAngle - startingAngle)*j/(numberOfPointForRegionArc-1)

            
            circleSegmentationVisualization.curvePoint = rhyform.createPoint().place.at(x=circleRadius*Math.cos(angleForPoint) + circleSegmentationVisualization.circleCenter.coordinates.x, y=circleRadius*Math.sin(angleForPoint) + circleSegmentationVisualization.circleCenter.coordinates.y).addTag('boundaryArcPoints').addTag(name).addTag('boundaryArcPoint-' + name)
            
            pointsForRegion.push(circleSegmentationVisualization.curvePoint)

            region.pointNames.push(circleSegmentationVisualization.curvePoint.name)
            region.pointElements.push(circleSegmentationVisualization.curvePoint.element)
        }


        region.points = pointsForRegion

        region.pointNames.sort()

        stringForRegion = region.pointNames.join()

        if (regions[stringForRegion] == null) {
            regions[stringForRegion] = region
        }

    }

    regionKeys = Object.keys(regions)
    // hueRangeForRegions = [0, 330]
    opacityRangeForRegions = [0.05, 0.5]

    regionKeys.sort()

    for (let i = 0; i < regionKeys.length; i++) {

        region = regions[regionKeys[i]]

         // generate a hue for each region

        // hueForRegion = viewX.linearValue(0, regionKeys.length-1, hueRangeForRegions[0], hueRangeForRegions[1], i)

        opacityForRegion = viewX.linearValue(0, regionKeys.length-1, opacityRangeForRegions[0], opacityRangeForRegions[1], i)


        circleSegmentationVisualization.curve = rhyform.createCurve(region.points).loadWith.color('none')
        circleSegmentationVisualization.curve.set.fillColor('hsla(198, 0%, 70%, ' + opacityForRegion + ')').addTag('regions').addTag(name).addTag('boundaryArcPoint-' + name)

        region.curve = circleSegmentationVisualization.curve

        // console.log(region.curve.pointsXY)
        regionCenter = viewX.centerOfPoints(region.curve.pointsXY)

        // console.log(regionCenter)

        if (number_of_points <= 12) {
            circleSegmentationVisualization.regionCountText = rhyform.createText(i + 1).place.at(x = regionCenter[0] - 0.1, y = regionCenter[1] + 0.2).loadWith.fontSize('12px').addTag('regionCounts').addTag(name).addTag('regionCount-' + name)

            if (i == regionKeys.length - 1) {
                circleSegmentationVisualization.regionCountText.loadWith.color('hsla(198, 100%, 70%, 1)')
            }
            else {
                circleSegmentationVisualization.regionCountText.loadWith.color('white')
            }
    
            region.countText = circleSegmentationVisualization.regionCountText
        }
        else {
            // we add point instead

            circleSegmentationVisualization.regionCountIndicator = rhyform.createPoint().place.at(x = regionCenter[0], y = regionCenter[1]).loadWith.size(0.06).loadWith.color('white').addTag('regionCounts').addTag(name).addTag('regionCount-' + name)

            region.countText = circleSegmentationVisualization.regionCountIndicator
        }




        // curve.show(inSeconds=0.3)
    }

    circleSegmentationVisualization.regions = regions

    return circleSegmentationVisualization
}

function clearScenes() {

    if (visualizationScenes.circleScene) {
        visualizationScenes.circleScene.clear()
        rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.circleScene.name)
    }

    if (visualizationScenes.borweinScene) {
        visualizationScenes.borweinScene.clear()
        rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.borweinScene.name)
    }

    if (visualizationScenes.intro) {
        visualizationScenes.intro.clear()
        rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.intro.name)
    }

    if (visualizationScenes.primeModulo4Scene) {
        visualizationScenes.primeModulo4Scene.clear()
        rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.primeModulo4Scene.name)
    }


}

tableOffset = -2

visualization.circleScene = {
    circle1 : {
        radius: isMobile ? 2.5 : 3,
        center: isMobile ? [-6, 1.5] : [-4, 0],
    },

    circle2 : {
        radius: isMobile ? 2.5 : 3,
        center: isMobile ? [-6, -4.5] : [3, 0],
    },

    circle3 : {
        radius: isMobile ? 2.5 : 3,
        center: isMobile ? [-6, -10.5] : [10, 0],
    },

    circle6 : {
        radius: isMobile ? 3 : 3,
        center: isMobile ? [-5.5, -12] : [10, 0],
    },

    pointNumberText1 : {
        position: isMobile ? [-2.5, 2.5] : [-6, 6],
        fontSize: isMobile ? '18px' : '22px'
    },

    pointNumberText2 : {
        position: isMobile ? [-2.5, -3.5] : [1, 6]
    },

    pointNumberText3 : {
        position: isMobile ? [-2.5, -9.5] : [8, 6]
    },

    regionText : {
        fontSize: isMobile ? '18px' : '22px',
    },

    countsCountLabel : {
        position: isMobile ? [-2.6, 4 + tableOffset] : [-6, 6],
    },

    regionsCountLabel : {
        position: isMobile ? [-0.4, 4 + tableOffset] : [-6, 6],
    },


    changedPoint1Text : {
        position: isMobile ? [-3.5, 2 + tableOffset] : [-4, 6]
    },

    changedRegionsPoint1Text : {
        position: isMobile ? [-2, 2 + tableOffset] : [-4, 6]
    },

    changedPoint2Text : {
        position: isMobile ? [-3.5, 0.5 + tableOffset] : [-2, 6]
    },

    changedRegionsPoint2Text : {
        position: isMobile ? [-2, 0.5 + tableOffset] : [-4, 6]
    },

    changedPoint3Text : {
        position: isMobile ? [-3.5, -1 + tableOffset] : [0, 6]
    },

    changedRegionsPoint3Text : {
        position: isMobile ? [-2, -1 + tableOffset] : [-4, 6]
    },


    pointNumberText4 : {
        position: isMobile ? [-3.5, -2.5 + tableOffset] : [2, 6]
    },

    regionsPoint4Text : {
        position: isMobile ? [-2, -2.5 + tableOffset] : [-4, 6]
    },


    pointNumberText5 : {
        position: isMobile ? [-3.5, -4 + tableOffset] : [4, 6]
    },

    regionsPoint5Text : {
        position: isMobile ? [-2, -4 + tableOffset] : [-4, 6]
    },

    pointNumberText6 : {
        position: isMobile ? [-1.8, -5.5 + tableOffset] : [8, 6]
    },

    regionsPoint6Text : {
        position: isMobile ? [-0.23, -5.5 + tableOffset] : [-4, 6]
    },


    pointNumberText7 : {
        position: isMobile ? [-2.9, -7 + tableOffset] : [11, 6]
    },

    regionsPoint7Text : {
        position: isMobile ? [-0.8, -7 + tableOffset] : [-4, 6],
        width: isMobile ? 1.5 : 2
    },

    patternsFooledYaText : {
        position: isMobile ? [-8, 6] : [-2, 0],
        fontSize: isMobile ? '19px' : '25px',
    },

    howTheyFoolYaText : {
        fontSize: isMobile ? '22px' : '35px',
    },


    piFigure : {
        position: isMobile ? [-9, 4] : [-6, -1],
    }
}


async function circleScene() {
    
    document.getElementById('mainDisplay').scrollIntoView({behavior: 'smooth', block: 'start'});
    // visualizationScenes.intro.pause()

    if (visualizationScenes.circleScene) {
        visualizationScenes.circleScene.clear()
        rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.circleScene.name)
    }

    if (visualizationScenes.borweinScene) {
        visualizationScenes.borweinScene.clear()
        rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.borweinScene.name)
    }

    if (visualizationScenes.intro) {
        visualizationScenes.intro.clear()
        rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.intro.name)
    }

    if (visualizationScenes.primeModulo4Scene) {
        visualizationScenes.primeModulo4Scene.clear()
        rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.primeModulo4Scene.name)
    }



    var scene = rhyform.createScene('Circle Scene');
    scene.selectSpace(space);

    rhyform.selectActiveScene(scene)

    visualization.currentMainScene = scene


    visualizationScenes.circleScene = scene
    
    mainSong = rhyform.createAudio('how-they-fool-ya.m4a')

    // visualizationScenes.circleScene.createSeekBar().addTag('main')
    // visualizationScenes.circleScene.seekBar.show()

    

    mainSong.play(from=81.3).startNextImmediately()

    
    rhyform.hideElementsWithTag('intro', inSeconds=0.3)

    
    circleSegmentData1 = await generateCircleSegmentation('circleSegmented1', 1, visualization.circleScene.circle1.radius, visualization.circleScene.circle1.center)

    circleSegmentData2 = await generateCircleSegmentation('circleSegmented2', 2, visualization.circleScene.circle2.radius, visualization.circleScene.circle2.center)

    circleSegmentData3 = await generateCircleSegmentation('circleSegmented3', 3, visualization.circleScene.circle3.radius, visualization.circleScene.circle3.center)


    // rhyform.showElementsWithTag('circle', inSeconds=0.3)

    circleSegmentData1.mainCircle.show(inSeconds=0.34)
    circleSegmentData2.mainCircle.show(inSeconds=0.25)
    circleSegmentData3.mainCircle.show(inSeconds=0.25)

    rhyform.wait(0.9)


    rhyform.showElementsWithTag('point-circleSegmented1', inSeconds=0.34)
    rhyform.showElementsWithTag('point-circleSegmented2', inSeconds=0.25)
    rhyform.showElementsWithTag('point-circleSegmented3', inSeconds=0.25)

    rhyform.wait(1.6)

    pointNumberText1 = rhyform.createText("1 <span style='color: grey;'>point</span>").place.at(x=visualization.circleScene.pointNumberText1.position[0], y=visualization.circleScene.pointNumberText1.position[1]).loadWith.fontSize(visualization.circleScene.pointNumberText1.fontSize).loadWith.textAlign('center').loadWith.color('white').addTag('pointRegionsText')
    pointNumberText1.show(inSeconds=0.3)

    pointNumberText2 = rhyform.createText("2 <span style='color: grey;'>points</span>").place.at(x=visualization.circleScene.pointNumberText2.position[0], y=visualization.circleScene.pointNumberText2.position[1]).loadWith.fontSize(visualization.circleScene.pointNumberText1.fontSize).loadWith.textAlign('center').loadWith.color('white').addTag('pointRegionsText')
    pointNumberText2.show(inSeconds=0.25)

    pointNumberText3 = rhyform.createText("3 <span style='color: grey;'>points</span>").place.at(x=visualization.circleScene.pointNumberText3.position[0], y=visualization.circleScene.pointNumberText3.position[1]).loadWith.fontSize(visualization.circleScene.pointNumberText1.fontSize).loadWith.textAlign('center').loadWith.color('white').addTag('pointRegionsText')
    pointNumberText3.show(inSeconds=0.25).startNextImmediately()

    rhyform.wait(2)

    chords = circleSegmentData1.chords
    for (let i = 0; i < chords.length; i++) {
        chord  = chords[i]
        chord.draw(lengthPerSecond=3).startNextImmediately()
    }

    chords = circleSegmentData2.chords
    for (let i = 0; i < chords.length; i++) {
        chord  = chords[i]
        chord.draw(lengthPerSecond=3).startNextImmediately()
    }

    chords = circleSegmentData3.chords
    for (let i = 0; i < chords.length; i++) {
        chord  = chords[i]
        chord.draw(lengthPerSecond=3).startNextImmediately()
    }


    rhyform.wait(5)

    regions = circleSegmentData1.regions
    regionKeys = Object.keys(regions)

    for (let i = 0; i < regionKeys.length; i++) {
        region = regions[regionKeys[i]]
        region.curve.show(inSeconds=0.1)
    }

    regionsNumberText1 = rhyform.createText("1 <span style='color: grey;'>region</span>").place.below(pointNumberText1).loadWith.fontSize(visualization.circleScene.regionText.fontSize).loadWith.textAlign('center').loadWith.color('white').addTag('pointRegionsText')

    regionsNumberText1.show(inSeconds=0.3).startNextImmediately()

    rhyform.showElementsWithTag('regionCount-circleSegmented1', inSeconds=0.3)


    regions = circleSegmentData2.regions
    regionKeys = Object.keys(regions)

    for (let i = 0; i < regionKeys.length; i++) {
        region = regions[regionKeys[i]]
        region.curve.show(inSeconds=0.1)
    }
    
    
    regionsNumberText2 = rhyform.createText("2 <span style='color: grey;'>regions</span>").place.below(pointNumberText2).loadWith.fontSize(visualization.circleScene.regionText.fontSize).loadWith.textAlign('center').loadWith.color('white').addTag('pointRegionsText')
    regionsNumberText2.show(inSeconds=0.3).startNextImmediately()

    rhyform.showElementsWithTag('regionCount-circleSegmented2', inSeconds=0.3)


    regions = circleSegmentData3.regions
    regionKeys = Object.keys(regions)

    for (let i = 0; i < regionKeys.length; i++) {
        region = regions[regionKeys[i]]
        region.curve.show(inSeconds=0.1)
    }

    
    
    regionsNumberText3 = rhyform.createText("4 <span style='color: grey;'>regions</span>").place.below(pointNumberText3).loadWith.fontSize(visualization.circleScene.regionText.fontSize).loadWith.textAlign('center').loadWith.color('white').addTag('pointRegionsText')
    regionsNumberText3.show(inSeconds=0.3).startNextImmediately()

    rhyform.showElementsWithTag('regionCount-circleSegmented3', inSeconds=0.3)


    rhyform.wait(1)

    regionsNumberText1.change.color('hsla(198, 100%, 50%, 1)')
    regionsNumberText2.change.color('hsla(198, 100%, 50%, 1)')
    regionsNumberText3.change.color('hsla(198, 100%, 50%, 1)')



    rhyform.hideElementsWithTag('circleSegmented1', inSeconds=1).startNextImmediately()
    rhyform.hideElementsWithTag('circleSegmented2', inSeconds=1).startNextImmediately()
    rhyform.hideElementsWithTag('circleSegmented3', inSeconds=1)

    countsCountLabel = rhyform.createText('Points').place.at(x=visualization.circleScene.countsCountLabel.position[0], y=visualization.circleScene.countsCountLabel.position[1]).loadWith.fontSize(visualization.circleScene.pointNumberText1.fontSize).loadWith.color('grey').addTag('pointRegionsText')
    countsCountLabel.show(inSeconds=0.8).startNextImmediately()

    if (isMobile) {
        regionCountLabel = rhyform.createText('Regions').place.at(x=visualization.circleScene.regionsCountLabel.position[0], y=visualization.circleScene.regionsCountLabel.position[1]).loadWith.fontSize(visualization.circleScene.pointNumberText1.fontSize).loadWith.color('white').addTag('pointRegionsText')
        regionCountLabel.show(inSeconds=0.8).startNextImmediately()
    }
    else {

        regionCountLabel = rhyform.createText('Regions').place.below(countsCountLabel).loadWith.fontSize(visualization.circleScene.pointNumberText1.fontSize).loadWith.color('white').addTag('pointRegionsText')
        regionCountLabel.show(inSeconds=0.8).startNextImmediately()
    }


    // console.log({x: visualization.circleScene.changedPoint1Text.position[0], y: visualization.circleScene.changedPoint1Text.position[1]})
    pointNumberText1.change.place.to({x: visualization.circleScene.changedPoint1Text.position[0], y: visualization.circleScene.changedPoint1Text.position[1]}, inSeconds=0.8).startNextImmediately()
    pointNumberText1.change.content("1").startNextImmediately()

    if (isMobile) {
        regionsNumberText1.change.place.to({x: visualization.circleScene.changedRegionsPoint1Text .position[0], y: visualization.circleScene.changedRegionsPoint1Text.position[1]}, inSeconds=0.8).startNextImmediately()   
    }
    else {
        regionsNumberText1.change.place.below(pointNumberText1, undefined, inSeconds=0.8).startNextImmediately()
    }
    
    regionsNumberText1.change.content("1").startNextImmediately()

    pointNumberText2.change.place.to({x: visualization.circleScene.changedPoint2Text.position[0], y: visualization.circleScene.changedPoint2Text.position[1]}, inSeconds=0.8).startNextImmediately()
    pointNumberText2.change.content("2").startNextImmediately()


    if (isMobile) {
        regionsNumberText2.change.place.to({x: visualization.circleScene.changedRegionsPoint2Text.position[0], y: visualization.circleScene.changedRegionsPoint2Text.position[1]}, inSeconds=0.8).startNextImmediately()
    }
    else {
        regionsNumberText2.change.place.below(pointNumberText2, undefined, inSeconds=0.8).startNextImmediately()
    }
    regionsNumberText2.change.content("2").startNextImmediately()

    pointNumberText3.change.place.to({x: visualization.circleScene.changedPoint3Text.position[0], y: visualization.circleScene.changedPoint3Text.position[1]}, inSeconds=0.8).startNextImmediately()
    pointNumberText3.change.content("3").startNextImmediately()

    if (isMobile) {
        regionsNumberText3.change.place.to({x: visualization.circleScene.changedRegionsPoint3Text.position[0], y: visualization.circleScene.changedRegionsPoint3Text.position[1]}, inSeconds=0.8).startNextImmediately()
    }
    else {
        regionsNumberText3.change.place.below(pointNumberText3, undefined, inSeconds=0.8).startNextImmediately()
    }
    regionsNumberText3.change.content("4").startNextImmediately()



    circleSegmentData4 = await generateCircleSegmentation('circleSegmented4', 4, visualization.circleScene.circle1.radius, visualization.circleScene.circle1.center)

    circleSegmentData5 = await generateCircleSegmentation('circleSegmented5', 5, visualization.circleScene.circle2.radius, visualization.circleScene.circle2.center)

    circleSegmentData6 = await generateCircleSegmentation('circleSegmented6', 6,  visualization.circleScene.circle6.radius, visualization.circleScene.circle6.center)


    // rhyform.showElementsWithTag('circle', inSeconds=0.3)

    circleSegmentData4.mainCircle.show(inSeconds=0.34)
    circleSegmentData5.mainCircle.show(inSeconds=0.25)

    rhyform.wait(0.1)


    rhyform.showElementsWithTag('point-circleSegmented4', inSeconds=0.34)
    rhyform.showElementsWithTag('point-circleSegmented5', inSeconds=0.25)

    rhyform.wait(0.1)

    pointNumberText4 = rhyform.createText("4").place.at(x=visualization.circleScene.pointNumberText4.position[0], y=visualization.circleScene.pointNumberText4.position[1]).loadWith.fontSize(visualization.circleScene.pointNumberText1.fontSize).loadWith.textAlign('center').loadWith.color('white').addTag('pointRegionsText')
    pointNumberText4.show(inSeconds=0.3)

    pointNumberText5 = rhyform.createText("5").place.at(x=visualization.circleScene.pointNumberText5.position[0], y=visualization.circleScene.pointNumberText5.position[1]).loadWith.fontSize(visualization.circleScene.pointNumberText1.fontSize).loadWith.textAlign('center').loadWith.color('white').addTag('pointRegionsText')
    pointNumberText5.show(inSeconds=0.25)


    rhyform.wait(0.1)

    chords = circleSegmentData4.chords
    for (let i = 0; i < chords.length; i++) {
        chord  = chords[i]
        chord.draw(lengthPerSecond=10).startNextImmediately()
    }

    chords = circleSegmentData5.chords
    for (let i = 0; i < chords.length; i++) {
        chord  = chords[i]
        chord.draw(lengthPerSecond=10).startNextImmediately()
    }




    rhyform.wait(0.1)

    regions = circleSegmentData4.regions
    regionKeys = Object.keys(regions)

    for (let i = 0; i < regionKeys.length; i++) {
        region = regions[regionKeys[i]]
        region.curve.show(inSeconds=0.1).startNextImmediately()
    }

    if (isMobile) {
        regionsNumberText4 = rhyform.createText("8").place.at(x=visualization.circleScene.regionsPoint4Text.position[0], y=visualization.circleScene.regionsPoint4Text.position[1]).loadWith.fontSize(visualization.circleScene.regionText.fontSize).loadWith.textAlign('center').loadWith.color('white').addTag('pointRegionsText')
    }
    else {
        regionsNumberText4 = rhyform.createText("8").place.below(pointNumberText4).loadWith.fontSize(visualization.circleScene.regionText.fontSize).loadWith.textAlign('center').loadWith.color('white').addTag('pointRegionsText')
    }



    rhyform.showElementsWithTag('regionCount-circleSegmented4', inSeconds=0.3).startNextImmediately()


    regions = circleSegmentData5.regions
    regionKeys = Object.keys(regions)

    for (let i = 0; i < regionKeys.length; i++) {
        region = regions[regionKeys[i]]
        region.curve.show(inSeconds=0.1).startNextImmediately()
    }
    
    if (isMobile) {
        regionsNumberText5 = rhyform.createText("16").place.at(x=visualization.circleScene.regionsPoint5Text.position[0], y=visualization.circleScene.regionsPoint5Text.position[1]).loadWith.fontSize(visualization.circleScene.regionText.fontSize).loadWith.textAlign('center').loadWith.color('white').addTag('pointRegionsText')
    }
    else {

        regionsNumberText5 = rhyform.createText("16").place.below(pointNumberText5).loadWith.fontSize(visualization.circleScene.regionText.fontSize).loadWith.textAlign('center').loadWith.color('white').addTag('pointRegionsText')
    }

    rhyform.showElementsWithTag('regionCount-circleSegmented5', inSeconds=0.3).startNextImmediately()

    regionsNumberText4.show(inSeconds=0.3).startNextImmediately()
    regionsNumberText5.show(inSeconds=0.3).startNextImmediately()

    
    regionsNumberText4.change.color('hsla(198, 100%, 50%, 1)')
    regionsNumberText5.change.color('hsla(198, 100%, 50%, 1)')



    rhyform.wait(0.1)

    
    circleSegmentData6.mainCircle.show(inSeconds=0.1)
    
    rhyform.showElementsWithTag('point-circleSegmented6', inSeconds=0.1)

    
    pointNumberText6 = rhyform.createText("6").place.at(x=visualization.circleScene.pointNumberText6.position[0], y=visualization.circleScene.pointNumberText6.position[1]).loadWith.fontSize(visualization.circleScene.pointNumberText1.fontSize).loadWith.color('white').addTag('pointRegionsText')
    pointNumberText6.show(inSeconds=0.25).startNextImmediately()


    chords = circleSegmentData6.chords
    for (let i = 0; i < chords.length; i++) {
        chord  = chords[i]
        chord.draw(lengthPerSecond=10).startNextImmediately()
    }



    regions = circleSegmentData6.regions
    regionKeys = Object.keys(regions)

    for (let i = 0; i < regionKeys.length; i++) {
        region = regions[regionKeys[i]]
        region.curve.show(inSeconds=0.1)
    }
    
    rhyform.wait(0.1)

    if (isMobile) {
        regionsNumberText6 = rhyform.createText("31 😒").place.at(x=visualization.circleScene.regionsPoint6Text.position[0], y=visualization.circleScene.regionsPoint6Text.position[1]).loadWith.fontSize(visualization.circleScene.regionText.fontSize).loadWith.color('white').addTag('pointRegionsText')
    }
    else {

        regionsNumberText6 = rhyform.createText("31 😒").place.below(pointNumberText6).loadWith.fontSize(visualization.circleScene.regionText.fontSize).loadWith.color('orange').addTag('pointRegionsText')
    }

    rhyform.showElementsWithTag('regionCount-circleSegmented6', inSeconds=0.2)

    
    regionsNumberText6.show(inSeconds=0.3).startNextImmediately()


    pointNumberText7 = rhyform.createText("7").place.at(x=visualization.circleScene.pointNumberText7.position[0], y=visualization.circleScene.pointNumberText7.position[1]).loadWith.fontSize(visualization.circleScene.pointNumberText1.fontSize).loadWith.color('white').loadWith.textAlign('center').loadWith.width(2).addTag('pointRegionsText')
    pointNumberText7.show(inSeconds=0.25).startNextImmediately()

    buttonTry7GradientColor = rhyform.createGradient(at=[{position: 0, color: 'hsla(41, 100%, 70%, 1)'}, {position: 0.2, color: 'hsla(41, 100%, 50%, 1)'}, {position: 1, color: 'hsla(198, 100%, 70%, 1)'}])

    if (isMobile) {
        regionsNumberText7Button = rhyform.createButton('Try', onClick=showCircleInteractivePart)
        .loadWith.fontSize(visualization.circleScene.regionText.fontSize)
        .loadWith.width(visualization.circleScene.regionsPoint7Text.width).place.at(x=visualization.circleScene.regionsPoint7Text.position[0], y=visualization.circleScene.regionsPoint7Text.position[1]).addTag('pointRegionsText').loadWith.color(buttonTry7GradientColor)
    }
    else {
        regionsNumberText7Button = rhyform.createButton('Try', onClick=showCircleInteractivePart)
        .loadWith.fontSize(visualization.circleScene.regionText.fontSize)
        .loadWith.width(visualization.intro.startButtonWidth).place.below(pointNumberText7).addTag('pointRegionsText').loadWith.color(buttonTry7GradientColor)
    }


    regionsNumberText7Button.show()

    // regionsNumberText7 = rhyform.
    // rhyform.wait(1)

    // regionsNumberText6.change.color('hsla(198, 100%, 50%, 1)')


    // rhyform.wait(1)



    patternGradient = rhyform.createGradient(at=[{position: 0, color: 'hsla(199, 100%, 70%, 1)'}, {position: 0.7, color: 'hsla(34, 100%, 50%, 1)'}, {position: 1, color: 'hsla(41, 100%, 70%, 1)'}])

    patternsFooledYaText = rhyform.createText('Patterns fooled ya. :)').place.at(x=visualization.circleScene.patternsFooledYaText.position[0], y=visualization.circleScene.patternsFooledYaText.position[1]).loadWith.fontSize(visualization.circleScene.patternsFooledYaText.fontSize).loadWith.color(patternGradient).loadWith.width(6)

    howTheyFoolYaText = rhyform.createText('How they fool ya!').place.below(patternsFooledYaText).loadWith.fontSize(visualization.circleScene.howTheyFoolYaText.fontSize).loadWith.color('white').loadWith.width(6)




    rhyform.wait(1)


    rhyform.hideElementsWithTag('circleSegmented4', inSeconds=0.3)
    rhyform.hideElementsWithTag('circleSegmented5', inSeconds=0.3)

    patternsFooledYaText.write()

    piFigure = await rhyform.generateVectorImage('pi-dont-know.jpg', at={x: visualization.circleScene.piFigure.position[0], y:visualization.circleScene.piFigure.position[1]}, color="none",  fillcolor='hsla(198, 10%, 80%, 1)', width=5)
    
    // piFigure.addTag('intro')
    piSad = await rhyform.generateVectorImage('pi-sad.jpg', at={x: visualization.circleScene.piFigure.position[0], y: visualization.circleScene.piFigure.position[1]}, color="none",  fillcolor='hsla(198, 10%, 80%, 1)', width=5)

    
    piFigure.show().startNextImmediately()

    rhyform.wait(1.9)
    
    // piFigure.addTag('intro')
    // piFigure.show().startNextImmediately()

    howTheyFoolYaText.write()
    rhyform.wait(2.2)
    howTheyFoolYaText.write(lettersPerSecond=8)
    rhyform.wait(1.3)

    piFigure.hide(inSeconds=0.01).startNextImmediately()
    piSad.show(inSeconds=0.01).startNextImmediately()
    howTheyFoolYaText.write(lengthPerSecond=8)
    rhyform.wait(1.3)
    howTheyFoolYaText.write(lengthPerSecond=6)


    rhyform.wait(0.5)

    
    rhyform.hideElementsWithTag('circleSegmented6', inSeconds=0.3)
    rhyform.hideElementsWithTag('pointRegionsText', inSeconds=0.3)

    

    patternsFooledYaText.hide(inSeconds=0.3)
    howTheyFoolYaText.hide(inSeconds=0.3)
    piSad.hide(inSeconds=0.3).startNextImmediately()


    rhyform.runFunction(borweinIntegralScene)

    scene.play()
}






visualization.borweinScene = {
    originPoint: {
        x: isMobile ? -9 : -6,
    },
    finalPoint: {
        x: isMobile ? 10 : 13,
    },

    curveScale : isMobile ? 1 : 3,
    sampleUpto : isMobile ? 10 : 7,
    curveGraphEquation: {
        position: isMobile ? {x: -8.3, offsetY: 2} : {x: -3, offsetY: 2},
    },

    areaEquation: {
        position: isMobile ? {x: -8.3, offsetY: -1} : {x: 6, offsetY: 2},
    },

    firstEquationY: isMobile ? 1 : 4.7,
    equationX: isMobile ? -8.5 : -6,
    equationWidth: isMobile ? 4 : 6,
    equationFontSize: isMobile ? '17px' : '22px',
    equationFontSizeForCurves : isMobile ? 1 : 1.3,
    equationYIncreaseFactor : isMobile ? 1.3 : 1,
    graphStart: isMobile ? 3.5 : 4.7,

    howTheyFoolYaText: {
        position: isMobile ? [-8, -14] : [6, 0],
        fontSize: isMobile ? '19px' : '25px',
    },
}



async function borweinIntegralScene() {

    document.getElementById('mainDisplay').scrollIntoView({behavior: 'smooth', block: 'start'});

    clearScenes()

    var borweinScene = rhyform.createScene('Borwein Integral Scene');

    borweinScene.selectSpace(space);

    visualizationScenes.borweinScene = borweinScene

    visualization.currentMainScene = borweinScene

    // mainSong.pause().startNextImmediately()
    
    mainSong = rhyform.createAudio('how-they-fool-ya.m4a')
    mainSong.play(from=134.15).startNextImmediately()


    borweinGraphStartY = visualization.borweinScene.graphStart

    borweinObjects = {}
    borweinObjects.funcBorwien = getPoints(borwein, 0, visualization.borweinScene.sampleUpto, 150, {n:1})
    borweinObjects.borweinPoints = []
    borweinObjects.borweinPositivePoints = []
    borweinObjects.borweinNegativePoints = []

    originPoint = rhyform.createPoint().place.at(x=visualization.borweinScene.originPoint.x, y=borweinGraphStartY).addTag('borwein')
    borweinObjects.borweinPositivePoints.push(originPoint)
    borweinObjects.borweinNegativePoints.push(originPoint)

    for (let i = 0; i < borweinObjects.funcBorwien.length; i++) {
        pointXYvalues = borweinObjects.funcBorwien[i]
        point = rhyform.createPoint().place.at(x=pointXYvalues[0]*visualization.borweinScene.curveScale + visualization.borweinScene.originPoint.x, y=2*pointXYvalues[1] + borweinGraphStartY).addTag('borwein')
        borweinObjects.borweinPoints.push(point)

        if (pointXYvalues[1] > 0) {
            borweinObjects.borweinPositivePoints.push(point)
            zeroPoint = rhyform.createPoint().place.at(x=pointXYvalues[0]*visualization.borweinScene.curveScale + visualization.borweinScene.originPoint.x, y=borweinGraphStartY).addTag('borwein')
            borweinObjects.borweinNegativePoints.push(zeroPoint)
        }
        else {
            zeroPoint = rhyform.createPoint().place.at(x=pointXYvalues[0]*visualization.borweinScene.curveScale + visualization.borweinScene.originPoint.x, y=borweinGraphStartY).addTag('borwein')
            borweinObjects.borweinPositivePoints.push(zeroPoint)
            borweinObjects.borweinNegativePoints.push(point)
        }
    }

    finalPoint = rhyform.createPoint().place.at(x=visualization.borweinScene.finalPoint.x, y=borweinGraphStartY).addTag('borwein')

    borweinObjects.borweinPositivePoints.push(finalPoint)
    borweinObjects.borweinNegativePoints.push(finalPoint)

    borweinObjects.borweinCurve = rhyform.createCurve(borweinObjects.borweinPoints).loadWith.color('hsla(198, 100%, 70%, 0.4)').loadWith.fillColor('none').loadWith.size(0.1).addTag('borwein')

    borweinObjects.borweinPositiveCurve = rhyform.createCurve(borweinObjects.borweinPositivePoints).loadWith.color('none').set.fillColor('hsla(198, 100%, 70%, 0.2)').addTag('borwein')

    borweinObjects.borweinNegativeCurve = rhyform.createCurve(borweinObjects.borweinNegativePoints).loadWith.color('none').set.fillColor('hsla(40, 100%, 70%, 0.2)').addTag('borwein')

    functionEndPointsXY = [[visualization.borweinScene.originPoint.x, borweinGraphStartY], [visualization.borweinScene.finalPoint.x, borweinGraphStartY]]

    startp = rhyform.createPoint().place.at(x=functionEndPointsXY[0][0], y=functionEndPointsXY[0][1])
    endp = rhyform.createPoint().place.at(x=functionEndPointsXY[1][0], y=functionEndPointsXY[1][1])
    xaxisLine = rhyform.createLine().place.between(startp, endp).loadWith.color('grey').addTag('borwein')

    xaxisLine.draw(lengthPerSecond=30).startNextImmediately()
    borweinObjects.borweinCurve.draw()
    borweinObjects.borweinPositiveCurve.show();
    borweinObjects.borweinNegativeCurve.show();

    borweinObjects.equation = await rhyform.generateEquation(expression='\\frac{\\sin(x)}{x}', at={x:visualization.borweinScene.curveGraphEquation.position.x, y: borweinGraphStartY + visualization.borweinScene.curveGraphEquation.position.offsetY}, color='hsla(198, 100%, 70%, 1)', fontSize=visualization.borweinScene.equationFontSizeForCurves)

    borweinObjects.equation.addTag('borwein')

    // borweinObjects.equation = rhyform.createText('$$ \\frac{\\sin(x)}{x} $$').place.at(x=-3, y= 7).loadWith.fontSize('22px').loadWith.color('lightgrey').loadWith.width(6).loadWith.textAlign('left').addTag('b-equations')
    
    borweinObjects.equation.show(inSeconds=0.3)

    // borweinObjects.areaEquation = rhyform.createText('$$ Area = \\frac{\\pi}{2} $$').place.at(x=2, y= 7).loadWith.fontSize('22px').loadWith.color('lightgrey').loadWith.width(6).loadWith.textAlign('left').addTag('b-equations')

    borweinObjects.areaEquation = await rhyform.generateEquation(expression='Area = \\frac{\\pi}{2}', at={x:visualization.borweinScene.areaEquation.position.x, y: borweinGraphStartY + visualization.borweinScene.areaEquation.position.offsetY}, color='lightgrey', fontSize=visualization.borweinScene.equationFontSizeForCurves)

    borweinObjects.areaEquation.addTag('borwein')

    borweinObjects.areaEquation.show(inSeconds=0.3)


    async function changeBorweinCurve(curveNumber) {
        borweinObjects.funcBorwien = getPoints(borwein, 0, visualization.borweinScene.sampleUpto, 150, {n:curveNumber})
        borweinObjects.borweinPoints = []
        borweinObjects.borweinPositivePoints = []
        borweinObjects.borweinNegativePoints = []

        originPoint = [visualization.borweinScene.originPoint.x, borweinGraphStartY]
        borweinObjects.borweinPositivePoints.push(originPoint)
        borweinObjects.borweinNegativePoints.push(originPoint)

        for (let i = 0; i < borweinObjects.funcBorwien.length; i++) {
            pointXYvalues = borweinObjects.funcBorwien[i]
            borweinObjects.borweinPoints.push([pointXYvalues[0]*visualization.borweinScene.curveScale + visualization.borweinScene.originPoint.x, 2*pointXYvalues[1] + borweinGraphStartY])

            if (pointXYvalues[1] > 0) {
                borweinObjects.borweinPositivePoints.push([pointXYvalues[0]*visualization.borweinScene.curveScale + visualization.borweinScene.originPoint.x, 2*pointXYvalues[1] + borweinGraphStartY])
                zeroPoint = [pointXYvalues[0]*visualization.borweinScene.curveScale + visualization.borweinScene.originPoint.x, borweinGraphStartY]
                borweinObjects.borweinNegativePoints.push(zeroPoint)
            }
            else {
                
                borweinObjects.borweinNegativePoints.push([pointXYvalues[0]*visualization.borweinScene.curveScale + visualization.borweinScene.originPoint.x, 2*pointXYvalues[1] + borweinGraphStartY])
                zeroPoint = [pointXYvalues[0]*visualization.borweinScene.curveScale + visualization.borweinScene.originPoint.x, borweinGraphStartY]
                borweinObjects.borweinPositivePoints.push(zeroPoint)
            }
        }

        finalPoint = [visualization.borweinScene.finalPoint.x, borweinGraphStartY]

        borweinObjects.borweinPositivePoints.push(finalPoint)
        borweinObjects.borweinNegativePoints.push(finalPoint)

        
        

        borweinObjects.borweinCurve.change.points(borweinObjects.borweinPoints).startNextImmediately()
        borweinObjects.borweinPositiveCurve.change.points(borweinObjects.borweinPositivePoints).startNextImmediately()
        borweinObjects.borweinNegativeCurve.change.points(borweinObjects.borweinNegativePoints).startNextImmediately()

        equationString = ""

        if (curveNumber <= 5) {
            for (let i = 1; i <= curveNumber; i = i + 2) {
                if (i == 1) {
                    equationString += "\\frac{\\sin(x)}{x} "
                }
                else {
                    equationString += "\\frac{\\sin(" + i + "x)}{" + i + "x} "
                }
            }
        }
        else {
            for (let i = 1; i <= curveNumber; i = i + 2) {
                if (i == 1) {
                    equationString += "\\frac{\\sin(x)}{x} "
                }
                else {
                    if (i == curveNumber || i == curveNumber - 2 || i <= 5) {
                        equationString += "\\frac{\\sin(" + i + "x)}{" + i + "x} "
                    }
                }

                if (i == 5 + 2 && i != curveNumber) {
                    equationString += "\\cdots "
                }
            }
        }
        

        await borweinObjects.equation.change.expression(equationString)

    }

    



    // rhyform.wait(3.6)


    firstEquationY = visualization.borweinScene.firstEquationY

    equation1 = rhyform.createText('$$ \\int_{0}^{\\infty} \\color{#4bcaff}\\frac{\\sin(x)}{x} \\color{#fbf4f4} \\, dx   = \\frac{\\pi}{2} $$').place.at(x=visualization.borweinScene.equationX, y= firstEquationY).loadWith.fontSize(visualization.borweinScene.equationFontSize).loadWith.color('lightgrey').loadWith.width(visualization.borweinScene.equationWidth).loadWith.textAlign('left').addTag('equations')

    // equation1 = await rhyform.generateEquation(expression="\\int_{0}^{\\infty} \\frac{\\sin(x)}{x} \\, dx   = \\frac{\\pi}{2}", at={x:-6, y: 6}, color='hsla(198, 100%, 70%, 1)', fontSize=1.3)
    equation1.show(inSeconds=0.3)

    

    rhyform.wait(1.2)

    await changeBorweinCurve(3)

    // equation2 = await rhyform.generateEquation(expression="\\int_{0}^{\\infty} \\frac{\\sin(x)}{x} \\frac{\\sin(x/3)}{x/3} \\, dx  = \\frac{\\pi}{2} ", at={x:-6, y: 4.5}, color='hsla(218, 100%, 70%, 1)', fontSize=1.3)

    equation2 = rhyform.createText('$$ \\int_{0}^{\\infty}  \\color{#4bcaff} \\frac{\\sin(x)}{x} \\color{#89a4ff} \\frac{\\sin(x/3)}{x/3} \\color{#fbf4f4} \\, dx  =  \\color{#fbf4f4}\\frac{\\pi}{2} $$').place.at(x=visualization.borweinScene.equationX, y= firstEquationY - visualization.borweinScene.equationYIncreaseFactor*1.5).loadWith.fontSize(visualization.borweinScene.equationFontSize).loadWith.color('lightgrey').loadWith.width(visualization.borweinScene.equationWidth).loadWith.textAlign('left').addTag('equations')
    equation2.show(inSeconds=0.3)

    await changeBorweinCurve(5)

    // equation3 = await rhyform.generateEquation(expression="\\int_{0}^{\\infty} \\frac{\\sin(x)}{x} \\color{#89a4ff} \\frac{\\sin(x/3)}{x/3} \\frac{\\sin(x/5)}{x/5} \\color{#fbf4f4} \\, dx   = \\frac{\\pi}{2}", at={x:-6, y: 3}, color='hsla(238, 100%, 70%, 1)', fontSize=1.3)

    equation3 = rhyform.createText('$$ \\int_{0}^{\\infty}  \\color{#4bcaff} \\frac{\\sin(x)}{x} \\color{#89a4ff} \\frac{\\sin(x/3)}{x/3} \\color{#b59bff} \\frac{\\sin(x/5)}{x/5} \\color{#fbf4f4} \\, dx   = \\color{#fbf4f4}\\frac{\\pi}{2} $$').place.at(x=visualization.borweinScene.equationX, y= firstEquationY - visualization.borweinScene.equationYIncreaseFactor*3).loadWith.fontSize(visualization.borweinScene.equationFontSize).loadWith.color('lightgrey').loadWith.width(visualization.borweinScene.equationWidth).loadWith.textAlign('left').addTag('equations')
    equation3.show(inSeconds=0.3)

    await changeBorweinCurve(7)

    // equation4 = await rhyform.generateEquation(expression="\\int_{0}^{\\infty}  \\color{#4bcaff} \\frac{\\sin(x)}{x} \\color{#89a4ff} \\frac{\\sin(x/3)}{x/3} \\color{#b59bff} \\frac{\\sin(x/5)}{x/5} \\frac{\\sin(x/7)}{x/7} \\color{#fbf4f4} \\, dx   = \\frac{\\pi}{2}", at={x:-6, y: 1.5}, color='hsla(258, 100%, 70%, 1)', fontSize=1.3)

    equation4 = rhyform.createText('$$ \\int_{0}^{\\infty}  \\color{#4bcaff} \\frac{\\sin(x)}{x} \\color{#89a4ff} \\frac{\\sin(x/3)}{x/3} \\color{#b59bff} \\frac{\\sin(x/5)}{x/5} \\color{#d789ff} \\frac{\\sin(x/7)}{x/7} \\color{#fbf4f4} \\, dx   = \\color{#fbf4f4}\\frac{\\pi}{2} $$').place.at(x=visualization.borweinScene.equationX, y= firstEquationY - visualization.borweinScene.equationYIncreaseFactor*4.5).loadWith.fontSize(visualization.borweinScene.equationFontSize).loadWith.color('lightgrey').loadWith.width(visualization.borweinScene.equationWidth).loadWith.textAlign('left').addTag('equations')
    equation4.show(inSeconds=0.2)

    middleDots = rhyform.createText('...').place.at(x=visualization.borweinScene.equationX + 2, y= firstEquationY - visualization.borweinScene.equationYIncreaseFactor*5.5).loadWith.fontSize('25px').loadWith.color('lightgrey').loadWith.width(6).addTag('equations')

    middleDots.show(inSeconds=0.1)

    rhyform.wait(0.2)

    await changeBorweinCurve(13)
    // equation5 = await rhyform.generateEquation(expression="\\int_{0}^{\\infty}  \\color{#4bcaff} \\frac{\\sin(x)}{x} \\color{#89a4ff} \\frac{\\sin(x/3)}{x/3} \\color{#b59bff} \\frac{\\sin(x/5)}{x/5} \\color{#d789ff} \\frac{\\sin(x/7)}{x/7} ... \\frac{\\sin(x/13)}{x/13} \\color{#fbf4f4} \\, dx  = \\frac{\\pi}{2}", at={x:-6, y: -0.5}, color='hsla(278, 100%, 70%, 1)', fontSize=1.3)

    equation5 = rhyform.createText('$$ \\int_{0}^{\\infty}  \\color{#4bcaff} \\frac{\\sin(x)}{x} \\color{#89a4ff} \\frac{\\sin(x/3)}{x/3} \\color{#b59bff} \\frac{\\sin(x/5)}{x/5} \\color{#d789ff} \\frac{\\sin(x/7)}{x/7} ... \\color{#ff89b1} \\frac{\\sin(x/13)}{x/13} \\color{#fbf4f4} \\, dx  = \\color{#fbf4f4}\\frac{\\pi}{2} $$').place.at(x=visualization.borweinScene.equationX, y= firstEquationY - visualization.borweinScene.equationYIncreaseFactor*6).loadWith.fontSize(visualization.borweinScene.equationFontSize).loadWith.color('lightgrey').loadWith.width(6).loadWith.textAlign('left').addTag('equations')

    equation5.show(inSeconds=1)

    rhyform.wait(1)

    await changeBorweinCurve(15)
    await borweinObjects.areaEquation.change.expression('Area = ??')

    rhyform.drawingPrecision = 2

    equation6 = await rhyform.generateEquation(expression="\\int_{0}^{\\infty} \\frac{\\sin(x)}{x} \\frac{\\sin(x/3)}{x/3} \\frac{\\sin(x/5)}{x/5} \\frac{\\sin(x/7)}{x/7} ... \\frac{\\sin(x/13)}{x/13}  \\frac{\\sin(x/15)}{x/15} \\, dx = ? ", at={x:visualization.borweinScene.equationX, y: firstEquationY - visualization.borweinScene.equationYIncreaseFactor*7.7}, color='hsla(278, 100%, 85%, 1)', fontSize=visualization.borweinScene.equationFontSizeForCurves)

    if (isMobile) {
        equation6SecondPart = await rhyform.generateEquation(expression="= ", at={x:visualization.borweinScene.equationX, y: firstEquationY - visualization.borweinScene.equationYIncreaseFactor*7.7 - 2}, color='hsla(278, 100%, 85%, 1)', fontSize=visualization.borweinScene.equationFontSizeForCurves)
        equation6SecondPart.addTag('equations')
    }

    equation6.addTag('equations')

    rhyform.drawingPrecision = 10

    // equation6 = await rhyform.generateEquation(expression="x - 2 + 44", at={x:-6, y: -3}, color='hsla(278, 100%, 85%, 1)', fontSize=visualization.borweinScene.equationFontSizeForCurves)

    
    if (isMobile) {
        equation6.show(inSeconds=0.2).startNextImmediately()
        equation6SecondPart.show(inSeconds=0.2)
    }
    else {
        equation6.show(inSeconds=0.2)
    }

    rhyform.wait(1.5)

    if (isMobile) {
        equation6SecondPartChange = await equation6SecondPart.change.expression('\\frac{\\pi}{2} - 0.000000000000321006...', inSeconds=3)

        await equation6SecondPartChange.startNextImmediately()
    }
    else {

        equation6Change = await equation6.change.expression('\\int_{0}^{\\infty} \\frac{\\sin(x)}{x} \\frac{\\sin(x/3)}{x/3} \\frac{\\sin(x/5)}{x/5} \\frac{\\sin(x/7)}{x/7} ... \\frac{\\sin(x/13)}{x/13}  \\frac{\\sin(x/15)}{x/15} \\, dx = \\frac{\\pi}{2} - 0.000000000000321006...', inSeconds=3)
        
        await equation6Change.startNextImmediately()
    }
    
    // equation6Change.startNextImmediately()


    await borweinObjects.areaEquation.change.expression('Area = \\frac{\\pi}{2}  - 0.000000000000321006...')


    rhyform.wait(3.5)
    
    
    // equation6Change = await equation6.change.expression('y - 3 = 3', inSeconds=3)


    // https://phys.org/news/2019-07-illusive-patterns-math-ideas-physics.html

    
    patternsFooledYaText = rhyform.createText("Pattern fooled ya. :)").place.at(x=visualization.borweinScene.howTheyFoolYaText.position[0], y=visualization.borweinScene.howTheyFoolYaText.position[1]).loadWith.fontSize(visualization.circleScene.patternsFooledYaText.fontSize).loadWith.color('hsla(198, 100%, 70%, 1)').loadWith.width(6)

    // if (patternsFooledYaText != null) {
    //     patternsFooledYaText.change.place.to({x: 6, y: 0}, inSeconds=0.3)
    //     patternsFooledYaText.change.content("Pattern fooled ya. :)")
    // }
    // else {
    // }

    // if (howTheyFoolYaText != null) {
    //     howTheyFoolYaText.change.place.below(patternsFooledYaText, inSeconds=0.3)
    // }
    // else {
        
    // }
    howTheyFoolYaText = rhyform.createText("How they fool ya!").place.below(patternsFooledYaText).loadWith.fontSize(visualization.circleScene.howTheyFoolYaText.fontSize).loadWith.color('white').loadWith.width(6)
    rhyform.wait(1)

    patternsFooledYaText.write()
    rhyform.wait(3.7)
    howTheyFoolYaText.write()
    rhyform.wait(2.2)
    howTheyFoolYaText.write(lettersPerSecond=8)
    rhyform.wait(1.3)
    howTheyFoolYaText.write(lengthPerSecond=6)
    rhyform.wait(2)


    rhyform.wait(1)
    rhyform.hideElementsWithTag('equations', inSeconds=0.3)
    rhyform.hideElementsWithTag('borwein', inSeconds=0.5)
    howTheyFoolYaText.hide()
    // console.log(scene)

    patternsFooledYaText.hide(inSeconds=0.3).startNextImmediately()

    rhyform.runFunction(primeModulo4Scene)

    borweinScene.play()

    // setTimeout(function() {
    //     // get audio current time in float
    //     setInterval(function() {
    //         console.log(document.getElementsByTagName('audio')[0].currentTime)
    //     }, 100);

    // }, 100);
}

visualization.primeModulo4Scene = {
    spiralObjectsCenteredAt: isMobile ? [-6, -10] : [9, -2],
    spiralObjectsDistanceScaledDown: isMobile ? 7 : 10,
    x: isMobile ? -7 : -3,
    base4x: isMobile ? 3 : 6,
    isAlsoPrimeTextOffset: isMobile ? -0.5 : 0.5,
    isAlsoPrimeTextWidth: isMobile ? 2 : 3,
    thankYouWidth : isMobile ? 5 : 10,
    thankYouX: isMobile ? -8 : -3,
}
async function primeModulo4Scene() {
    
    document.getElementById('mainDisplay').scrollIntoView({behavior: 'smooth', block: 'start'});
    if (visualizationScenes.circleScene) {
        visualizationScenes.circleScene.clear()
        rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.circleScene.name)
    }

    if (visualizationScenes.borweinScene) {
        visualizationScenes.borweinScene.clear()
        rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.borweinScene.name)
    }

    if (visualizationScenes.intro) {
        visualizationScenes.intro.clear()
        rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.intro.name)
    }

    if (visualizationScenes.primeModulo4Scene) {
        visualizationScenes.primeModulo4Scene.clear()
        rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.primeModulo4Scene.name)
    }



    var primeModulo4Scene = rhyform.createScene('Prime Modulo 4 Scene');

    primeModulo4Scene.selectSpace(space);

    visualizationScenes.primeModulo4Scene = primeModulo4Scene

    visualization.currentMainScene = primeModulo4Scene

    // console.log(document.getElementsByTagName('audio')[0].currentTime)

    // if (visualizationScenes.circleScene) {
    //     visualizationScenes.circleScene.clear()
    //     rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.circleScene.name)
    // }

    // if (visualizationScenes.borweinScene) {
    //     visualizationScenes.borweinScene.clear()
    //     rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.borweinScene.name)
    // }

    // if (visualizationScenes.intro) {
    //     visualizationScenes.intro.clear()
    //     rhyform.deleteElementsWithTag('<scene>' + visualizationScenes.intro.name)
    // }

    
    mainSong = rhyform.createAudio('how-they-fool-ya.m4a')
    // mainSong.pause().startNextImmediately()
    mainSong.play(from=178.15).startNextImmediately()

    primeModulo4Objects = {}

    rhyform.wait(3)

    primeModulo4Objects.spiralObjects = {}

    primeModulo4Objects.spiralObjectsCenteredAt = visualization.primeModulo4Scene.spiralObjectsCenteredAt
    primeModulo4Objects.spiralObjectsDistanceScaledDown = visualization.primeModulo4Scene.spiralObjectsDistanceScaledDown

    primeModulo4Objects.spiralObjectsCoordinates = polarCoordinatesForSpiralUptoN(33)

    function addSpiralObjects(start, end) {
        for (let m = start; m < end; m++) {
            point = primeModulo4Objects.spiralObjectsCoordinates[m]

            primeModulo4Objects.spiralObjects[m] = rhyform.createPoint().place.at(x=primeModulo4Objects.spiralObjectsCenteredAt[0] + (point[0]/primeModulo4Objects.spiralObjectsDistanceScaledDown), y=primeModulo4Objects.spiralObjectsCenteredAt[1] + (point[1]/primeModulo4Objects.spiralObjectsDistanceScaledDown)).loadWith.color('hsla(198, 100%, 70%, 1)').addTag('primeModulo4').loadWith.size(0.1)

            if (isPrime(m)) {
                primeModulo4Objects.spiralObjects[m].loadWith.color('hsla(40, 100%, 70%, 1)')
                if (isPrime(parseInt(m.toString(4)))) {
                    primeModulo4Objects.spiralObjects[m].loadWith.color('hsla(198, 100%, 70%, 1)')
                    
                }
                else {
                    primeModulo4Objects.spiralObjects[m].loadWith.size(0.2)
                }
            }
            else {
                primeModulo4Objects.spiralObjects[m].loadWith.color('hsla(40, 0%, 70%, 0.4)')
            }



            primeModulo4Objects.spiralObjects[m].show(inSeconds=0.05)
        }
    }

    addSpiralObjects(0, 6)


    primeModulo4Objects.primeText = rhyform.createText('Prime').place.at(x=visualization.primeModulo4Scene.x, y=6).loadWith.fontSize('25px').loadWith.color('hsla(310, 100%, 80%, 1)').addTag('primeModulo4')

    primeModulo4Objects.prime5InBase10 = rhyform.createText('<div style="font-size: small; color: grey;">BASE 10</div>5').place.at(x=visualization.primeModulo4Scene.x, y= 4).loadWith.fontSize('25px').loadWith.color('white').addTag('primeModulo4')

    primeModulo4Objects.prime5InBase4 = rhyform.createText('<div style="font-size: small; color: grey;">BASE 4</div>11').place.at(x=visualization.primeModulo4Scene.x + visualization.primeModulo4Scene.base4x, y= 4).loadWith.fontSize('25px').loadWith.color('white').addTag('primeModulo4')

    primeModulo4Objects.primeText.show(inSeconds=0.3)
    primeModulo4Objects.prime5InBase10.show(inSeconds=0.3)
    rhyform.wait(1)
    primeModulo4Objects.prime5InBase4.show(inSeconds=0.3)


    rhyform.wait(1)

    primeModulo4Objects.isAlsoPrimeText = rhyform.createText('<span style="color: grey;">is also a </span>prime <span style="color: grey;">(in base 10)</span>').place.rightOf( primeModulo4Objects.prime5InBase4, atDistance=visualization.primeModulo4Scene.isAlsoPrimeTextOffset).loadWith.fontSize('medium').loadWith.color('hsla(310, 100%, 80%, 1)').loadWith.width(visualization.primeModulo4Scene.isAlsoPrimeTextWidth).addTag('primeModulo4')

    primeModulo4Objects.isAlsoPrimeText.show(inSeconds=0.3)
    primeModulo4Objects.prime5InBase4.change.color('hsla(310, 100%, 80%, 1)').startNextImmediately()
    primeModulo4Objects.prime5InBase10.change.color('hsla(198, 100%, 80%, 1)')

    primeModulo4Objects.primeTextObjects = {}

    rhyform.wait(1)

    for (let i = 4; i <= 14; i++) {
        primeModulo4Objects.primeTextObjects[i] = {}

        primeInBase10 = nthPrime(i)
        primeInBase4 = primeInBase10.toString(4)

        rhyform.wait(i < 10 ? 0.3 : 0.01)

        

        if (i == 4) {
            primeModulo4Objects.primeTextObjects[i].base10Text = rhyform.createText(primeInBase10).place.below(primeModulo4Objects.prime5InBase10).loadWith.fontSize('25px').loadWith.color('white').addTag('primeModulo4')
            primeModulo4Objects.primeTextObjects[i].base4Text = rhyform.createText(primeInBase4).place.below(primeModulo4Objects.prime5InBase4).loadWith.fontSize('25px').loadWith.color('white').addTag('primeModulo4')
        }
        else {
            primeModulo4Objects.primeTextObjects[i].base10Text = rhyform.createText(primeInBase10).place.below(primeModulo4Objects.primeTextObjects[i-1].base10Text).loadWith.fontSize('25px').loadWith.color('white').addTag('primeModulo4')
            if (primeInBase4 == '133') {
                rhyform.wait(0.4)
                primeModulo4Objects.primeTextObjects[i].base4Text = rhyform.createText(primeInBase4 + " 😔").place.below(primeModulo4Objects.primeTextObjects[i-1].base4Text).loadWith.fontSize('25px').loadWith.color('white').addTag('primeModulo4')

                
            }
            else {
                primeModulo4Objects.primeTextObjects[i].base4Text = rhyform.createText(primeInBase4).place.below(primeModulo4Objects.primeTextObjects[i-1].base4Text).loadWith.fontSize('25px').loadWith.color('white').addTag('primeModulo4')
            }
            
        }

        primeModulo4Objects.primeTextObjects[i].base10Text.show(inSeconds=0.3)
        primeModulo4Objects.primeTextObjects[i].base4Text.show(inSeconds=0.3)



        
        //  color change if primeinbase4 is also prime
        if (isPrime(primeInBase4)) {
            primeModulo4Objects.primeTextObjects[i].base4Text.change.color('hsla(310, 100%, 80%, 1)').startNextImmediately()
            primeModulo4Objects.primeTextObjects[i].base10Text.change.color('hsla(198, 100%, 70%, 1)')
        }
        else {
            primeModulo4Objects.primeTextObjects[i].base4Text.change.color('hsla(40, 100%, 70%, 1)').startNextImmediately()
            primeModulo4Objects.primeTextObjects[i].base10Text.change.color('hsla(40, 100%, 70%, 1)')
            rhyform.wait(1)
        }

        addSpiralObjects(nthPrime(i - 1) + 1, nthPrime(i) + 1)

        if (primeInBase4 == '133') {

            gradientColorForPattern = rhyform.createGradient(at=[{position: 0, color: 'hsla(199, 100%, 70%, 1)'}, {position: 0.7, color: 'hsla(34, 100%, 50%, 1)'}, {position: 1, color: 'hsla(41, 100%, 70%, 1)'}])
            primeModulo4Objects.patternsFooledYa = rhyform.createText('Patterns fooled ya. :)').place.below(primeModulo4Objects.primeTextObjects[i].base10Text, atDistance=1).loadWith.fontSize('25px').loadWith.color(gradientColorForPattern).loadWith.width(6).addTag('primeModulo4')
            primeModulo4Objects.patternsFooledYa.show(inSeconds=1)

            primeModulo4Objects.howTheyFoolYa = rhyform.createText('How they fool ya!').place.below(primeModulo4Objects.patternsFooledYa).loadWith.fontSize('35px').loadWith.color('white').loadWith.width(6).addTag('primeModulo4')
            
            primeModulo4Objects.howTheyFoolYa.write()

            rhyform.wait(1)

            break;
        }

    }


    primeModulo4Objects.trySpiralsButton = rhyform.createButton('Try Paterson Primes on Spirals below', onClick=showSpiralInteractivePart).place.below(primeModulo4Objects.spiralObjects[31], atDistance=space.camera.labelDistance*2).loadWith.fontSize('15px').loadWith.color('white').loadWith.width(2.4).addTag('primeModulo4')

    primeModulo4Objects.trySpiralsButton.show(inSeconds=0.3).startNextImmediately()

    rhyform.wait(0.4)
    primeModulo4Objects.howTheyFoolYa.write()
    rhyform.wait(2)

    primeModulo4Objects.howTheyFoolYa.write(lettersPerSecond=8)
    rhyform.wait(1)
    primeModulo4Objects.howTheyFoolYa.write(lengthPerSecond=8)
    rhyform.wait(1)
    primeModulo4Objects.howTheyFoolYa.write(lengthPerSecond=6)
    rhyform.wait(2)


    rhyform.hideElementsWithTag('primeModulo4', inSeconds=0.3)


    rhyform.wait(1)

    // Thank you for watching

    thankYouForWatchingText = rhyform.createText('Thank you for watching! 💜').place.at(x=visualization.primeModulo4Scene.thankYouX, y=5).loadWith.fontSize('25px').loadWith.color('white').addTag('primeModulo4').loadWith.width(10)


    // Try the interactives below, the youtube video.

    tryTheInteractivesText = rhyform.createText('Try the interactives below, and also don\'t forget to watch the main video. 🎥<a href="https://www.youtube.com/watch?v=NOCsdhzo6Jg" style="color: hsla(198, 50%, 70%, 1);" target="blank"> How They Fool Ya (live) | Math parody of Hallelujah</a> 🎶').place.below(thankYouForWatchingText).loadWith.fontSize('medium').loadWith.color('grey').addTag('primeModulo4').loadWith.width(visualization.primeModulo4Scene.thankYouWidth)

    thankYouForWatchingText.write(lettersPerSecond=20)
    tryTheInteractivesText.write(lettersPerSecond=70)

    // There's more, if you want to more about why parabolas appear in average distance in squares, check out <a href="https://prajwalsouza.github.io/universal-parabolic-constant" style="color: hsla(198, 50%, 70%, 1);" target="blank"> The Parabolic Constant Mystery | Why does a parabola appear in problems associated with squares?</a>

    rhyform.wait(1)

    thereIsMoreText = rhyform.createText("Speaking of patterns, if you want to more about why parabolas appear in average distance in squares, check out <a href='https://prajwalsouza.github.io/universal-parabolic-constant' style='color: hsla(198, 50%, 70%, 1);' target='blank'> The Parabolic Constant Mystery | Why does a parabola appear in problems associated with squares?</a> 🔍📐").place.below(tryTheInteractivesText, atDistance=space.camera.labelDistance*5).loadWith.fontSize('medium').loadWith.color('grey').addTag('primeModulo4').loadWith.width(visualization.primeModulo4Scene.thankYouWidth)

    thereIsMoreText.write(lettersPerSecond=70)

    madeWithText = rhyform.createText("Made with <a href='https://github.com/prajwalsouza/RhyformJS' style='color: hsla(270, 50%, 70%, 1);' target='blank'>Rhyform.js </a>💜").place.below(thereIsMoreText, atDistance=space.camera.labelDistance*6).loadWith.fontSize('medium').loadWith.color('grey').addTag('primeModulo4').loadWith.width(visualization.primeModulo4Scene.thankYouWidth*0.7)

    madeWithText.write(lettersPerSecond=70)


    primeModulo4Scene.play()

}



function displaySeek() {
    if (visualization.currentMainScene.animationIndices) {
        progressSeekValue = visualization.currentMainScene.animationIndex/visualization.currentMainScene.animationIndices.length

        bodyScrollAt = document.body.scrollTop || document.documentElement.scrollTop
        if (progressSeekValue != undefined && bodyScrollAt < window.innerHeight/2) {
            document.getElementById('seekbar-inner-inner').style.backgroundImage = 'linear-gradient(to right, hsla(198, 100%, 50%, 1) 0%, hsla(40, 100%, 50%, 1) ' + progressSeekValue*100 + '%, hsla(198, 0%, 50%, 0.2) ' + progressSeekValue*100 + '%, hsla(198, 0%, 50%, 0) 100%)'
        }
        else {
            document.getElementById('seekbar-inner-inner').style.backgroundImage = 'linear-gradient(to right, hsla(198, 100%, 50%, 0) 0%, hsla(40, 100%, 50%, 0) ' + progressSeekValue*100 + '%, hsla(198, 0%, 50%, 0) ' + progressSeekValue*100 + '%, hsla(198, 0%, 50%, 0) 100%)'
        }
    }

}

setInterval(displaySeek, 10)
















function nthPrime(n) {

    if (n == 1) {
        return 2
    }
    else if (n == 2) {
        return 3
    }

    var primes = [2, 3]
    var number = 5
    var isPrime = true

    while (primes.length < n) {
        for (let k= 0; k < primes.length; k++) {
            if (number % primes[k] == 0) {
                isPrime = false
                break
            }
        }

        if (isPrime) {
            primes.push(number)
        }

        isPrime = true
        number += 2
    }

    return primes[primes.length - 1]
}


function isPrime(n) {
    // faster prime check algorithm


    if (n == 1) {
        return false
    }
    else if (n == 2) {
        return true
    }

    var isPrime = true

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            isPrime = false
            break
        }
    }

    return isPrime
}

function primeModuloBaseIsPrimeInBase10(prime, base) {
    // returns true if prime in base is also prime in base 10

    primeInBase10 = parseInt(prime.toString(base))

    return isPrime(primeInBase10)
}

async function loadCircleInteractivePart() {
    var circleInteractiveScene = rhyform.createScene('Circle Interactive Scene');
    var circleInteractiveSpace = rhyform.createSpaceInElement('#interactive1', name="circleInteractiveSpace");


    circleInteractiveSpace.camera.setBounds({x: -7, y: -15, width: 20, height: 20});
    circleInteractiveScene.selectSpace(circleInteractiveSpace);

    visualizationScenes.circleInteractiveScene = circleInteractiveScene

    // visualization.circleInteractive.vizTitleWidth = isMobile ? 10 : 13

    vizTitle = rhyform.createText("<div style='color: grey; font-size: small;'>INTERACTIVE</div>Regions inside a circle").place.at(x=-6, y=visualization.circleInteractive.vizTitleY).loadWith.fontSize(visualization.circleInteractive.vizTitleFontSize).loadWith.textAlign('center').loadWith.color('white').addTag('pointRegionsTitle').loadWith.width(13)
    vizTitle.show(inSeconds=0.3)

    sliderOptions = {
        at: {x: visualization.circleInteractive.pointsSliderPositionX, y: visualization.circleInteractive.pointsSliderPositionY},
        width: visualization.circleInteractive.pointsSliderWidth,
        min: 1,
        max: 45,
        value: 7,
        step: 1,
        labelTextProperties: {
            text: 'Points',
        },
        labelDescriptionProperties: {
            text: "Number of points.",
            color: 'hsla(0, 0%, 60%, 1)'
        },
        sliderProperties: {
            onChange: async function() {
                // contentToSet = numberOfPointsSlider.value + " <span style='color: grey;'>points</span>"
                // contentToSet = numberOfPointsSlider.value == 1 ? contentToSet.replace('points', 'point') : contentToSet
                // pointNumberTextN.set.content(contentToSet)
                vizTitle.set.content("Computing Regions...")
                setTimeout(() => {
                    visualizationScenes.circleInteractiveScene.clear()
                    rhyform.deleteElementsWithTag('pointRegionsTextN')
                    rhyform.deleteElementsWithTag('circleSegmentedN')

                    rhyform.selectActiveScene(visualizationScenes.circleInteractiveScene)
                    // circleInteractiveData.otherDetailsText.remove()
                    getRegionsForInteractive(numberOfPointsSlider.value)
                    // console.log(numberOfPointsSlider.value)
                }, 100);
            }
        }
    }

    numberOfPointsSlider = rhyform.createSlider(sliderOptions)
    numberOfPointsSlider.show()

    await getRegionsForInteractive(7)

}

visualization.circleInteractive = {}
visualization.circleInteractive.circleCenter = isMobile ? [3, -5] : [-2,1]
visualization.circleInteractive.circleRadius = isMobile ? 10 : 5
visualization.circleInteractive.pointsSliderPositionX = isMobile ? -7.5 : 5
visualization.circleInteractive.pointsSliderPositionY = isMobile ? -30 : 3
visualization.circleInteractive.pointsSliderWidth = isMobile ? 17 : 7

visualization.circleInteractive.regionsNumberTextLocation = isMobile ? {x: -7, y: -16} : {x: 5, y: 5}
visualization.circleInteractive.regionsNumberTextWidth = isMobile ? 15 : 7
visualization.circleInteractive.regionsExplanationTextLocation = isMobile ? {x: -7, y: -22} : {x: -8, y: -4.6}
visualization.circleInteractive.regionsExplanationTextWidth = isMobile ? 15 : 17
visualization.circleInteractive.regionsExplanationTextFontSize = isMobile ? '14px' : '18px'

visualization.circleInteractive.pointSize = isMobile ? 0.3 : 0.25
visualization.circleInteractive.lineThickness = isMobile ? 0.3 : 0.5


visualization.circleInteractive.vizTitleFontSize = isMobile ? '20px' : '32px'
visualization.circleInteractive.vizTitleY = isMobile ? 11 : 8


async function getRegionsForInteractive(numberOfPoints) {



    
    circleInteractiveData = {}
    circleInteractiveData.N = numberOfPoints

    if (circleInteractiveData.N > 25) {

        visualization.circleInteractive.regionsNumberTextLocation = isMobile ? {x: -6, y: 0} : {x: -7, y: 5}
        visualization.circleInteractive.regionsNumberTextWidth = isMobile ? 15 : 7
        visualization.circleInteractive.regionsExplanationTextLocation = isMobile ? {x: -6, y: -10} : {x: -7, y: 1}
        visualization.circleInteractive.regionsExplanationTextWidth = isMobile ? 15 : 7
        visualization.circleInteractive.regionsExplanationTextFontSize = isMobile ? '14px' : '18px'


        circleInteractiveData.circleSegmentDataN = await generateCircleSegmentationWithoutElements('greaterThan14', circleInteractiveData.N, visualization.circleInteractive.circleRadius, visualization.circleInteractive.circleCenter, 12)

        rhyform.wait(0.1)
        vizTitle.change.content("<div style='color: grey; font-size: small;'>INTERACTIVE</div>Regions inside a circle")

        
        circleInteractiveData.regionsN = circleInteractiveData.circleSegmentDataN.regions
        circleInteractiveData.regionKeysN = Object.keys(circleInteractiveData.regionsN)

        circleInteractiveData.chordsN = circleInteractiveData.circleSegmentDataN.chords

        circleInteractiveData.regionsNumberTextN = rhyform.createText(circleInteractiveData.regionKeysN.length + " <span style='color: grey;'>regions</span><br/><div style='color: hsla(0, 0%, 70%, 0.4); font-size: small'>Computed by visualization (via an algorithm), without a formula.</div>").place.at(x= visualization.circleInteractive.regionsNumberTextLocation.x, y=visualization.circleInteractive.regionsNumberTextLocation.y).loadWith.fontSize('25px').loadWith.textAlign('left').loadWith.color('white').addTag('pointRegionsTextN').loadWith.width(visualization.circleInteractive.regionsNumberTextWidth)

        circleInteractiveData.regionsNumberTextN.show(inSeconds=1)

        if (circleInteractiveData.N >= 4) {
            circleInteractiveData.intersectionPoints = circleInteractiveData.circleSegmentDataN.intersectionPoints;

            circleInteractiveData.numberOfIntersectionPoints = Object.keys(circleInteractiveData.intersectionPoints).length
        }
        else {
            circleInteractiveData.numberOfIntersectionPoints = 0
        }


        circleInteractiveData.numberOfEdgesFromIntersections = nChooseR(circleInteractiveData.N, 2) + 2*nChooseR(circleInteractiveData.N, 4)

        circleInteractiveData.numberOfEdgesOfCircle = parseInt(circleInteractiveData.N)

        circleInteractiveData.numberOfEdges = Math.ceil(circleInteractiveData.numberOfEdgesFromIntersections) + Math.ceil(circleInteractiveData.numberOfEdgesOfCircle)


        circleInteractiveData.otherDetailsInfo = "There are <span style='color: white'>" + circleInteractiveData.numberOfIntersectionPoints + " </span>intersection " + (circleInteractiveData.numberOfIntersectionPoints == 1 ? "point" : "points") + " from the chords, with "
        
        circleInteractiveData.otherDetailsInfo += "<span style='color: white'>" + Math.ceil(circleInteractiveData.N) + "</span>" 
        
        circleInteractiveData.otherDetailsInfo += Math.ceil(circleInteractiveData.N) == 1 ? " point" : " points"
        circleInteractiveData.otherDetailsInfo += " on the circle, gives us a total of <span style='color: white'>" + (circleInteractiveData.numberOfIntersectionPoints + Math.ceil(circleInteractiveData.N)) + "</span> "
        
        circleInteractiveData.otherDetailsInfo +=  "" + ((circleInteractiveData.numberOfIntersectionPoints + Math.ceil(circleInteractiveData.N)) == 1 ? "point" : "points") + ". "


        circleInteractiveData.otherDetailsInfo += "The number of edges is <span style='color: white'>" + circleInteractiveData.numberOfEdges + "</span>. Using the Euler's formula, the number of regions is " + circleInteractiveData.numberOfEdges + " - " + (circleInteractiveData.numberOfIntersectionPoints + Math.ceil(circleInteractiveData.N)) + " + 1 = <span style='color: white'>" + (Math.ceil(circleInteractiveData.numberOfEdges) - Math.ceil(circleInteractiveData.numberOfIntersectionPoints) - Math.ceil(circleInteractiveData.N) + 1) + "</span>. "

        circleInteractiveData.otherDetailsText = rhyform.createText(circleInteractiveData.otherDetailsInfo).place.at(x=visualization.circleInteractive.regionsExplanationTextLocation.x, y=visualization.circleInteractive.regionsExplanationTextLocation.y).loadWith.fontSize(visualization.circleInteractive.regionsExplanationTextFontSize).loadWith.textAlign('left').loadWith.color('hsla(0, 0%, 70%, 0.7)').loadWith.width(visualization.circleInteractive.regionsExplanationTextWidth).addTag('pointRegionsTextN')

        circleInteractiveData.otherDetailsText.show(inSeconds=1)

        
        visualizationScenes.circleInteractiveScene.play()
    }
    else {

        
        visualization.circleInteractive.regionsNumberTextLocation = isMobile ? {x: -7, y: -16} : {x: 5, y: 5}
        visualization.circleInteractive.regionsNumberTextWidth = isMobile ? 15 : 7
        visualization.circleInteractive.regionsExplanationTextLocation = isMobile ? {x: -7, y: -22} : {x: -8, y: -4.6}
        visualization.circleInteractive.regionsExplanationTextWidth = isMobile ? 15 : 17
        visualization.circleInteractive.regionsExplanationTextFontSize = isMobile ? '14px' : '18px'

        circleInteractiveData.circleSegmentDataN = await generateCircleSegmentation('circleSegmentedN', circleInteractiveData.N, visualization.circleInteractive.circleRadius, visualization.circleInteractive.circleCenter)

        rhyform.wait(0.1)
        vizTitle.change.content("<div style='color: grey; font-size: small;'>INTERACTIVE</div>Regions inside a circle")

        circleInteractiveData.circleSegmentDataN.mainCircle.show(inSeconds=1)

        rhyform.wait(0.1)

        rhyform.showElementsWithTag('point-circleSegmentedN', inSeconds=0.34)

        rhyform.wait(0.3)

        // pointNumberTextN = rhyform.createText(N + " <span style='color: grey;'>points</span>").place.at(x=4, y=5).loadWith.fontSize('22px').loadWith.textAlign('center').loadWith.color('white').addTag('pointRegionsTextN')
        // pointNumberTextN.show(inSeconds=0.3)

        rhyform.wait(0.3)

        circleInteractiveData.chordsN = circleInteractiveData.circleSegmentDataN.chords

        // Randomize order

        // circleInteractiveData.chordsN = circleInteractiveData.chordsN.sort(() => Math.random() - 0.5)

        circleInteractiveData.drawingChordSpeed = 30

        if (circleInteractiveData.N >= 8 && circleInteractiveData.N <= 14) {
            circleInteractiveData.drawingChordSpeed = parseInt(circleInteractiveData.N)*6
        }
        else if (circleInteractiveData.N > 14) {
            circleInteractiveData.drawingChordSpeed = parseInt(circleInteractiveData.N)*5
        }

        for (let i = 0; i < circleInteractiveData.chordsN.length; i++) {
            chordNi  = circleInteractiveData.chordsN[i]
            chordNi.draw(lengthPerSecond=30)
        }

        rhyform.wait(0.3)

        circleInteractiveData.regionsN = circleInteractiveData.circleSegmentDataN.regions
        circleInteractiveData.regionKeysN = Object.keys(circleInteractiveData.regionsN)

        circleInteractiveData.secondsToDrawRegions = 0.1

        if (circleInteractiveData.N >= 8 && circleInteractiveData.N <= 14) {
            circleInteractiveData.secondsToDrawRegions = 0.1/parseInt(circleInteractiveData.N)
        }
        else if (circleInteractiveData.N > 14) {
            circleInteractiveData.secondsToDrawRegions = 0.01/parseInt(circleInteractiveData.N)
        }


        circleInteractiveData.regionsNumberTextN = rhyform.createText("0 regions").place.at(x= visualization.circleInteractive.regionsNumberTextLocation.x, y=visualization.circleInteractive.regionsNumberTextLocation.y).loadWith.fontSize('25px').loadWith.textAlign('left').loadWith.color('white').loadWith.width(visualization.circleInteractive.regionsNumberTextWidth).addTag('pointRegionsTextN')

        circleInteractiveData.regionsNumberTextN.show(inSeconds=1)


        for (let i = 0; i < circleInteractiveData.regionKeysN.length; i++) {
            regionN = circleInteractiveData.regionsN[circleInteractiveData.regionKeysN[i]]
            regionN.curve.show(inSeconds=circleInteractiveData.secondsToDrawRegions).startNextImmediately()
            if (circleInteractiveData.N < 14) {
                opacityFactor = ((i+1)*0.3/(circleInteractiveData.regionKeysN.length + 1))}
            else {
                opacityFactor = 0.1 + ((i+1)*0.6/(circleInteractiveData.regionKeysN.length + 1))
            }
            regionN.curve.change.fillColor('hsla(198, 100%, 80%,' + opacityFactor + ')' ,inSeconds=circleInteractiveData.secondsToDrawRegions).startNextImmediately()

            if (circleInteractiveData.N < 17) {
                regionN.countText.show(inSeconds=circleInteractiveData.secondsToDrawRegions).startNextImmediately()
            }

            circleInteractiveData.regionsNumberTextN.change.content((i + 1) + " <span style='color: grey;'>regions</span> <div style='color: hsla(0, 0%, 70%, 0.4); font-size: small'>Computed by visualization (via an algorithm), without a formula.</div>", inSeconds=circleInteractiveData.secondsToDrawRegions)
        }

        

        if (circleInteractiveData.N >= 4) {
            circleInteractiveData.intersectionPoints = circleInteractiveData.circleSegmentDataN.intersectionPoints;

            circleInteractiveData.numberOfIntersectionPoints = Object.keys(circleInteractiveData.intersectionPoints).length
        }
        else {
            circleInteractiveData.numberOfIntersectionPoints = 0
        }


        circleInteractiveData.numberOfEdgesFromIntersections = nChooseR(circleInteractiveData.N, 2) + 2*nChooseR(circleInteractiveData.N, 4)

        circleInteractiveData.numberOfEdgesOfCircle = parseInt(circleInteractiveData.N)

        circleInteractiveData.numberOfEdges = circleInteractiveData.numberOfEdgesFromIntersections + circleInteractiveData.numberOfEdgesOfCircle


        circleInteractiveData.otherDetailsInfo = "There are <span style='color: white'>" + circleInteractiveData.numberOfIntersectionPoints + " </span>intersection " + (circleInteractiveData.numberOfIntersectionPoints == 1 ? "point" : "points") + " from the chords, with "
        
        circleInteractiveData.otherDetailsInfo += "<span style='color: white'>" + parseInt(circleInteractiveData.N) + "</span>" 
        
        circleInteractiveData.otherDetailsInfo += parseInt(circleInteractiveData.N) == 1 ? " point" : " points"
        circleInteractiveData.otherDetailsInfo += " on the circle, gives us a total of <span style='color: white'>" + (circleInteractiveData.numberOfIntersectionPoints + parseInt(circleInteractiveData.N)) + "</span> "
        
        circleInteractiveData.otherDetailsInfo +=  "" + ((circleInteractiveData.numberOfIntersectionPoints + parseInt(circleInteractiveData.N)) == 1 ? "point" : "points") + ". "

        circleInteractiveData.otherDetailsInfo += "The number of edges is <span style='color: white'>" + circleInteractiveData.numberOfEdges + "</span>. Using the Euler's formula, the number of regions is " + circleInteractiveData.numberOfEdges + " - " + (circleInteractiveData.numberOfIntersectionPoints + parseInt(circleInteractiveData.N)) + " + 1 = <span style='color: white'>" + (circleInteractiveData.numberOfEdges - circleInteractiveData.numberOfIntersectionPoints - parseInt(circleInteractiveData.N) + 1) + "</span>."

        circleInteractiveData.otherDetailsText = rhyform.createText(circleInteractiveData.otherDetailsInfo).place.at(x=visualization.circleInteractive.regionsExplanationTextLocation.x, y=visualization.circleInteractive.regionsExplanationTextLocation.y).loadWith.fontSize(visualization.circleInteractive.regionsExplanationTextFontSize).loadWith.textAlign('left').loadWith.color('hsla(0, 0%, 70%, 0.7)').loadWith.width(visualization.circleInteractive.regionsExplanationTextWidth).addTag('pointRegionsTextN')

        circleInteractiveData.otherDetailsText.show(inSeconds=1)

        // rhyform.showElementsWithTag('regionCount-circleSegmentedN', inSeconds=0.3)

        vizTitle.set.content("Drawing regions...")


        visualizationScenes.circleInteractiveScene.play()

    }
    
    
}

circleInteractiveData = {}

function showCircleInteractivePart() {



    // scroll to top 
    document.getElementById('interactive1').scrollIntoView({behavior: 'smooth', block: 'start'});

    // pauseState = visualizationScenes.circleScene.pause()
    // loadCircleInteractivePart()

    // console.log(pauseState)
    
}


function showSpiralInteractivePart() {

    // scroll to top 
    document.getElementById('interactive2').scrollIntoView({behavior: 'smooth', block: 'start'});

    // pauseState = visualizationScenes.circleScene.pause()
    // loadCircleInteractivePart()

    // console.log(pauseState)
    
}

function factorial(n) {
    if (n == 0 || n == 1) {
        return 1
    }
    else {
        return n * factorial(n - 1)
    }
}

function nChooseR(n, r) {
    if (n >= r) {
        // Round to next integer
        return factorial(n) / (factorial(r) * factorial(n - r))
    }
    else {
        return 0
    }
}




async function run() {
    await intro()

    setTimeout(() => {
        loadCircleInteractivePart()
    }, 2000);

    setTimeout(() => {
        loadUlamSpiralInteractivePart()
    }, 4000);
}

// Run only after MathJax is loaded

if (MathJax.typeset instanceof Function) {
    run()
}
else {
    setTimeout(() => {
        run()
    }, 2000);
}



// circleScene()



async function generateCircleSegmentationWithoutElements(name, number_of_points, circleRadius, center, intersectionPrecision=4) {
    circleSegmentationVisualization = {}

    circleSegmentationVisualization.uniqueIndex = 0

    circleSegmentationVisualization.circleRadius = circleRadius
    circleSegmentationVisualization.numberOfPoints = number_of_points

    circleSegmentationVisualization.circleCenter = {
        coordinates: {
            x: center[0], 
            y: center[1]
        }
    }
    // circleSegmentationVisualization.mainCircle = rhyform.createCircle(circleSegmentationVisualization.circleCenter, radius=circleRadius).loadWith.color('hsla(198, 100%, 50%, 1)').addTag('circle').addTag(name).addTag('circle-' + name)

    // circleSegmentationVisualization.circleCenter = circleCenter
    // circleSegmentationVisualization.mainCircle = mainCircle

    points = []
    circleSegmentationVisualization.pointsNames = []

    for (let i = 0; i < number_of_points; i++) {
        // Almost Evenly spaced points on the circle
        angle = 2*Math.PI/number_of_points
        offsetAngle = Math.random()*angle/1.4

        circleSegmentationVisualization.point = {
            coordinates: {
                x: circleRadius*Math.cos(angle*i+offsetAngle) + circleSegmentationVisualization.circleCenter.coordinates.x, 
                y: circleRadius*Math.sin(angle*i+offsetAngle) + circleSegmentationVisualization.circleCenter.coordinates.y
            },
            name: 'point-' + circleSegmentationVisualization.uniqueIndex + "-" + name
        }

        circleSegmentationVisualization.uniqueIndex += 1

        
        circleSegmentationVisualization.point.angle = angle*i+offsetAngle
        
        // circleSegmentationVisualization.point.loadWith.size(0.25).addTag('points').addTag(name).addTag('point-' + name)
        points.push(circleSegmentationVisualization.point);
        circleSegmentationVisualization.pointsNames.push(circleSegmentationVisualization.point.name)

    }

    lines = []


    // mainCircle.show().startNextImmediately();

    chords = []

    for (let i = 0; i < number_of_points; i++) {
        for (let j = i; j < number_of_points; j++) {
            pointI = points[i]
            pointJ = points[j]

            if (i != j) {
                
                circleSegmentationVisualization.line = {
                    point1: pointI,
                    point2: pointJ,
                    name: 'line-' + circleSegmentationVisualization.uniqueIndex + "-" + name
                } 

                circleSegmentationVisualization.uniqueIndex += 1
                
                // rhyform.createLine(pointI, pointJ).addTag('lines').addTag(name).addTag('line-' + name)

                circleSegmentationVisualization.line.pointIndices = [i, j]

                if (i == j - 1 || (i == 0 && j == number_of_points - 1)) {
                    circleSegmentationVisualization.line.isBoundaryChord = true
                    // circleSegmentationVisualization.line.loadWith.color('hsla(0, 0%, 100%, 1)')

                    if (pointI.immediateNeighbours == null) {
                        pointI.immediateNeighbours = []
                    }

                    if (pointJ.immediateNeighbours == null) {
                        pointJ.immediateNeighbours = []
                    }

                    if (pointI.immediateNeighbours.indexOf(pointJ) == -1) {
                        pointI.immediateNeighbours.push(pointJ)
                    }

                    if (pointJ.immediateNeighbours.indexOf(pointI) == -1) {
                        pointJ.immediateNeighbours.push(pointI)
                    }

                }
                else {
                    circleSegmentationVisualization.line.isBoundaryChord = false
                    // circleSegmentationVisualization.line.loadWith.color('hsla(0, 0%, 100%, 1)')
                }

                // line.draw(lengthPerSecond=3).startNextImmediately();

                chords.push(circleSegmentationVisualization.line)

                
            }

            

            

        }
    }


    circleSegmentationVisualization.points = points
    // circleSegmentationVisualization.pointsNames = pointsNames
    circleSegmentationVisualization.chords = chords

    regions = {}

    if (number_of_points >= 4) {
        intersectionPoints = []

        for (let i = 0; i < chords.length; i++) {
            for (let j = i; j < chords.length; j++) {
                if (i != j) {
                    chordA = chords[i]
                    chordB = chords[j]

                    chordIntersectionSignatureArray = chordA.pointIndices.concat(chordB.pointIndices).sort()
                    let set = new Set(chordIntersectionSignatureArray);

                    if (set.size == 4) {



                        // console.log(chordA)
                        // console.log(chordB)

                        if (!chordA.isBoundaryChord && !chordB.isBoundaryChord) {

                        }
                    
                        if (chordA.intersectionPoints == null) {
                            chordA.intersectionPoints = []
                        }

                        if (chordB.intersectionPoints == null) {
                            chordB.intersectionPoints = []
                        }

                        if (chordA.intersectionPointsNames == null) {
                            chordA.intersectionPointsNames = []
                        }

                        if (chordB.intersectionPointsNames == null) {
                            chordB.intersectionPointsNames = []
                        }

                        // compute intersection using
                        // viewX.libraryFunctions.intersectionBetweenRayAndLineSegment = function(ray, lineSegment)
                        //     A = ray.from
                        //     B = ray.to
                        //     C = lineSegment.betweenPoint1
                        //     D = lineSegment.betweenPoint2

                        chordAPoint1 = [chordA.point1.coordinates.x, chordA.point1.coordinates.y]
                        chordAPoint2 = [chordA.point2.coordinates.x, chordA.point2.coordinates.y]

                        chordBPoint1 = [chordB.point1.coordinates.x, chordB.point1.coordinates.y]
                        chordBPoint2 = [chordB.point2.coordinates.x, chordB.point2.coordinates.y]

                        lineSegmentA = {point1: chordAPoint1, point2: chordAPoint2}
                        lineSegmentB = {point1: chordBPoint1, point2: chordBPoint2}

                        intersection = viewX.libraryFunctions.intersectionBetweenLineSegments(lineSegmentA, lineSegmentB)

                        // console.log(intersection)

                        // Check if outside the circle 
                        // Also circleCenter is the origin

                        isInside = true

                        if (intersection != null) {

                            distanceToPointFromCenter = viewX.distF([intersection[0], intersection[1]], [circleSegmentationVisualization.circleCenter.coordinates.x, circleSegmentationVisualization.circleCenter.coordinates.y])

                            if (distanceToPointFromCenter > circleRadius) {
                                isInside = false
                            }
                        }

                        if (intersection != null && isInside) {
                            intersectionAsString = intersection[0].toFixed(intersectionPrecision) + ',' + intersection[1].toFixed(intersectionPrecision)
                            if (chordA.intersectionPointsNames.indexOf(intersectionAsString) == -1 && chordB.intersectionPointsNames.indexOf(intersectionAsString) == -1) {
                                 
                                circleSegmentationVisualization.point = {
                                    coordinates: {
                                        x: intersection[0],
                                        y: intersection[1]
                                    },
                                    name: 'intersectionPoint-' + circleSegmentationVisualization.uniqueIndex + "-" + name
                                }

                                circleSegmentationVisualization.uniqueIndex += 1
                                
                                
                                // rhyform.createPoint().place.at(x=intersection[0], y=intersection[1])

                                // circleSegmentationVisualization.point.loadWith.size(0.2).loadWith.color('white').addTag('intersectionPoints').addTag(name).addTag('intersectionPoint-' + name)
                                // point.show().startNextImmediately();
                                circleSegmentationVisualization.point.chord = [chordA, chordB]

                                if (chordA.intersectionPointsNames.indexOf(intersectionAsString) == -1) {
                                    chordA.intersectionPointsNames.push(intersectionAsString)
                                    chordA.intersectionPoints.push(circleSegmentationVisualization.point)
                                }

                                if (chordB.intersectionPointsNames.indexOf(intersectionAsString) == -1) {
                                    chordB.intersectionPointsNames.push(intersectionAsString)
                                    chordB.intersectionPoints.push(circleSegmentationVisualization.point)
                                }

                                
                                intersectionPoints.push(circleSegmentationVisualization.point)
                                circleSegmentationVisualization.point.isIntersectionPoint = true

                            }
                        }
                    }
                }
            }
        }


        for (let i = 0; i < chords.length; i++) {
            chord = chords[i]

            a = chord.pointIndices[0]
            b = chord.pointIndices[1]

            point = points[a]
            point.chord = [chordA, chordB]
            chord.intersectionPoints.push(point)

            point = points[b]
            point.chord = [chordA, chordB]
            chord.intersectionPoints.push(point)

        }



        for (let i = 0; i < intersectionPoints.length; i++) {
            point = intersectionPoints[i]

            chordA = point.chord[0]
            chordB = point.chord[1]

            // console.log(point.element)

            // console.log(chordA.element)


            point.neighboursOnChordA = chordA.intersectionPoints.filter(function(value, index, arr){ return value != point;})

            neighbourDistances = []
            neighbourVectors = []
            for (let j = 0; j < point.neighboursOnChordA.length; j++) {
                neighbour = point.neighboursOnChordA[j]

                neighbourVector = viewX.subtractVec([point.coordinates.x, point.coordinates.y], [neighbour.coordinates.x, neighbour.coordinates.y])

                neighbourVectors.push(neighbourVector)

                distance = viewX.distF([point.coordinates.x, point.coordinates.y], [neighbour.coordinates.x, neighbour.coordinates.y])

                neighbourDistances.push({point: neighbour, distance: distance})
            }

            neighbourVectorReference = neighbourVectors[0]

            negativeGroup = []
            positiveGroup = []

            for (let j = 0; j < neighbourDistances.length; j++) {
                neighbour = neighbourDistances[j].point

                neighbourVector = neighbourVectors[j]

                dotProduct = viewX.dotProduct(neighbourVectorReference, neighbourVector)

                if (dotProduct < 0) {
                    negativeGroup.push(neighbourDistances[j])
                }
                else {
                    positiveGroup.push(neighbourDistances[j])
                }
            }



            negativeGroup.sort(function(a, b) {
                return a.distance - b.distance;
            });

            positiveGroup.sort(function(a, b) {
                return a.distance - b.distance;
            });

            closestInPositive = positiveGroup[0]
            closestInNegative = negativeGroup[0]

            point.immediateNeighboursOnChordA = [closestInPositive.point, closestInNegative.point]

            point.neighboursOnChordB = chordB.intersectionPoints.filter(function(value, index, arr){ return value != point;})

            neighbourDistances = []
            neighbourVectors = []
            for (let j = 0; j < point.neighboursOnChordB.length; j++) {
                neighbour = point.neighboursOnChordB[j]

                neighbourVector = viewX.subtractVec([point.coordinates.x, point.coordinates.y], [neighbour.coordinates.x, neighbour.coordinates.y])

                neighbourVectors.push(neighbourVector)

                distance = viewX.distF([point.coordinates.x, point.coordinates.y], [neighbour.coordinates.x, neighbour.coordinates.y])

                neighbourDistances.push({point: neighbour, distance: distance})
            }

            neighbourVectorReference = neighbourVectors[0]

            negativeGroup = []
            positiveGroup = []

            for (let j = 0; j < neighbourDistances.length; j++) {
                neighbour = neighbourDistances[j].point

                neighbourVector = neighbourVectors[j]

                dotProduct = viewX.dotProduct(neighbourVectorReference, neighbourVector)

                if (dotProduct < 0) {
                    negativeGroup.push(neighbourDistances[j])
                }
                else {
                    positiveGroup.push(neighbourDistances[j])
                }
            }

            negativeGroup.sort(function(a, b) {
                return a.distance - b.distance;
            });

            positiveGroup.sort(function(a, b) {
                return a.distance - b.distance;
            });

            closestInPositive = positiveGroup[0]
            closestInNegative = negativeGroup[0]

            point.immediateNeighboursOnChordB = [closestInPositive.point, closestInNegative.point]

            if (point.immediateNeighbours == null) {
                point.immediateNeighbours = []
            }


            neighboursFound = point.immediateNeighboursOnChordA.concat(point.immediateNeighboursOnChordB)

            for (let j = 0; j < neighboursFound.length; j++) {
                neighbour = neighboursFound[j]

                if (point.immediateNeighbours.indexOf(neighbour) == -1) {
                    point.immediateNeighbours.push(neighbour)
                }
            }

            for (let j = 0; j < point.immediateNeighbours.length; j++) {
                neighbour = point.immediateNeighbours[j]

                if (neighbour.immediateNeighbours == null) {
                    neighbour.immediateNeighbours = []
                }

                if (neighbour.immediateNeighbours.indexOf(point) == -1) {
                    neighbour.immediateNeighbours.push(point)
                }
            }


            
        }

        for (let i = 0; i < intersectionPoints.length; i++) {
            point = intersectionPoints[i]

            // start at every neighbour, go clockwise, and find the region

            for (let j = 0; j < point.immediateNeighbours.length; j++) {

                region = {}
                region.points = []

                // console.log("New Region")

                region.length = 0
                
                neighbour = point.immediateNeighbours[j]
                vectoralDirectionOfNeighbour = viewX.subtractVec([neighbour.coordinates.x, neighbour.coordinates.y], [point.coordinates.x, point.coordinates.y])

                region.points.push(neighbour)
                currentPoint = neighbour
                previousPoint = point

                currentVectoralDirection = vectoralDirectionOfNeighbour

                // console.log(currentPoint.element)
                // console.log(currentPoint.name)

                while (currentPoint.name != point.name) {

                    potentialNextPoints = currentPoint.immediateNeighbours

                    dotProducts = []
                    angles = []

                    for (let k = 0; k < potentialNextPoints.length; k++) {
                        potentialNextPoint = potentialNextPoints[k]

                        // if (potentialNextPoint.isIntersectionPoint == null) {
                        //     console.log(potentialNextPoint)
                        // }

                        if (potentialNextPoint != previousPoint) {

                            nextVectoralDirectionOfNextPoint = viewX.subtractVec([potentialNextPoint.coordinates.x, potentialNextPoint.coordinates.y], [currentPoint.coordinates.x, currentPoint.coordinates.y])

                            dotProduct = viewX.dotProduct(currentVectoralDirection, nextVectoralDirectionOfNextPoint)


                            angleBetween = viewX.angleBetweenVecs(currentVectoralDirection, nextVectoralDirectionOfNextPoint)
                            

                            dotProducts.push({point: potentialNextPoint, dotProduct: dotProduct, vectoralDirection: nextVectoralDirectionOfNextPoint, angleBetween: angleBetween})
                        }



                    }

                    dotProducts.sort(function(a, b) {
                        return a.angleBetween - b.angleBetween;
                    });

                    nextPoint = dotProducts[0].point
                    currentVectoralDirection = dotProducts[0].vectoralDirection
                    
                    // console.log(currentPoint.element)
                    
                    previousPoint = currentPoint
                    currentPoint = nextPoint


                    region.points.push(currentPoint)

                    if (region.points.length > 10) {
                        break
                    }
                    // console.log(currentPoint.element)
                    // console.log(currentPoint.name)
                }

                region.pointNames = [ ] 
                region.pointElements = [ ]
                stringForRegion = ''
                for (let j = 0; j < region.points.length; j++) {
                    point = region.points[j]

                    region.pointNames.push(point.name)
                    region.pointElements.push(point.element)


                }

                region.pointNames.sort()

                stringForRegion = region.pointNames.join()

                if (regions[stringForRegion] == null) {
                    regions[stringForRegion] = region
                }

            }

            

            // break
        }

        
        circleSegmentationVisualization.intersectionPoints = intersectionPoints
    }


    if (number_of_points == 3) {
        region = {}
        region.pointNames = []
        region.pointElements = []

        pointsForRegion = []

        for (let i = 0; i < points.length; i++) {
            point = points[i]

            region.pointNames.push(point.name)
            region.pointElements.push(point.element)

            pointsForRegion.push(point)
        }

        region.points = pointsForRegion

        region.pointNames.sort()

        stringForRegion = region.pointNames.join()

        if (regions[stringForRegion] == null) {
            regions[stringForRegion] = region
        }

    }

    for (let i = 0; i < points.length; i++) {
        point = points[i]
        nextPoint = points[(i+1)%points.length]

        if (i == points.length - 1) {
            startingAngle = point.angle
            endingAngle = nextPoint.angle + 2*Math.PI
        }
        else {
            startingAngle = Math.min(point.angle, nextPoint.angle)
            endingAngle = Math.max(point.angle, nextPoint.angle)
        }


        pointsForRegion = []
        numberOfPointForRegionArc = 20

        
        region = {}
        region.pointNames = [ ]
        // region.pointElements = [ ]
        
        for (let j = 0; j < numberOfPointForRegionArc; j++) {
            angleForPoint = startingAngle + (endingAngle - startingAngle)*j/(numberOfPointForRegionArc-1)

            
            circleSegmentationVisualization.curvePoint = {
                coordinates: {
                    x: circleRadius*Math.cos(angleForPoint) + circleSegmentationVisualization.circleCenter.coordinates.x, 
                    y: circleRadius*Math.sin(angleForPoint) + circleSegmentationVisualization.circleCenter.coordinates.y
                },
                name: 'boundaryArcPoint-' + circleSegmentationVisualization.uniqueIndex + "-" + name
            }

            circleSegmentationVisualization.uniqueIndex += 1
            
            
            // rhyform.createPoint().place.at(x=circleRadius*Math.cos(angleForPoint) + circleSegmentationVisualization.circleCenter.coordinates.x, y=circleRadius*Math.sin(angleForPoint) + circleSegmentationVisualization.circleCenter.coordinates.y).addTag('boundaryArcPoints').addTag(name).addTag('boundaryArcPoint-' + name)
            
            pointsForRegion.push(circleSegmentationVisualization.curvePoint)

            region.pointNames.push(circleSegmentationVisualization.curvePoint.name)
            // region.pointElements.push(circleSegmentationVisualization.curvePoint.element)
        }


        region.points = pointsForRegion

        region.pointNames.sort()

        stringForRegion = region.pointNames.join()

        if (regions[stringForRegion] == null) {
            regions[stringForRegion] = region
        }

    }

    regionKeys = Object.keys(regions)
    // hueRangeForRegions = [0, 330]
    opacityRangeForRegions = [0.05, 0.5]

    regionKeys.sort()


    circleSegmentationVisualization.regionKeys = regionKeys
    // for (let i = 0; i < regionKeys.length; i++) {

        // region = regions[regionKeys[i]]

         // generate a hue for each region

        // hueForRegion = viewX.linearValue(0, regionKeys.length-1, hueRangeForRegions[0], hueRangeForRegions[1], i)

        // opacityForRegion = viewX.linearValue(0, regionKeys.length-1, opacityRangeForRegions[0], opacityRangeForRegions[1], i)


        // circleSegmentationVisualization.curve = rhyform.createCurve(region.points).loadWith.color('none')
        // circleSegmentationVisualization.curve.set.fillColor('hsla(198, 0%, 70%, ' + opacityForRegion + ')').addTag('regions').addTag(name).addTag('boundaryArcPoint-' + name)

        // region.curve = circleSegmentationVisualization.curve

        // console.log(region.curve.pointsXY)
        // regionCenter = viewX.centerOfPoints(region.curve.pointsXY)

        // console.log(regionCenter)

        // circleSegmentationVisualization.regionCountText = rhyform.createText(i + 1).place.at(x = regionCenter[0] - 0.1, y = regionCenter[1] + 0.2).loadWith.fontSize('12px').addTag('regionCounts').addTag(name).addTag('regionCount-' + name)

        // if (i == regionKeys.length - 1) {
        //     circleSegmentationVisualization.regionCountText.loadWith.color('hsla(198, 100%, 70%, 1)')
        // }
        // else {
        //     circleSegmentationVisualization.regionCountText.loadWith.color('white')
        // }

        // region.countText = circleSegmentationVisualization.regionCountText


        // curve.show(inSeconds=0.3)
    // }

    circleSegmentationVisualization.regions = regions

    return circleSegmentationVisualization
}


function ulamSpiralCoordinatesUptoN(N = 100) {
    ulamSpiralCoordinates = []

    ulamSpiralCoordinates.push([0, 0])


    currentX = 0
    currentY = 0
    currentDirection = 'right'
    currentStep = 1
    currentStepCount = 0

    while (ulamSpiralCoordinates.length < N) {
        if (currentDirection == 'right') {
            currentX += 1
        }
        else if (currentDirection == 'up') {
            currentY += 1
        }
        else if (currentDirection == 'left') {
            currentX -= 1
        }
        else if (currentDirection == 'down') {
            currentY -= 1
        }

        ulamSpiralCoordinates.push([currentX, currentY])

        currentStepCount += 1

        if (currentStepCount == currentStep) {
            currentStepCount = 0

            if (currentDirection == 'right') {
                currentDirection = 'up'
            }
            else if (currentDirection == 'up') {
                currentDirection = 'left'
            }
            else if (currentDirection == 'left') {
                currentDirection = 'down'
            }
            else if (currentDirection == 'down') {
                currentDirection = 'right'
            }

            if (currentDirection == 'right' || currentDirection == 'left') {
                currentStep += 1
            }
        }
    }

    return ulamSpiralCoordinates
}

function polarCoordinatesForSpiralUptoN(N = 100) {
    polarCoordinates = []

    scaleDownFactor = 1

    for (let i = 0; i < N; i++) {
        polarCoordinates.push([i*Math.cos(i)/scaleDownFactor, i*Math.sin(i)/scaleDownFactor])
    }

    return polarCoordinates
}

function polarCoordinatesForSpiralBetween(A = 100, B= 200) {
    polarCoordinates = []

    scaleDownFactor = 1

    for (let i = A; i < B; i++) {
        polarCoordinates.push([i*Math.cos(i)/scaleDownFactor, i*Math.sin(i)/scaleDownFactor])
    }

    return polarCoordinates
}



visualization.ulamSpiralInteractive = {
    titleX : isMobile ? -11 : -6,
    textAlign: isMobile ? 'left' : 'center',
    width: isMobile ? 6 : 10,

    numberOfPointsSlider: {
        position: isMobile ? {x: -11, y: -10} : {x:-3, y: -8},
        width: isMobile ? 6 : 4,
    },

    pointSizeSlider: {
        position: isMobile ? {x: -11, y: -15} : {x: 4, y: -8},
        width: isMobile ? 6 : 4,
    },

    mainSpiral: {
        center: isMobile ? {x: 7, y: 0} : {x: 0, y: 0},
    }

}
async function loadUlamSpiralInteractivePart() {
    var ulamInteractiveScene = rhyform.createScene('Ulam Spiral Interactive Scene');
    var ulamInteractiveSpace = rhyform.createSpaceInElement('#interactive2', name="ulamSpiralInteractiveSpace");


    ulamInteractiveSpace.camera.setBounds({x: -10, y: -10, width: 20, height: 20});
    ulamInteractiveScene.selectSpace(ulamInteractiveSpace);

    visualizationScenes.ulamInteractiveScene = ulamInteractiveScene

    ulamvizTitle = rhyform.createText("<div style='color: grey; font-size: small;'>INTERACTIVE</div>Integer Polar Coordinate Spiral with Paterson Primes").place.at(x=visualization.ulamSpiralInteractive.titleX, y=visualization.circleInteractive.vizTitleY).loadWith.fontSize(visualization.circleInteractive.vizTitleFontSize).loadWith.textAlign(visualization.ulamSpiralInteractive.textAlign).loadWith.color('white').addTag('pattersonPrimeInteractive').loadWith.width(visualization.ulamSpiralInteractive.width)

    ulamvizTitle.show(inSeconds=0.3)

    
    ulamInteractiveData = {}

    ulamInteractiveData.legend = {}

    ulamInteractiveData.legend.pattersonPrimeDot = rhyform.createPoint().place.at(x=-8, y=-8).loadWith.size(0.6).loadWith.color('hsla(198, 100%, 70%, 1)').addTag('pattersonPrimeInteractive').addTag('ulamLegendCircle')

    ulamInteractiveData.legend.pattersonPrimeText = rhyform.createText("Paterson Primes").place.rightOf(ulamInteractiveData.legend.pattersonPrimeDot, atDistance=0.4).loadWith.fontSize("15px").loadWith.color('hsla(198, 100%, 80%, 1)').addTag('pattersonPrimeInteractive').loadWith.width(5)

    ulamInteractiveData.legend.pattersonPrimeText.place.at(x=ulamInteractiveData.legend.pattersonPrimeText.coordinates.x, y=ulamInteractiveData.legend.pattersonPrimeText.coordinates.y + 0.2)

    ulamInteractiveData.legend.pattersonPrimeDot.show(inSeconds=0.3).startNextImmediately()
    ulamInteractiveData.legend.pattersonPrimeText.show(inSeconds=0.3)

    ulamInteractiveData.legend.regularPrimeDot = rhyform.createPoint().place.below(ulamInteractiveData.legend.pattersonPrimeDot, atDistance=0.5).loadWith.size(0.6).loadWith.color('hsla(40, 100%, 70%, 0.5)').addTag('regularPrimeInteractive').addTag('ulamLegendCircle')

    ulamInteractiveData.legend.regularPrimeText = rhyform.createText("Regular Primes").place.rightOf(ulamInteractiveData.legend.regularPrimeDot, atDistance=0.4).loadWith.fontSize("15px").loadWith.color('hsla(40, 100%, 80%, 0.5)').addTag('regularPrimeInteractive').loadWith.width(5)

    ulamInteractiveData.legend.regularPrimeText.place.at(x=ulamInteractiveData.legend.regularPrimeText.coordinates.x, y=ulamInteractiveData.legend.regularPrimeText.coordinates.y + 0.2)

    ulamInteractiveData.legend.regularPrimeDot.show(inSeconds=0.3).startNextImmediately()
    ulamInteractiveData.legend.regularPrimeText.show(inSeconds=0.3)


    sliderOptions = {
        at: visualization.ulamSpiralInteractive.numberOfPointsSlider.position,
        width: visualization.ulamSpiralInteractive.numberOfPointsSlider.width,
        min: 100,
        max: 400000,
        value: 400,
        step: 1,
        labelTextProperties: {
            text: 'Points',
        },
        labelDescriptionProperties: {
            text: "",
            color: 'hsla(0, 0%, 60%, 1)'
        },
        sliderProperties: {
            valueTransformToText: function(value) {
                if (value < 200000) {
                    return value
                }
                else {
                    // return "10<sup>" + Math.log10(value).toFixed(2) + "</sup>"
                    // k, m, b, t notation

                    if (value < 1000000) {
                        return (value/1000).toFixed(1) + "k"
                    }
                    else if (value < 1000000000) {
                        return (value/1000000).toFixed(1) + "M"
                    }
                    else if (value < 1000000000000) {
                        return (value/1000000000).toFixed(1) + "B"
                    }
                    else {
                        return (value/1000000000000).toFixed(1) + "T"
                    }

                }
            },
            onChange: async function() {

                // console.log(ulamInteractiveData.numberOfPointsSlider.value)
                if (ulamInteractiveData.settingPointsTimeout != null) {
                    clearTimeout(ulamInteractiveData.settingPointsTimeout)
                }

                if (ulamInteractiveData.numberOfPointsSlider.value > 20000) {
                    ulamInteractiveData.pointSizeSlider.set.max(0.2)
                    ulamInteractiveData.pointSizeSlider.set.min(0.0002)
                }
                else {
                    ulamInteractiveData.pointSizeSlider.set.max(5)
                    ulamInteractiveData.pointSizeSlider.set.min(0.01)
                }

                
                // contentToSet = numberOfPointsSlider.value + " <span style='color: grey;'>points</span>"
                // contentToSet = numberOfPointsSlider.value == 1 ? contentToSet.replace('points', 'point') : contentToSet
                // pointNumberTextN.set.content(contentToSet)
                // vizTitle.set.content("Computing Regions...")
                
                ulamvizTitle.set.content("Computing Points...")
                
                ulamInteractiveData.settingPointsTimeout = setTimeout(() => {
                    // visualizationScenes.ulamInteractiveScene.clear()
                    // rhyform.deleteElementsWithTag('ulamPoints')
                    rhyform.selectActiveScene(visualizationScenes.ulamInteractiveScene)
                    
                    generateSpiralPart(ulamInteractiveData.numberOfPointsSlider.value)

                    
                    // visualizationScenes.circleInteractiveScene.clear()
                    // rhyform.deleteElementsWithTag('pointRegionsTextN')
                    // rhyform.deleteElementsWithTag('circleSegmentedN')

                    // rhyform.selectActiveScene(visualizationScenes.circleInteractiveScene)
                    // circleInteractiveData.otherDetailsText.remove()
                    // getRegionsForInteractive(numberOfPointsSlider.value)
                    // console.log(numberOfPointsSlider.value)
                }, 1);
            }
        }
    }

    ulamInteractiveData.numberOfPointsSlider = rhyform.createSlider(sliderOptions)
    ulamInteractiveData.numberOfPointsSlider.show()


    sliderOptions = {
        at: visualization.ulamSpiralInteractive.pointSizeSlider.position,
        width: visualization.ulamSpiralInteractive.pointSizeSlider.width,
        min: 0.001,
        max: 5,
        value: 0.2,
        step: 0.0001,
        labelTextProperties: {
            text: 'Point Size',
        },
        labelDescriptionProperties: {
            text: "",
            color: 'hsla(0, 0%, 60%, 1)'
        },
        sliderProperties: {
            valueTransformToText: function(value) {
                if (value < 0.2) {
                    return parseFloat(value).toFixed(5)
                }
                else {
                    return parseFloat(value).toFixed(2)
                }
            },
            onChange: async function() {

                // console.log(ulamInteractiveData.pointSizeSlider.value)
                
                if (ulamInteractiveData.settingPointsTimeout != null) {
                    clearTimeout(ulamInteractiveData.settingPointsTimeout)
                }
        
                ulamvizTitle.set.content("Computing Points...")
                
                ulamInteractiveData.settingPointsTimeout = setTimeout(() => {
                    // visualizationScenes.ulamInteractiveScene.clear()
                    // rhyform.deleteElementsWithTag('ulamPoints')
                    rhyform.selectActiveScene(visualizationScenes.ulamInteractiveScene)
                    // ulamInteractiveData.pointSize = 
                    generateSpiralPart(ulamInteractiveData.numberOfPointsSlider.value)
                }, 1);
            }
        }
    }

    ulamInteractiveData.pointSizeSlider = rhyform.createSlider(sliderOptions)
    ulamInteractiveData.pointSizeSlider.show()

    ulamInteractiveData.pointSize = 0.2

    ulamInteractiveData.points = {}
    ulamInteractiveData.pointData = {}


    generateSpiralPart(400)

    visualizationScenes.ulamInteractiveScene.play()

}

async function generateSpiralPart(N) {


    ulamvizTitle.set.content("<div style='color: grey; font-size: small;'>INTERACTIVE</div>Integer Polar Coordinate Spiral with Paterson Primes")

    N = parseInt(N)

    ulamInteractiveData.N = N

    if (ulamInteractiveData.maxNSoFar == null) {
        ulamInteractiveData.maxNSoFar = parseInt(N)
    }

    // console.log(ulamInteractiveData.maxNSoFar, N)
    

    ulamInteractiveData.ulamSpiralCoordinates = polarCoordinatesForSpiralUptoN(ulamInteractiveData.N)

    ulamInteractiveData.scaleFactor = 15/ulamInteractiveData.N

    // 400000, 0.0002, 0.02
    // 400, 0.2, 0.2

    // ptSize = 170/Math.sqrt(ulamInteractiveData.N)

    
    
    // pointDistanceDelta = viewX.linearValueLog(400, 400000, 0.02, 0.0002, ulamInteractiveData.N)

    // console.log(parseFloat(ulamInteractiveData.pointSizeSlider.value), ulamInteractiveData.scaleFactor)

    ulamInteractiveData.pointDistanceDelta = ulamInteractiveData.scaleFactor 
    
    plotAllLimit  = 1000

    for (let i = 0; i < ulamInteractiveData.ulamSpiralCoordinates.length; i++) {

        if (ulamInteractiveData.points[i] != null) {
            if (ulamInteractiveData.ulamSpiralCoordinates.length > 1000) {
                ulamInteractiveData.point.isPrime = isPrime(i)

                if (ulamInteractiveData.point.isPrime) {
                    ulamInteractiveData.pointCoordinates = [ulamInteractiveData.ulamSpiralCoordinates[i][0]*ulamInteractiveData.pointDistanceDelta,  ulamInteractiveData.ulamSpiralCoordinates[i][1]*ulamInteractiveData.pointDistanceDelta]

                    ulamInteractiveData.points[i].set.position(x=ulamInteractiveData.pointCoordinates[0] - visualization.ulamSpiralInteractive.mainSpiral.center.x, y=ulamInteractiveData.pointCoordinates[1] - visualization.ulamSpiralInteractive.mainSpiral.center.y)

                    if (ulamInteractiveData.currentPointSizeSliderValue != parseFloat(ulamInteractiveData.pointSizeSlider.value)) {
                        ulamInteractiveData.points[i].set.size(parseFloat(ulamInteractiveData.pointSizeSlider.value))
                    }

                    ulamInteractiveData.points[i].set.opacity(1)
                }
                else {
                    ulamInteractiveData.points[i].set.opacity(0)
                }        
            }
            else {
                ulamInteractiveData.pointCoordinates = [ulamInteractiveData.ulamSpiralCoordinates[i][0]*ulamInteractiveData.pointDistanceDelta, ulamInteractiveData.ulamSpiralCoordinates[i][1]*ulamInteractiveData.pointDistanceDelta]

                ulamInteractiveData.points[i].set.position(x=ulamInteractiveData.pointCoordinates[0] - visualization.ulamSpiralInteractive.mainSpiral.center.x, y=ulamInteractiveData.pointCoordinates[1] - visualization.ulamSpiralInteractive.mainSpiral.center.y)

                if (ulamInteractiveData.currentPointSizeSliderValue != parseFloat(ulamInteractiveData.pointSizeSlider.value)) {
                    ulamInteractiveData.points[i].set.size(parseFloat(ulamInteractiveData.pointSizeSlider.value))
                }

                ulamInteractiveData.points[i].set.opacity(1)
            }
        }
        else {
            if (ulamInteractiveData.ulamSpiralCoordinates.length > 1000) {
                ulamInteractiveData.point = {}
                ulamInteractiveData.point.isPrime = isPrime(i)

                if (ulamInteractiveData.point.isPrime) {
                    ulamInteractiveData.pointCoordinates = [ulamInteractiveData.ulamSpiralCoordinates[i][0]*ulamInteractiveData.pointDistanceDelta,  ulamInteractiveData.ulamSpiralCoordinates[i][1]*ulamInteractiveData.pointDistanceDelta]

                    ulamInteractiveData.points[i] = rhyform.createPoint().place.at(x=ulamInteractiveData.pointCoordinates[0] - visualization.ulamSpiralInteractive.mainSpiral.center.x, y=ulamInteractiveData.pointCoordinates[1] - visualization.ulamSpiralInteractive.mainSpiral.center.y).loadWith.size(parseFloat(ulamInteractiveData.pointSizeSlider.value)).loadWith.color('hsla(0,0%,50%, 0.1)').addTag('ulamPoints').addTag('ulamPoint-' + i)

                    // ulamInteractiveData.point = {}
                    // ulamInteractiveData.point.isPrime = isPrime(i)

                    if (ulamInteractiveData.point.isPrime) {
                        // console.log(i, primeModuloBaseIsPrimeInBase10(i, 4), parseInt(i.toString(4)))
                        if (primeModuloBaseIsPrimeInBase10(i, 4)) {
                            ulamInteractiveData.points[i].loadWith.color('hsla(198, 100%, 70%, 1)')
                        }
                        else {
                            ulamInteractiveData.points[i].loadWith.color('hsla(40, 100%, 70%, 0.5)')
                        }
                    }

                    ulamInteractiveData.points[i].set.opacity(1)
                }           
            }
            else {
                ulamInteractiveData.pointCoordinates = [ulamInteractiveData.ulamSpiralCoordinates[i][0]*ulamInteractiveData.pointDistanceDelta,  ulamInteractiveData.ulamSpiralCoordinates[i][1]*ulamInteractiveData.pointDistanceDelta]

                ulamInteractiveData.points[i] = rhyform.createPoint().place.at(x=ulamInteractiveData.pointCoordinates[0] - visualization.ulamSpiralInteractive.mainSpiral.center.x, y=ulamInteractiveData.pointCoordinates[1] - visualization.ulamSpiralInteractive.mainSpiral.center.y).loadWith.size(parseFloat(ulamInteractiveData.pointSizeSlider.value)).loadWith.color('hsla(0,0%,50%, 0.1)').addTag('ulamPoints').addTag('ulamPoint-' + i)

                ulamInteractiveData.point = {}
                ulamInteractiveData.point.isPrime = isPrime(i)

                if (ulamInteractiveData.point.isPrime) {
                    // console.log(i, primeModuloBaseIsPrimeInBase10(i, 4), parseInt(i.toString(4)))
                    if (primeModuloBaseIsPrimeInBase10(i, 4)) {
                        ulamInteractiveData.points[i].loadWith.color('hsla(198, 100%, 70%, 1)')
                    }
                    else {
                        ulamInteractiveData.points[i].loadWith.color('hsla(40, 100%, 70%, 0.5)')
                    }
                }
                
                ulamInteractiveData.points[i].set.opacity(1)

            }
        
        }
    }


    
    if (ulamInteractiveData.maxNSoFar > ulamInteractiveData.N) {
        for (let i = ulamInteractiveData.N; i < ulamInteractiveData.maxNSoFar; i++) {
            if (ulamInteractiveData.points[i] != null) {
                ulamInteractiveData.points[i].set.opacity(0)
                // console.log('set')
            }
        }
    }


    if (ulamInteractiveData.N > ulamInteractiveData.maxNSoFar) {
        ulamInteractiveData.maxNSoFar = parseInt(ulamInteractiveData.N)
    }
    

    
    ulamInteractiveData.currentPointSizeSliderValue = parseFloat(ulamInteractiveData.pointSizeSlider.value)

    // rhyform.showElementsWithTag('ulamPoints', inSeconds=0.001)




    // visualizationScenes.ulamInteractiveScene.play()
}


function playSpiralLoop() {
    
    
    ulamInteractiveData.loopValue = 10

    ulamInteractiveData.loop = setInterval(() => {
        
        if (ulamInteractiveData.loopValue < 400) {
            ulamInteractiveData.loopValue = ulamInteractiveData.loopValue + parseInt(Math.sqrt(ulamInteractiveData.loopValue/10))
        }
        else if (ulamInteractiveData.loopValue < 1000 && ulamInteractiveData.loopValue >= 400) {
            ulamInteractiveData.loopValue = ulamInteractiveData.loopValue + parseInt(Math.sqrt(ulamInteractiveData.loopValue/5))
        }
        else if (ulamInteractiveData.loopValue < 4000 && ulamInteractiveData.loopValue >= 1000) {
            ulamInteractiveData.loopValue = ulamInteractiveData.loopValue + parseInt(Math.sqrt(ulamInteractiveData.loopValue/2))
        }
        else if (ulamInteractiveData.loopValue < 40000 && ulamInteractiveData.loopValue >= 4000) {
            ulamInteractiveData.loopValue = ulamInteractiveData.loopValue + parseInt(Math.sqrt(ulamInteractiveData.loopValue))
        }
        else {
            if (ulamInteractiveData.loopValue % 5 == 0) {
                if (ulamInteractiveData.loopValue < 100000) {
                    ulamInteractiveData.pointSizeSlider.set.value(viewX.linearValue(40000, 100000, 0.2, 0.02, ulamInteractiveData.loopValue))
                }
                else {
                    ulamInteractiveData.pointSizeSlider.set.value(0.02)
                }
            }
            ulamInteractiveData.loopValue = ulamInteractiveData.loopValue + parseInt(Math.sqrt(ulamInteractiveData.loopValue*10))
        }

        if (ulamInteractiveData.loopValue > 400000) {
            ulamInteractiveData.loopValue = 400
        }

        ulamInteractiveData.numberOfPointsSlider.set.value(ulamInteractiveData.loopValue)
        generateSpiralPart(ulamInteractiveData.loopValue)

    }, 10);

}

function allowMorePoints() {
    ulamInteractiveData.numberOfPointsSlider.set.max(parseInt(ulamInteractiveData.numberOfPointsSlider.max)*2)
}