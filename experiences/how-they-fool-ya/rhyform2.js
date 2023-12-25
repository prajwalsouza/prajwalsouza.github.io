var rhyform = (function() {
    
    // Constructors and their associated methods


    defaultSpaceBounds = {
        xmax: 11,
        xmin: -11,
    
        ymax: 11,
        ymin: -11,
    
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

        position: 'relative',
    }


    function containsOnlyText(element) {
        for (var i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeType !== 3) {
                return false;
            }
        }
        return true;
    }


    function showElement(element, inSeconds=1) {

        animationOptions = {}
        animationOptions.keyframes = {}
        animationOptions.keyframes["0"] = {}
        animationOptions.keyframes[inSeconds.toString()] = {}

        animationOptions.elementsAndPropertiesInvolved = {}

        if (element instanceof Point || element instanceof Line || element instanceof Curve || element instanceof Circle) {

            if (element instanceof Point) {
                element.updatePointRender();
            }
            
            animationOptions.keyframes["0"][element.name] = {
                'graph': element.space.name + "-graph",
                'object': element.name,
                'options': { opacity: 0}
            }

            animationOptions.keyframes[inSeconds.toString()][element.name] = {
                'graph': element.space.name + "-graph",
                'object': element.name,
                'options': { opacity: 1}
            }

            animationOptions.elementsAndPropertiesInvolved[element.name] = {
                element: element,
                properties: ['opacity']
            }

            anim = new Animation(0, inSeconds*2, inSeconds, 30, animateImmediately = false, animOptions=animationOptions)
            return anim;

        } else if (element instanceof Text || element instanceof Button || element instanceof ValueSlider) {
            
            htmlAnimationOptions = {
                "propertiesAtStart": {
                    "opacity": 0,
                },
                "propertiesAtEnd": {
                    "opacity": 1,
                },
                "element": element.element,
            }

            
            htmlAnimationOptions.elementsAndPropertiesInvolved = {}

            htmlAnimationOptions.elementsAndPropertiesInvolved[element.name] = {
                element: element,
                properties: ['opacity']
            }


            anim = new Animation(0, inSeconds*2, inSeconds, 30, animateImmediately = false, animOptions=htmlAnimationOptions, type="html-css-style")
            return anim;
        } else if (element instanceof Equation || element instanceof VectorImage) {
            // console.log(element.curves)
            for (let curveElement of element.curves) {
                if (curveElement instanceof Curve) {
                    animationOptions.keyframes["0"][curveElement.name] = {
                        'graph': curveElement.space.name + "-graph",
                        'object': curveElement.name,
                        'options': { opacity: 0}
                    }

                    animationOptions.keyframes[inSeconds.toString()][curveElement.name] = {
                        'graph': curveElement.space.name + "-graph",
                        'object': curveElement.name,
                        'options': { opacity: 1}
                    }

                    animationOptions.elementsAndPropertiesInvolved[curveElement.name] = {
                        element: curveElement,
                        properties: ['opacity']
                    }
                }
            }
           
            
            anim = new Animation(0, inSeconds*2, inSeconds, 30, animateImmediately = false, animOptions=animationOptions)
            return anim;

            
        } else {
            return null;
        }

        
    }

    function hideElement(element, inSeconds=1) {

        animationOptions = {}
        animationOptions.keyframes = {}
        animationOptions.keyframes["0"] = {}
        animationOptions.keyframes[inSeconds.toString()] = {}

        animationOptions.elementsAndPropertiesInvolved = {}

        if (element instanceof Point || element instanceof Line || element instanceof Curve) {
            
            animationOptions.keyframes["0"][element.name] = {
                'graph': element.space.name + "-graph",
                'object': element.name,
                'options': { opacity: 1}
            }

            animationOptions.keyframes[inSeconds.toString()][element.name] = {
                'graph': element.space.name + "-graph",
                'object': element.name,
                'options': { opacity: 0}
            }

            animationOptions.elementsAndPropertiesInvolved[element.name] = {
                element: element,
                properties: ['opacity']
            }


            anim = new Animation(0, inSeconds*2, inSeconds, 30, animateImmediately = false, animOptions=animationOptions)
            return anim;

        } else if (element instanceof Text || element instanceof Button || element instanceof ValueSlider) {
            
            htmlAnimationOptions = {
                "propertiesAtStart": {
                    "opacity": 1,
                },
                "propertiesAtEnd": {
                    "opacity": 0,
                },
                "element": element.element,
            }

            htmlAnimationOptions.elementsAndPropertiesInvolved = {}

            htmlAnimationOptions.elementsAndPropertiesInvolved[element.name] = {
                element: element,
                properties: ['opacity']
            }


            anim = new Animation(0, inSeconds*2, inSeconds, 30, animateImmediately = false, animOptions=htmlAnimationOptions, type="html-css-style")
            return anim;
        } else if (element instanceof Equation  || element instanceof VectorImage) {
                // console.log(element.curves)
                for (let curveElement of element.curves) {
                    if (curveElement instanceof Curve) {
                        animationOptions.keyframes["0"][curveElement.name] = {
                            'graph': curveElement.space.name + "-graph",
                            'object': curveElement.name,
                            'options': { opacity: 1}
                        }
    
                        animationOptions.keyframes[inSeconds.toString()][curveElement.name] = {
                            'graph': curveElement.space.name + "-graph",
                            'object': curveElement.name,
                            'options': { opacity: 0}
                        }
    
                        animationOptions.elementsAndPropertiesInvolved[curveElement.name] = {
                            element: curveElement,
                            properties: ['opacity']
                        }
                    }
                }
               
                
                anim = new Animation(0, inSeconds*2, inSeconds, 30, animateImmediately = false, animOptions=animationOptions)
                return anim;
        } else {
            return null;
        }

        
    }

    function moveToTopViewX(viewXElement) {
        // viewX.moveToTop(graphname, elementname)

        // element: viewXElement.name
        // graph: viewXElement.space.name + "-graph"
        
        viewX.moveToTop(viewXElement.space.name + "-graph", viewXElement.name)
    }


    function changeViewXProperties(element, propertiesAndValuesBefore, propertiesAndValuesAfter, inSeconds=1) {
        animationOptions = {}
        animationOptions.keyframes = {}
        animationOptions.keyframes["0"] = {}
        animationOptions.keyframes[inSeconds.toString()] = {}

        if (element instanceof Point || element instanceof Line || element instanceof Curve || element instanceof Circle) {

            
            animationOptions.keyframes["0"][element.name] = {
                'graph': element.space.name + "-graph",
                'object': element.name
            }

            animationOptions.keyframes["0"][element.name]["options"] = propertiesAndValuesBefore

            animationOptions.keyframes[inSeconds.toString()][element.name] = {
                'graph': element.space.name + "-graph",
                'object': element.name
            }

            animationOptions.keyframes[inSeconds.toString()][element.name]["options"] = propertiesAndValuesAfter;

            props = Object.keys(propertiesAndValuesBefore);

            animationOptions.elementsAndPropertiesInvolved = {}

            animationOptions.elementsAndPropertiesInvolved[element.name] = {
                element: element,
                properties: props
            }

            // console.log(animationOptions)

            anim = new Animation(0, inSeconds*1.1, inSeconds, 60, animateImmediately = false, animOptions=animationOptions)
            return anim;

        } 
    }

    function updateViewXProperties(element, properties) {
        propertiesToSet = []
        if (element instanceof Point || element instanceof Line || element instanceof Curve || element instanceof Circle) {
            propertyToSet = {
                'graphName': element.space.name + "-graph",
                'objectName': element.name,
                'properties': properties
            }
            viewX.updateObjects([propertyToSet])
        } 

        
    }


    function changeHTMLProperties(element, propertiesAndValuesBefore, propertiesAndValuesAfter, inSeconds=1) {

        animationOptions = {}
        animationOptions.keyframes = {}
        animationOptions.keyframes["0"] = {}
        animationOptions.keyframes[inSeconds.toString()] = {}



        htmlAnimationOptions = {}

        htmlAnimationOptions.propertiesAtStart = propertiesAndValuesBefore;
        htmlAnimationOptions.propertiesAtEnd = propertiesAndValuesAfter;
        htmlAnimationOptions.element = element.element;
        
        htmlAnimationOptions.elementsAndPropertiesInvolved = {}

        htmlAnimationOptions.elementsAndPropertiesInvolved[element.name] = {
            element: element,
            properties: Object.keys(propertiesAndValuesBefore)
        }


        anim = new Animation(0, inSeconds*2, inSeconds, 30, animateImmediately = false, animOptions=htmlAnimationOptions, type="html-css-style")
        return anim;
    }


    
    function parseSVGPath(svgPath, width, height) {
        const commands = svgPath.match(/[MCLHVQTSA][^MCLHVQTSA]*/g);
        let currentPoint = { x: 0, y: 0 };
        let subPaths = [];
        let currentSubPath = [];


    
        for (const command of commands) {
            const type = command.charAt(0);
            const args = command.slice(1).trim().split(/[\s,]+/).map(Number);
    
            switch (type) {
                case 'M': // MoveTo command
                    // Finish the current subpath and start a new one
                    if (currentSubPath.length > 0) {
                        subPaths.push(currentSubPath);
                        currentSubPath = [];
                    }
                    currentPoint = { x: args[0], y: args[1] };
                    break;
                case 'C': // Cubic Bezier curve
                    const P1 = { x: args[0], y: args[1] };
                    const P2 = { x: args[2], y: args[3] };
                    const P3 = { x: args[4], y: args[5] };
                    const points = cubicBezierPoints(currentPoint, P1, P2, P3, 10, width, height);
                    currentSubPath.push(...points);
                    currentPoint = P3;
                    break;
                case 'L': // LineTo command
                    var endPoint = { x: args[0], y: args[1] };
                    scaledEndPoint = {x: args[0]/width, y: args[1]/width}
                    currentSubPath.push(scaledEndPoint);
                    currentPoint = endPoint;
                    break;
                // Other commands like 'L', 'Z', etc., can be added here
            }
        }
    
        if (currentSubPath.length > 0) {
            subPaths.push(currentSubPath);
        }
    
        return subPaths;
    }

    function parseSVGPathToPath(svgPath, width, height) {
        const commands = svgPath.match(/[MCLHVQTSA][^MCLHVQTSA]*/g);
        let currentPoint = { x: 0, y: 0 };
        let currentSubPath = [];
    
        for (const command of commands) {
            const type = command.charAt(0);
            const args = command.slice(1).trim().split(/[\s,]+/).map(Number);
    
            switch (type) {
                case 'M': // MoveTo command
                    // Finish the current subpath and start a new one
                    values = [args[0]/width, args[1]/width]
                    currentSubPath.push({type: 'M', x: values[0], y: values[1]});
                    currentPoint = { x: args[0], y: args[1] };
                    break;
                case 'C': // Cubic Bezier curve
                    const P1 = { x: args[0], y: args[1] };
                    const P2 = { x: args[2], y: args[3] };
                    const P3 = { x: args[4], y: args[5] };
                    const points = cubicBezierPoints(currentPoint, P1, P2, P3, rhyform.drawingPrecision, width, height);

                    for (let point of points) {
                        currentSubPath.push({type: 'L', x: point.x, y: point.y});
                    }
                    // currentSubPath.push(...points);
                    currentPoint = P3;
                    break;
                case 'L': // LineTo command
                    var endPoint = { x: args[0], y: args[1] };
                    scaledEndPoint = {x: args[0]/width, y: args[1]/width}
                    currentSubPath.push({type: 'L', x: scaledEndPoint.x, y: scaledEndPoint.y});
                    // currentSubPath.push(scaledEndPoint);
                    currentPoint = endPoint;
                    break;
                // Other commands like 'L', 'Z', etc., can be added here
            }
        }
    
        // if (currentSubPath.length > 0) {
        //     subPaths.push(currentSubPath);
        // }
    
        return currentSubPath;
    }
    
    function cubicBezierPoints(P0, P1, P2, P3, numPoints = 10, width, height) {
        let points = [];
        for (let i = 0; i <= numPoints; i++) {
            let t = i / numPoints;
            let x = Math.pow(1 - t, 3) * P0.x +
                    3 * Math.pow(1 - t, 2) * t * P1.x +
                    3 * (1 - t) * Math.pow(t, 2) * P2.x +
                    Math.pow(t, 3) * P3.x;
            let y = Math.pow(1 - t, 3) * P0.y +
                    3 * Math.pow(1 - t, 2) * t * P1.y +
                    3 * (1 - t) * Math.pow(t, 2) * P2.y +
                    Math.pow(t, 3) * P3.y;
        
            x = x/width;
            y = y/width;
            points.push({x, y});
        }
        return points;
    }
    

    function convertSVGToPNG(svgString) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
    
            img.onload = function() {
                scaleFactor = 3;
                canvas.width = img.width * scaleFactor;
                canvas.height = img.height * scaleFactor;
                
                // Fill the canvas with the specified background color
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.scale(scaleFactor, scaleFactor);

                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL("image/png"));
            };
    
            img.onerror = function(e) {
                reject(e);
            };
    
            img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgString)));
        });
    }


    function imageToPoints(imageURL) {
        return new Promise((resolve, reject) => {
            Potrace.setParameter({
                turdsize: 0.01,
                alphamax: 3,
                opttolerance: 0.6,
                optcurve: false,
                turnpolicy: "white"
            });
            Potrace.loadImageFromUrl(imageURL);

            Potrace.process(function() {
                var outputsvg = Potrace.getSVG(1);
                var svgDiv = document.createElement("div");
                svgDiv.innerHTML = outputsvg;

                var pathsFound = svgDiv.getElementsByTagName("path");
                var svgItself = svgDiv.getElementsByTagName("svg")[0];
                var heightOfSvg = parseFloat(svgItself.getAttribute('height'));
                var widthOfSvg = parseFloat(svgItself.getAttribute('width'));

                var pathPoints = [];
                for (let path of pathsFound) {
                    var parsedPoints = parseSVGPathToPath(path.getAttribute("d"), widthOfSvg, heightOfSvg);
                    pathPoints.push(parsedPoints);
                }

                // console.log(pathPoints)
  
                scaleFactor = 1

                imageInfo = {
                    points: pathPoints,
                    width: widthOfSvg/scaleFactor,
                    height: heightOfSvg/scaleFactor
                }

                resolve(imageInfo);
            });
        });
    }

    function equationToPoints(latexExpression, fontSize=1) {
        return new Promise((resolve, reject) => {
            var mathjaxRenderingDiv = document.createElement("div");
            mathjaxRenderingDiv.style.display = "none";
            mathjaxRenderingDiv.style.position = "absolute";
            mathjaxRenderingDiv.innerHTML = "$$" + latexExpression + "$$";
            mathjaxRenderingDiv.style.fontSize = fontSize;
            document.body.appendChild(mathjaxRenderingDiv);

            // console.log(mathjaxRenderingDiv)
    
            MathJax.typesetPromise([mathjaxRenderingDiv]).then(function () {
                var svg = mathjaxRenderingDiv.getElementsByTagName("svg")[0];
                svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                svg.style.position = "absolute";
                svg.style.top = 0;
                svg.style.left = 0;
    
                var svgData = svg.outerHTML;
                document.body.removeChild(mathjaxRenderingDiv);
    
                convertSVGToPNG(svgData).then(pngDataURL => {
                    Potrace.setParameter({
                        turdsize: 0.1,
                        alphamax: 3,
                        opttolerance: 0.6,
                        optcurve: false,
                        turnpolicy: "white"
                    });
                    Potrace.loadImageFromUrl(pngDataURL);
    
                    Potrace.process(function() {
                        var outputsvg = Potrace.getSVG(1);
                        var svgDiv = document.createElement("div");
                        svgDiv.innerHTML = outputsvg;
    
                        var pathsFound = svgDiv.getElementsByTagName("path");
                        var svgItself = svgDiv.getElementsByTagName("svg")[0];
                        var heightOfSvg = parseFloat(svgItself.getAttribute('height'));
                        var widthOfSvg = parseFloat(svgItself.getAttribute('width'));

                        
    
                        var pathPoints = [];
                        for (let path of pathsFound) {
                            var parsedPoints = parseSVGPath(path.getAttribute("d"), widthOfSvg, heightOfSvg);
                            pathPoints.push(parsedPoints);
                        }
                        


                        scaleFactor = 3

                        equationInfo = {
                            points: pathPoints,
                            width: widthOfSvg/scaleFactor,
                            height: heightOfSvg/scaleFactor
                        }
    
                        resolve(equationInfo);
                    });
                }).catch(error => {
                    console.error("Error converting SVG to PNG:", error);
                    reject(error);
                });
            }).catch(error => {
                console.error("Error with MathJax rendering:", error);
                reject(error);
            });
        });
    }

    function manageTags(tagName, object, action) {
        if (action === 'add') {
            // Add the tag if it doesn't exist
            if (object.tags.indexOf(tagName) === -1) {
                object.tags.push(tagName);
                // Update the global tag registry
                if (rhyform && rhyform.tags) {
                    rhyform.tags[tagName] = rhyform.tags[tagName] || [];
                    rhyform.tags[tagName].push(object);
                }
            }
        } else if (action === 'remove') {
            // Remove the tag if it exists
            var index = object.tags.indexOf(tagName);
            if (index !== -1) {
                object.tags.splice(index, 1);
                // Update the global tag registry
                if (rhyform && rhyform.tags && rhyform.tags[tagName]) {
                    var tagIndex = rhyform.tags[tagName].indexOf(object);
                    if (tagIndex !== -1) {
                        rhyform.tags[tagName].splice(tagIndex, 1);
                    }
                }
            }
        }

        return object;
    }
    







    function Camera(name = "camera", atElement=null) {
        this.name = name;
        this.bounds = {
            x: defaultSpaceBounds.xmin,
            y: defaultSpaceBounds.ymin,
            width: defaultSpaceBounds.xmax - defaultSpaceBounds.xmin,
            height: defaultSpaceBounds.ymax - defaultSpaceBounds.ymin,
        }

        this.atElement = atElement;

        this.space = null;

        this.pixelsPerUnit = this.atElement.clientWidth/this.bounds.width

        this.labelDistance = this.bounds.width*12/this.atElement.clientWidth;

        this.setBounds = function(newBounds) {
            this.bounds = newBounds;
            this.pixelsPerUnit = this.atElement.clientWidth/this.bounds.width
            this.labelDistance = this.bounds.width*12/this.atElement.clientWidth;

            camBounds = rhyform.libraryFunctions.convertBoundsToViewXBounds(this.bounds)
            viewX.updateGraphZoom(this.space.svgGraph.name, camBounds)
        }
    }

    function Space(spaceName = "space", inElement="body") {

        this.name = spaceName;
        this.element = document.createElement("space");
        this.element.setAttribute("name", spaceName);

        this.svgLayer = document.createElement("div");
        this.svgLayer.setAttribute("id", spaceName + "-svg-layer");


        this.element.style.position = 'relative';
        this.element.style.display = 'block';
        this.element.style.width = '100%';

        this.svgLayer.style.position = 'relative';
        this.svgLayer.style.width = '100%';

        this.htmlLayer = document.createElement("div");
        this.htmlLayer.setAttribute("id", spaceName + "-html-layer");
        this.htmlLayer.style.position = 'absolute';
        this.htmlLayer.style.width = '100%';
        this.htmlLayer.style.height = '100%';
        this.htmlLayer.style.zIndex = '3';

        this.element.appendChild(this.htmlLayer);
        this.element.appendChild(this.svgLayer);
        document.querySelector(inElement).appendChild(this.element);

        this.svgGraph = viewX.addGraph(this.svgLayer, spaceName + "-graph", defaultSpaceBounds)

        this.camera = new Camera(name = "mainCamera", atElement=this.element);

        this.camera.space = this;
        
        camBounds = rhyform.libraryFunctions.convertBoundsToViewXBounds(this.camera.bounds)
        viewX.updateGraphZoom(this.svgGraph.name, camBounds)


    }

    function Scene(sceneName) {
        this.name = sceneName;
        this.selectedSpace = null;
        this.animations = {};
        this.animationAdditionIndex = 0;
        this.animatingElementsAndProperties = {};
        this.audioAdditionIndex = 0;

        rhyform.selectActiveScene(this);

        
        this.resetToFrame = function(animationIndex) {

            if (this.resetting == false || this.resetting == undefined) {
                this.resetting = true;
                this.resettingData = {};
                // const sceneElements = rhyform.tags["<scene>" + this.name] || [];
                // console.log(sceneElements)

                // console.log(this)
                this.pause();
                
                this.animationIndices = Object.keys(this.animations);

                // this.resetScene = new Scene(sceneName = this.name + "-reset")
                // rhyform.activeScene = this.resetScene;

                // for (let element of sceneElements) {
                //     if (element != this.seekBar) {
                //         // element.hide(inSeconds=0.001);
                        
                //     }
                // }

                // this.resetScene.play();

                for (let i = this.animationIndex; i >= 0; i--) {
                    this.animation = this.animations[this.animationIndices[i]];

                    // console.log(this.name, i, 'backward')

                    if (this.animation.type == 'viewX') {
                        // console.log("Rewind")

                        // this.resettingData.frames = viewX.animationData[this.animation.name][1].keyframes

                        // this.resettingData.frameKeys = Object.keys(this.resettingData.frames)

                        viewX.setAnimationFrame(this.animation.name, 0);
                    }
                    else if (this.animation.type == 'html-css-style') {
                        // console.log("re-css")
                        // console.log(this.animation.animationOptions)
                        
                        this.resettingData.transitionString = ""
                        for (var property in animation.animationOptions.propertiesAtStart) {
                            this.resettingData.transitionString += property + " 0s, ";
                        }

                        this.animation.animationOptions.element.style.transition = this.resettingData.transitionString.slice(0, -2);

                        if (this.animation.animationOptions.element != this.seekBar) {
                            for (var property in this.animation.animationOptions.propertiesAtStart) {
                                this.animation.animationOptions.element.style[property] = this.animation.animationOptions.propertiesAtStart[property];
                            }
                        }

                        // transitionString = ""

                        // endHasOpacity = false;

                        // for (var property in animation.animationOptions.propertiesAtEnd) {
                        //     transitionString += property + " " + animation.duration + "s, ";

                        //     if (property == 'opacity') {
                        //         endHasOpacity = true;
                        //     }

                        // }
                        
                        // animation.animationOptions.element.style.transition = transitionString.slice(0, -2);

                        // if (animation.animationOptions.element != this.seekBar) {
                        //     for (var property in animation.animationOptions.propertiesAtEnd) {
                        //         animation.animationOptions.element.style[property] = animation.animationOptions.propertiesAtEnd[property];

                        //         console.log(animation.animationOptions.element.innerText, property, animation.animationOptions.propertiesAtEnd[property])
                        //     }
                        // }

                        // if (endHasOpacity) {
                        //     opacityValue = animation.animationOptions.propertiesAtEnd['opacity'];
                        //     if (opacityValue == 0) {
                        //         animation.animationOptions.element.style.pointerEvents = 'none';
                        //     }
                        //     else {
                        //         animation.animationOptions.element.style.pointerEvents = 'auto';
                        //     }
                        // }
                    }
                    else if (this.animation.type == 'inner-html') {
                        
                        // console.log("re-html")
                        if (this.animation.animationOptions.text != undefined) {
                            this.animation.animationOptions.element.innerHTML = "";
                        }

                    }
                    // else if (animation.type == 'audio') {
                    //     if (animation.animationOptions.action == 'play') {
                    //         from = animation.animationOptions.from;

                    //         if (from == undefined) {
                    //             from = 0;
                    //         }

                    //         animation.animationOptions.element.currentTime = from;
                    //         animation.animationOptions.element.play();
                    //     }
                    //     else if (animation.animationOptions.action == 'pause') {
                    //         animation.animationOptions.element.pause();
                    //     }
                    //     else if (animation.animationOptions.action == 'stop') {
                    //         animation.animationOptions.element.pause();
                    //         animation.animationOptions.element.currentTime = 0;
                    //     }
                    // }
                    // else if (animation.type == 'wait') {
                    //     // do nothing
                    // }
                }


                for (let i = 0; i < animationIndex; i++) {
                    this.animation = this.animations[this.animationIndices[i]];
                    
                    // console.log(this.name, i, 'forward')

                    if (this.animation.type == 'viewX') {
                        // console.log(viewX.animationData[this.animation.name][1])
                         this.resettingData.frames = viewX.animationData[this.animation.name][1].keyframes

                        this.resettingData.frameKeys = Object.keys(this.resettingData.frames)

                        // convert keys to numbers from strings

                        keysAsNumbers = []
                        for (let key of this.resettingData.frameKeys) {
                            keysAsNumbers.push(parseFloat(key))
                        }

                        // get max key

                        keysAsNumbers.sort(function(a, b){return b-a});

                        viewX.setAnimationFrame(this.animation.name, keysAsNumbers[0]);
                    }
                    else if (this.animation.type == 'html-css-style') {
                        // console.log("css")
                        // console.log(this.animation.animationOptions)
                        
                        // transitionString = ""
                        // for (var property in animation.animationOptions.propertiesAtStart) {
                        //     transitionString += property + " 0s, ";
                        // }

                        // animation.animationOptions.element.style.transition = transitionString.slice(0, -2);
                        // if (animation.animationOptions.element != this.seekBar) {
                        //     for (var property in animation.animationOptions.propertiesAtStart) {
                        //         animation.animationOptions.element.style[property] = animation.animationOptions.propertiesAtStart[property];
                        //     }
                        // }

                        // transitionString = ""

                        // endHasOpacity = false;

                        // for (var property in animation.animationOptions.propertiesAtEnd) {
                        //     transitionString += property + " " + animation.duration + "s, ";

                        //     if (property == 'opacity') {
                        //         endHasOpacity = true;
                        //     }

                        // }
                        
                        // animation.animationOptions.element.style.transition = transitionString.slice(0, -2);

                        if (this.animation.animationOptions.element != this.seekBar) {
                            for (var property in this.animation.animationOptions.propertiesAtEnd) {
                                this.animation.animationOptions.element.style[property] = this.animation.animationOptions.propertiesAtEnd[property];

                                console.log(this.animation.animationOptions.element.innerText, property, this.animation.animationOptions.propertiesAtEnd[property])
                            }
                        }

                        // if (endHasOpacity) {
                        //     opacityValue = animation.animationOptions.propertiesAtEnd['opacity'];
                        //     if (opacityValue == 0) {
                        //         animation.animationOptions.element.style.pointerEvents = 'none';
                        //     }
                        //     else {
                        //         animation.animationOptions.element.style.pointerEvents = 'auto';
                        //     }
                        // }
                    }
                    else if (this.animation.type == 'inner-html') {
                        // console.log("html")
                        if (this.animation.animationOptions.text != undefined) {
                            this.animation.animationOptions.element.innerHTML = this.animation.animationOptions.text;
                        }

                    }
                    // else if (animation.type == 'audio') {
                    //     if (animation.animationOptions.action == 'play') {
                    //         from = animation.animationOptions.from;

                    //         if (from == undefined) {
                    //             from = 0;
                    //         }

                    //         animation.animationOptions.element.currentTime = from;
                    //         animation.animationOptions.element.play();
                    //     }
                    //     else if (animation.animationOptions.action == 'pause') {
                    //         animation.animationOptions.element.pause();
                    //     }
                    //     else if (animation.animationOptions.action == 'stop') {
                    //         animation.animationOptions.element.pause();
                    //         animation.animationOptions.element.currentTime = 0;
                    //     }
                    // }
                    // else if (animation.type == 'wait') {
                    //     // do nothing
                    // }
                }

                // animationKey = this.animationIndices[animationIndex]
                // animation = this.animations[animationKey];

                // console.log(animation)

                this.animationIndex = animationIndex;
                // this.playAnimation(animationIndex);

                this.resetting = false;

        
            }
        }

        this.playGroupAnimation = function(animationGroup) {
            animationFromGroup = animationGroup.list[animationGroup.animationIndex]


            if (animationFromGroup.type == 'viewX') {
                viewX.playAnimation(animationFromGroup.name, animationFromGroup.start, animationFromGroup.end, animationFromGroup.duration, animationFromGroup.fps);
            }
            else if (animationFromGroup.type == 'html-css-style') {

                animationFromGroup.animationOptions.element.style.transition = "all 0s";
                
                for (var property in animationFromGroup.animationOptions.propertiesAtStart) {
                    animationFromGroup.animationOptions.element.style[property] = animationFromGroup.animationOptions.propertiesAtStart[property];
                }
                
                animationFromGroup.animationOptions.element.style.transition = "all " + animationFromGroup.duration + "s";

                for (var property in animationFromGroup.animationOptions.propertiesAtEnd) {
                    animationFromGroup.animationOptions.element.style[property] = animationFromGroup.animationOptions.propertiesAtEnd[property];
                }
            }
            else if (animationFromGroup.type == 'inner-html') {
                
                if (animationFromGroup.animationOptions.text != undefined) {
                    animationFromGroup.animationOptions.element.innerHTML = animationFromGroup.animationOptions.text;
                }
            }
            else if (animationFromGroup.type == 'function') {
                animationFromGroup.animationOptions.function();
            }

            animationGroup.animationIndex += 1;

            if (animationGroup.animationIndex < animationGroup.list.length) {

                (function(animationFromGroup, viewX, self) {

                    if (animationFromGroup.animateNextImmediately) {
                        self.playGroupAnimation(animationGroup)
                    }
                    else {
                        setTimeout(function() {
                            self.playGroupAnimation(animationGroup)
                        }, animationFromGroup.duration*1000);
                    }

                    

                    
                })(animationFromGroup, viewX, this);

            }   
        }

        this.playAnimation = function(animationIndex) {
            this.currentAnimationKey = this.animationIndices[animationIndex]
            this.currentAnimation = this.animations[ this.currentAnimationKey];

            // console.log(this.animationIndex, this.name)

            if (this.seekBar != null) {
                
                // get approximate time of animation

                timeOfAnimation = 0;
                ignoreNext = false;
                for (var i = 0; i < animationIndex; i++) {
                    if (!ignoreNext) {
                        timeOfAnimation += this.animations[this.animationIndices[i]].duration;
                    }

                    if (this.animations[this.animationIndices[i]].animateNextImmediately) {
                        ignoreNext = true;
                    }
                    else {
                        ignoreNext = false;
                    }
                }

                maxDuration = 0;

                
                ignoreNext = false;

                for (var i = 0; i < this.animationIndices.length; i++) {
                    if (!ignoreNext) {
                        maxDuration += this.animations[this.animationIndices[i]].duration;
                    }

                    if (this.animations[this.animationIndices[i]].animateNextImmediately) {
                        ignoreNext = true;
                    }
                    else {
                        ignoreNext = false;
                    }

                }

                this.seekBar.timeOfAnimation = timeOfAnimation;
                this.seekBar.maxDuration = maxDuration;

                this.seekBar.max = this.animationIndices.length;
                this.seekBar.value = animationIndex + 1;




                this.seekBar.updateSlider();
            }

            // console.log(this.currentAnimation, this.name, animationIndex, this)
            for (var elementName in this.currentAnimation.animationOptions.elementsAndPropertiesInvolved) {
                animationElementPropString = JSON.stringify([elementName, this.currentAnimation.animationOptions.elementsAndPropertiesInvolved[elementName]['properties']]);
                this.animatingElementsAndProperties[animationElementPropString] = 'animating'
            }
            
            this.currentAnimation.scene = this;
            
            if (!this.currentAnimation.animateNextImmediately && this.animationIndex > 1) {
                this.atTime += this.currentAnimation.duration;
            }

            if (this.currentAnimation.type == 'viewX') {
                viewX.playAnimation(this.currentAnimation.name, this.currentAnimation.start, this.currentAnimation.end, this.currentAnimation.duration, this.currentAnimation.fps);
            }
            else if (this.currentAnimation.type == 'html-css-style') {

                transitionString = ""
                for (var property in this.currentAnimation.animationOptions.propertiesAtStart) {
                    transitionString += property + " 0s, ";
                }

                this.currentAnimation.animationOptions.element.style.transition = transitionString.slice(0, -2);
                
                for (var property in this.currentAnimation.animationOptions.propertiesAtStart) {
                    this.currentAnimation.animationOptions.element.style[property] = this.currentAnimation.animationOptions.propertiesAtStart[property];
                }

                transitionString = ""

                endHasOpacity = false;

                for (var property in this.currentAnimation.animationOptions.propertiesAtEnd) {
                    transitionString += property + " " + this.currentAnimation.duration + "s, ";

                    if (property == 'opacity') {
                        endHasOpacity = true;
                    }

                }
                
                this.currentAnimation.animationOptions.element.style.transition = transitionString.slice(0, -2);

                for (var property in this.currentAnimation.animationOptions.propertiesAtEnd) {
                    this.currentAnimation.animationOptions.element.style[property] = this.currentAnimation.animationOptions.propertiesAtEnd[property];
                }

                if (endHasOpacity) {
                    opacityValue = this.currentAnimation.animationOptions.propertiesAtEnd['opacity'];
                    if (opacityValue == 0) {
                        this.currentAnimation.animationOptions.element.style.pointerEvents = 'none';
                    }
                    else {
                        this.currentAnimation.animationOptions.element.style.pointerEvents = 'auto';
                    }
                }
            }
            else if (this.currentAnimation.type == 'inner-html') {
                
                if (this.currentAnimation.animationOptions.text != undefined) {
                    this.currentAnimation.animationOptions.element.innerHTML = this.currentAnimation.animationOptions.text;
                    MathJax.typeset([this.currentAnimation.animationOptions.element])
                }

            }
            else if (this.currentAnimation.type == 'audio') {
                if (this.currentAnimation.animationOptions.action == 'play') {
                    from = this.currentAnimation.animationOptions.from;

                    if (from == undefined) {
                        from = 0;
                    }

                    this.currentAnimation.animationOptions.element.currentTime = from;
                    this.currentAnimation.animationOptions.element.play();
                }
                else if (this.currentAnimation.animationOptions.action == 'pause') {
                    this.currentAnimation.animationOptions.element.pause();
                }
                else if (this.currentAnimation.animationOptions.action == 'stop') {
                    this.currentAnimation.animationOptions.element.pause();
                    this.currentAnimation.animationOptions.element.currentTime = 0;
                }
            }
            else if (this.currentAnimation.type == 'wait') {
                // do nothing
            }
            else if (this.currentAnimation.type == 'function') {
                this.currentAnimation.animationOptions.function();
            }



            
            this.animationIndex = animationIndex + 1;
            

            if (this.animationIndex < this.animationIndices.length) {
                (function(currentAnimation, viewX, self) {

                    if (currentAnimation.animateNextImmediately) {
                        if (currentAnimation.beginsAGroup) {
                            currentAnimation.group.animationIndex = 0;
                            
                            self.playGroupAnimation(currentAnimation.group);
                            self.playAnimation(self.animationIndex + currentAnimation.group.list.length - 1);
                        }
                        else {
                            self.playAnimation(self.animationIndex);
                        }
                        
                    }
                    else {
                        self.nextFrameTimeout = setTimeout(function() {
                            self.playAnimation(self.animationIndex);
                        }, currentAnimation.duration*1000);
                    }

                    
                })(this.currentAnimation, viewX, this);
            }


        }

        this.play = function(from=0) {
            this.atTime = 0;
            this.animationIndex = 0;

            this.animationIndices = Object.keys(this.animations);

            this.playAnimation(from);
        }

        this.pause = function() {

            clearTimeout(this.nextFrameTimeout);

            // Pause all audios playing. 

            for (var animationKey in this.animations) {
                animation = this.animations[animationKey];
                if (animation.type == 'audio') {
                    animation.animationOptions.element.pause();
                }
            }

            // Return object identifying the pause state of the scene and times at which audios are paused

            pauseState = {
                animationIndex: this.animationIndex,
                atTime: this.atTime,
                audioPauseTimes: {}
            }

            for (var animationKey in this.animations) {
                animation = this.animations[animationKey];
                if (animation.type == 'audio') {
                    pauseState.audioPauseTimes[animationKey] = animation.animationOptions.element.currentTime;
                }
            }

            return pauseState;
            
        }


        this.clear = function() {
            this.pause();
            this.animationIndex = 0;
            this.animations = {};
            this.animationIndices = [];
            this.animatingElementsAndProperties = {};
            this.audioAdditionIndex = 0;
            this.animationAdditionIndex = 0;
            this.atTime = 0;
            this.seekBar = null;
        }

        this.createSeekBar = function() {

            // const defaults = {
            //     at: {x: 0, y: 0, z: 0},
            //     width: 5,
            //     min: 0,
            //     max: 100,
            //     value: 50,
            //     step: 1,
            //     sliderProperties: {
            //         onChange: function(){ console.log("Slider value changed"); },
            //         color: "white",
            //         thickness: 0.2,
            //         isAlwaysVisible: false,
            //         backgroundType: 'glassy',
            //         borderColor: 'hsla(0, 0%, 50%, 0.1)'
            //     },
            //     valueDisplayProperties: {
            //         color: "white",
            //         fontSize: "xxx-large",
            //         font: "Gaegu"
            //     },
            //     labelTextProperties: {
            //         color: "hsla(0, 0%, 70%, 1)",
            //         fontSize: 'auto',
            //         font: "Gaegu",
            //         text: "Temperature"
            //     },
            //     labelDescriptionProperties: {
            //         color: "hsla(0, 0%, 40%, 1)",
            //         fontSize: 'small',
            //         font: "Gaegu",
            //         text: "The value represents the change in some quantity that is important to this visualization. Maybe it's the number of people in a room, or the amount of money in a bank account or number of stars in a galaxy ⭐️."
            //     }
            // };

            sliderOptions = {
                at: {x: -8, y: -8},
                min: 0,
                max: Object.keys(this.animations).length,
                value: this.animationAdditionIndex,
                width: 17,
                step: 1,
                labelTextProperties: {
                    text: '',
                },
                labelDescriptionProperties: {
                    text: '',
                },
                valueDisplayProperties: {
                    fontSize: 'medium',
                    color: 'grey'
                },
                sliderProperties: {
                    forScene: this,
                    onChange: async function() {
                        if (this.forScene.resetting == false || this.forScene.resetting == undefined) {

                            this.forScene.pause();
                            // this.forScene.animationIndex = this.forScene.seekBar.value - 1;
                            if (this.forScene.seekBar.value > 1) {
                                this.forScene.resetToFrame(this.forScene.seekBar.value - 1);
                                this.forScene.playAnimation(this.forScene.seekBar.value - 1);
                            }
                            else if (this.forScene.seekBar.value == 1) {
                                this.forScene.resetToFrame(0);
                                this.forScene.playAnimation(0);

                            }
                        }
                    },
                    valueTransformToText: function(value) {

                        // seconds to hours, minutes, seconds


                        hours = Math.floor(this.forScene.seekBar.timeOfAnimation/3600);
                        minutes = Math.floor((this.forScene.seekBar.timeOfAnimation - hours*3600)/60);
                        seconds = this.forScene.seekBar.timeOfAnimation - hours*3600 - minutes*60;

                        if (hours < 10) {
                            hours = "0" + hours.toString();
                        }
                        if (minutes < 10) {
                            minutes = "0" + minutes.toString();
                        }

                        if (seconds < 10) {
                            seconds = "0" + seconds.toFixed(1).toString();
                        }
                        else {
                            seconds = seconds.toFixed(1).toString();
                        }
                        finalString = ""
                        
                        if (hours != "00") {
                            finalString += hours + ":";
                        }

                        finalString += minutes + ":" + seconds;
                        

                        // console.log(hours, minutes, seconds)

                        return finalString;
                    },
                    isAlwaysVisible: true,
                    borderColor: 'transparent',
                    thickness: 2,
                    backgroundType: 'none',
                    trackColor: 'hsla(198, 0%, 10%, 0.1)',
                    trackFillColor: 'hsla(198, 70%, 30%, 0.5)',
                    thumbSize: 10,
                    thumbColor: 'hsla(198, 30%, 70%, 1)',
                }
            }

            
        


            this.seekBar = rhyform.createSlider(sliderOptions);
            this.seekBar.scene = this;

            return this.seekBar;
        }

        this.getElementsInvolved = function() {
            return rhyform.tags["<scene>" + this.name] || [];
        }

        
    }

    

    Scene.prototype.selectSpace = function(space) {
        this.selectedSpace = space;
    };


    function Point(at={x:0, y:0, z:0}, size=0.5, color="white") {
        this.tags = [];

        this.addTag = function(tagName) {
            manageTags(tagName, this, 'add');
            return this;
        }

        this.removeTag = function(tagName) {
            manageTags(tagName, this, 'remove');
            return this;
        }

        this.coordinates = at;

        this.space = rhyform.activeScene.selectedSpace;
        this.scene = rhyform.activeScene;
        this.addTag("<scene>" + this.scene.name)
        this.name = "point-" + rhyform.objectAdditionIndex;
        this.size = size;
        this.color = color;

        this.seen = false;

        
        this.bounds = {
            xmin: this.coordinates.x,
            xmax: this.coordinates.x,
            ymin: this.coordinates.y,
            ymax: this.coordinates.y,
            zmin: this.coordinates.z,
            zmax: this.coordinates.z,
        }

        this.bounds.center = {
            x: this.coordinates.x,
            y: this.coordinates.y,
            z: this.coordinates.z,
        }

        this.added = false;
        this.element = null;

        this.createBasicPoint = function() {
            if (!this.added) {
                addingPointData = {x:this.coordinates.x, y:this.coordinates.y, pointsize: this.size, pointcolor: this.color, opacity: 0}
                addingPoint = viewX.addPoint(this.space.name + "-graph", this.name, addingPointData)

                this.added = true;
                this.element = addingPoint;
            }
        }

        this.updatePointRender = function() {

            if (this.seen) {
                if (!this.added) {
                    this.createBasicPoint()
                }
                
                addingPointData = {x:this.coordinates.x, y:this.coordinates.y, pointsize: this.size, pointcolor: this.color}
                updatingPoint = viewX.updatePointXY(this.space.name + "-graph", this.name, this.coordinates.x, this.coordinates.y)
                updatingPoint = viewX.updatePoint(this.space.name + "-graph", this.name, addingPointData)
            }

            // this.element = updatingPoint;
        }


        
        // this.createBasicPoint()

        rhyform.objectAdditionIndex += 1;


        this.show = function(inSeconds=1) {
            
            this.seen = true;
            this.createBasicPoint();
            theAnim = showElement(this, inSeconds);
            return theAnim;
        }

        this.hide = function(inSeconds=1) {
            
            this.seen = false;

            this.createBasicPoint();
            theAnim = hideElement(this, inSeconds);
            return theAnim;
        }

        this.place = {
 
            at: (x=0, y=0, z=0) => {
                this.coordinates = {x: x, y: y, z: z};
                this.bounds = {
                    xmin: this.coordinates.x,
                    xmax: this.coordinates.x,
                    ymin: this.coordinates.y,
                    ymax: this.coordinates.y,
                    zmin: this.coordinates.z,
                    zmax: this.coordinates.z,
                }

                this.bounds.center = {
                    x: this.coordinates.x,
                    y: this.coordinates.y,
                    z: this.coordinates.z,
                }

                this.updatePointRender();
                return this;
            },

            nextTo: (element, atDistance) => {
                if (atDistance === undefined) {
                    atDistance = this.space.camera.labelDistance;
                }
                this.coordinates.y = element.bounds.ymin - atDistance;
                this.coordinates.x = element.bounds.xmax + atDistance;
                this.updatePointRender();
                return this;
            },

            above: (element, atDistance) => {
                if (atDistance === undefined) {
                    atDistance = this.space.camera.labelDistance;
                }
                this.coordinates.y = element.bounds.ymax + atDistance;
                this.coordinates.x = element.bounds.center.x;
                this.updatePointRender();
                return this;
            },

            below: (element, atDistance) => {
                if (atDistance === undefined) {
                    atDistance = this.space.camera.labelDistance;
                }




                this.coordinates.y = element.bounds.ymin - atDistance;
                this.coordinates.x = element.bounds.center.x;

                this.bounds = {
                    xmin: this.coordinates.x,
                    xmax: this.coordinates.x,
                    ymin: this.coordinates.y,
                    ymax: this.coordinates.y,
                    zmin: this.coordinates.z,
                    zmax: this.coordinates.z,
                }

                this.bounds.center = {
                    x: this.coordinates.x,
                    y: this.coordinates.y,
                    z: this.coordinates.z,
                }

                this.updatePointRender();
                return this;
            },

            leftOf: (element, atDistance) => {
                if (atDistance === undefined) {
                    atDistance = this.space.camera.labelDistance;
                }
                this.coordinates.y = element.bounds.center.y;
                this.coordinates.x = element.bounds.xmin - atDistance;
                this.updatePointRender();
                return this;
            },

            rightOf: (element, atDistance) => {
                if (atDistance === undefined) {
                    atDistance = this.space.camera.labelDistance;
                }
                this.coordinates.y = element.bounds.center.y;
                this.coordinates.x = element.bounds.xmax + atDistance;
                this.updatePointRender();
                return this;
            },
        };

        this.loadWith = {
            size: (size) => {
                this.size = size;
                return this;
            },

            color: (color) => {
                this.color = color;
                return this;
            },

            position: (x=0, y=0, z= 0) => {
                this.coordinates = {x: x, y: y, z: z};
                
                this.bounds = {
                    xmin: this.coordinates.x,
                    xmax: this.coordinates.x,
                    ymin: this.coordinates.y,
                    ymax: this.coordinates.y,
                    zmin: this.coordinates.z,
                    zmax: this.coordinates.z,
                }
        
                this.bounds.center = {
                    x: this.coordinates.x,
                    y: this.coordinates.y,
                    z: this.coordinates.z,
                }

                return this;
            }
        };

        this.set = {
            size: (size) => {
                this.createBasicPoint();
                updateViewXProperties(this, {pointsize: size});
                this.size = size;
                return this;
            },

            color: (color) => {
                this.createBasicPoint();
                updateViewXProperties(this, {pointcolor: color});
                this.color = color;
                return this;
            },

            position: (x=0, y=0, z= 0) => {
                this.createBasicPoint();
                updateViewXProperties(this, {x: x, y: y});
                this.coordinates = {x: x, y: y, z: z};
                return this;
            },

            opacity: (opacity) => {
                this.createBasicPoint();
                updateViewXProperties(this, {opacity: opacity});
                
                this.opacity = opacity;
                // console.log(this.opacity)
                return this;
            }
        }

        this.change = {
            size: (size, inSeconds=1) => {
                this.createBasicPoint();
                theAnim = changeViewXProperties(this, {pointsize: this.size}, {pointsize: size}, inSeconds);
                this.size = size;
                return theAnim;
            },

            color: (color, inSeconds=1) => {
                this.createBasicPoint();
                theAnim = changeViewXProperties(this, {pointcolor: this.color}, {pointcolor: color}, inSeconds);
                this.color = color;
                return theAnim;
            },

            position: (coordinates, inSeconds=1) => {
                this.updatePointRender();
                theAnim = changeViewXProperties(this, {x: this.coordinates.x, y: this.coordinates.y}, {x: coordinates.x, y: coordinates.y}, inSeconds);

                this.coordinates = coordinates;
                return theAnim;
            }

        };


        this.moveToTop = function() {
            moveToTopViewX(this);
        }

        this.remove = function() {
            viewX.removePoint(this.space.name + "-graph", this.name);
        }


    }

    function Text(content) {
        this.content = content;
        this.tags = [];

        this.addTag = function(tagName) {
            manageTags(tagName, this, 'add');
            return this;
        }

        this.removeTag = function(tagName) {
            manageTags(tagName, this, 'remove');
            return this;
        }

        this.scene = rhyform.activeScene;
        this.addTag("<scene>" + this.scene.name)

        this.added = false;
        this.element = null;

        this.coordinates = {
            x: 0,
            y: 0,
        };
        
        this.space = rhyform.activeScene.selectedSpace;
        this.name = "text-" + rhyform.objectAdditionIndex;
        this.color = "white";
        this.font = rhyform.font;
        this.fontSize = rhyform.fontSize;
        this.width = 3;
        this.height = 0;
        this.textAlign = "left";

        this.findBounds = function() {

            this.bounds = {
                xmin: this.coordinates.x,
                xmax: this.coordinates.x + this.width,
                ymin: this.coordinates.y - this.height,
                ymax: this.coordinates.y,
                zmin: this.coordinates.z,
                zmax: this.coordinates.z,
            }

            this.bounds.center = {
                x: this.coordinates.x + this.width/2,
                y: this.coordinates.y - this.height/2,
                z: this.coordinates.z,
            }
        }

        this.findBounds();


        rhyform.objectAdditionIndex += 1;

        this.createBasicText = function() {
            if (!this.added) {
                var textDiv = document.createElement("div");
                textDiv.innerHTML = this.content;
                textDiv.style.position = "absolute";
                textDiv.style.color = this.color;
                textDiv.style.fontFamily = this.font;
                textDiv.style.fontSize = this.fontSize;
                textDiv.style.pointerEvents = "none";

                htmlCoordinates = viewX.getHTMLCoordinates(this.space.name + "-graph", this.coordinates.x, this.coordinates.y)

                textDiv.style.left = htmlCoordinates.x + "px";
                textDiv.style.top = htmlCoordinates.y + "px";

                textDiv.style.width = this.width*this.space.camera.pixelsPerUnit + "px";
                textDiv.style.textAlign = this.textAlign;

                document.getElementById(this.space.name + "-html-layer").appendChild(textDiv);
                textDiv.style.opacity = 0;

                MathJax.typeset([textDiv])
                let nodes = textDiv.childNodes;

                for (let node of nodes) {
                    if (node.nodeType == 3) {
                        var span = document.createElement('span');
                        textDiv.insertBefore(span, node);

                        span.appendChild(node);
                    }
                }

                this.nodes = textDiv.childNodes;

                this.added = true;
                this.element = textDiv;

                this.height = textDiv.clientHeight/this.space.camera.pixelsPerUnit;
                this.findBounds();
                
            }
        }

        this.placeAtCoordinates = function() {
            htmlCoordinates = viewX.getHTMLCoordinates(this.space.name + "-graph", this.coordinates.x, this.coordinates.y)

            this.element.style.left = htmlCoordinates.x + "px";
            this.element.style.top = htmlCoordinates.y + "px";
        }

        this.createBasicText()

        this.updateBasicText = function() {
            textDiv = this.element;
            textDiv.innerHTML = this.content;
            textDiv.style.position = "absolute";
            textDiv.style.color = this.color;
            textDiv.style.fontFamily = this.font;
            textDiv.style.fontSize = this.fontSize;
            textDiv.style.pointerEvents = "none";

            htmlCoordinates = viewX.getHTMLCoordinates(this.space.name + "-graph", this.coordinates.x, this.coordinates.y)

            textDiv.style.left = htmlCoordinates.x + "px";
            textDiv.style.top = htmlCoordinates.y + "px";

            textDiv.style.width = this.width*this.space.camera.pixelsPerUnit + "px";
            textDiv.style.textAlign = this.textAlign;

            document.getElementById(this.space.name + "-html-layer").appendChild(textDiv);
            textDiv.style.opacity = 0;

            MathJax.typeset([textDiv])
            let nodes = textDiv.childNodes;

            for (let node of nodes) {
                if (node.nodeType == 3) {
                    var span = document.createElement('span');
                    textDiv.insertBefore(span, node);

                    span.appendChild(node);
                }
            }

            this.nodes = textDiv.childNodes;

            this.added = true;
            this.element = textDiv;

            this.height = textDiv.clientHeight/this.space.camera.pixelsPerUnit;
            this.findBounds();
        }

        this.change = {
            color: (color, inSeconds=1) => {
                this.createBasicText();
                theAnim = changeHTMLProperties(this, {color: this.color}, {color: color}, inSeconds);
                this.color = color;
                return theAnim;
            },

            content: (content, inSeconds=1) => {
                this.content = content;
                
                htmlAnimationOptions = {
                    "text": this.content,
                    "speed": 1,
                    "element": this.element,
                }

                animationDurationFactor = inSeconds

                htmlAnimationOptions.elementsAndPropertiesInvolved = {}

                htmlAnimationOptions.elementsAndPropertiesInvolved[this.name] = {
                    element: this,
                    properties: ["content"]
                }
                
                anim = new Animation(0, animationDurationFactor, animationDurationFactor, 50, animateImmediately = false, animOptions=htmlAnimationOptions, type="inner-html")


                return anim;
            },

            place: {
                to: (coordinates, inSeconds=1) => {
                    this.createBasicText();
                    oldHtmlCoordinates = viewX.getHTMLCoordinates(this.space.name + "-graph", this.coordinates.x, this.coordinates.y)
    
                    this.coordinates = coordinates;
                    htmlCoordinates = viewX.getHTMLCoordinates(this.space.name + "-graph", this.coordinates.x, this.coordinates.y)
                    theAnim = changeHTMLProperties(this, {top: oldHtmlCoordinates.y + "px", left: oldHtmlCoordinates.x + "px"}, {top: htmlCoordinates.y + "px", left: htmlCoordinates.x + "px"}, inSeconds);
    
                    return theAnim;
                },

                below: (element, atDistance, inSeconds=1) => {
                    if (atDistance === undefined) {
                        atDistance = this.space.camera.labelDistance;
                    }

                    this.findHeightAndBounds(element);
    
                    this.coordinates.y = element.bounds.ymin - atDistance;
                    this.coordinates.x = element.bounds.center.x;
    
                    if (element instanceof Text) {
                        this.coordinates.x = element.bounds.xmin;
                    }

                    
                    this.createBasicText();
                    oldHtmlCoordinates = viewX.getHTMLCoordinates(this.space.name + "-graph", this.coordinates.x, this.coordinates.y)
    
                    htmlCoordinates = viewX.getHTMLCoordinates(this.space.name + "-graph", this.coordinates.x, this.coordinates.y)
                    theAnim = changeHTMLProperties(this, {top: oldHtmlCoordinates.y + "px", left: oldHtmlCoordinates.x + "px"}, {top: htmlCoordinates.y + "px", left: htmlCoordinates.x + "px"}, inSeconds);
    
                    return theAnim;



    
                    this.placeAtCoordinates();
                    return this;
                }
            }
        }



        this.findHeightAndBounds = function(element) {
            if (element instanceof Text) {
                element.height = element.element.clientHeight/this.space.camera.pixelsPerUnit;
                element.findBounds();
            }

            if (this instanceof Text) {
                this.height = this.element.clientHeight/this.space.camera.pixelsPerUnit;
                this.findBounds();
            }
        }

        this.place = {
            
            at: (x=0, y=0, z=0) => {
                this.coordinates = {x: x, y: y, z: z};


                this.placeAtCoordinates();
                return this;
            },

            nextTo: (element, atDistance) => {
                if (atDistance === undefined) {
                    atDistance = this.space.camera.labelDistance;
                }

                this.findHeightAndBounds(element);
                this.coordinates.y = element.bounds.ymin - atDistance;
                this.coordinates.x = element.bounds.xmax + atDistance;
                
                this.placeAtCoordinates();
                return this;
            },

            above: (element, atDistance) => {
                if (atDistance === undefined) {
                    atDistance = this.space.camera.labelDistance;
                }
                this.findHeightAndBounds(element);

                this.coordinates.y = element.bounds.ymax + atDistance;
                this.coordinates.x = element.bounds.center.x;

                if (element instanceof Text) {
                    this.coordinates.x = element.bounds.xmin;
                }

                this.placeAtCoordinates();
                return this;
            },

            below: (element, atDistance) => {
                if (atDistance === undefined) {
                    atDistance = this.space.camera.labelDistance;
                }

                this.findHeightAndBounds(element);

                this.coordinates.y = element.bounds.ymin - atDistance;

                if (element instanceof Text) {
                    this.coordinates.x = element.bounds.xmin;
                }
                else {
                    this.coordinates.x = element.bounds.center.x;
                }
                
                this.placeAtCoordinates();
                return this;
            },

            leftOf: (element, atDistance) => {
                if (atDistance === undefined) {
                    atDistance = this.space.camera.labelDistance;
                }
                this.findHeightAndBounds(element);

                this.coordinates.y = element.bounds.center.y;
                this.coordinates.x = element.bounds.xmin - atDistance;
                this.placeAtCoordinates();
                return this;
            },

            rightOf: (element, atDistance) => {
                if (atDistance === undefined) {
                    atDistance = this.space.camera.labelDistance;
                }

                this.findHeightAndBounds(element);

                this.coordinates.y = element.bounds.center.y;
                this.coordinates.x = element.bounds.xmax + atDistance;
                this.placeAtCoordinates();
                return this;
            },
        };

        this.loadWith = {
            fontSize: (fontSize) => {
                this.fontSize = fontSize;
                this.element.style.fontSize = this.fontSize;
                return this;
            },
            
            font: (font) => {
                this.font = font;
                this.element.style.fontFamily = this.font;
                return this;
            },

            color: (color) => {
                if (color instanceof Gradient) {
                    this.element.classList.add("rhyform-gradient-text");
                    this.element.style.backgroundImage = color.cssString;
                    this.color = color;
                }
                else {
                    this.color = color;
                    this.element.style.color = this.color;
                }
                return this;
            },

            width: (width) => {
                this.width = width;
                this.element.style.width = this.width*this.space.camera.pixelsPerUnit + "px";
                return this;
            },

            content: (content) => {
                this.content = content;
                this.element.innerHTML = this.content;
                return this;
            },

            textAlign: (textAlign) => {
                this.textAlign = textAlign;
                this.element.style.textAlign = this.textAlign;
                return this;
            }
        }; 
        
        this.set = this.loadWith;


        this.write = function(lettersPerSecond=20) {

            animGroup = new AnimationGroup()

             if (this instanceof Text) {
                
                for (let node of this.nodes) {
                    if (containsOnlyText(node)) {
                        htmlAnimationOptions = {
                            "text": "",
                            "speed": lettersPerSecond,
                            "element": node
                        }

                        htmlAnimationOptions.elementsAndPropertiesInvolved = {}
                        htmlAnimationOptions.elementsAndPropertiesInvolved[this.name] = {
                            element: this,
                            properties: ["content"]
                        }

                        anim = new Animation(0, 0, 0, 30, animateImmediately = false, animOptions=htmlAnimationOptions, type="inner-html")
                        animGroup.addAnim(anim)
                    }
                    else {
                        
                        htmlAnimationOptions = {
                            "propertiesAtStart": {
                                "opacity": 0,
                            },
                            "propertiesAtEnd": {
                                "opacity": 0,
                            },
                            "element": node,
                        }

                        htmlAnimationOptions.elementsAndPropertiesInvolved = {}
                        htmlAnimationOptions.elementsAndPropertiesInvolved[this.name] = {
                            element: this,
                            properties: ["content"]
                        }
    
                        anim = new Animation(0, 0, 0, 30, animateImmediately = false, animOptions=htmlAnimationOptions, type="html-css-style")
                        animGroup.addAnim(anim)
                    }
                }

                htmlAnimationOptions = {
                    "propertiesAtStart": {
                        "opacity": 0,
                    },
                    "propertiesAtEnd": {
                        "opacity": 1,
                    },
                    "element": this.element,
                }

                htmlAnimationOptions.elementsAndPropertiesInvolved = {}
                htmlAnimationOptions.elementsAndPropertiesInvolved[this.name] = {
                    element: this,
                    properties: ["content"]
                }

                anim = new Animation(0, 0, 0, 30, animateImmediately = false, animOptions=htmlAnimationOptions, type="html-css-style")
                animGroup.addAnim(anim)

                for (let node of this.nodes) {
                    if (containsOnlyText(node)) {
                        for (let i = 0; i < node.textContent.length; i++) {

                            textSubString = node.textContent.substring(0, i+1)
                        
                            htmlAnimationOptions = {
                                "text": textSubString,
                                "speed": lettersPerSecond,
                                "element": node
                            }

                            animationDurationFactor = (1/lettersPerSecond)

                            htmlAnimationOptions.elementsAndPropertiesInvolved = {}

                            htmlAnimationOptions.elementsAndPropertiesInvolved[this.name] = {
                                element: this,
                                properties: ["content"]
                            }
                            
                            anim = new Animation(0, animationDurationFactor, animationDurationFactor, 50, animateImmediately = false, animOptions=htmlAnimationOptions, type="inner-html")
                            animGroup.addAnim(anim)
                        }
                    }
                    else {
                        htmlAnimationOptions = {
                            "propertiesAtStart": {
                                "opacity": 0,
                            },
                            "propertiesAtEnd": {
                                "opacity": 1,
                            },
                            "element": node,
                        }

                        htmlAnimationOptions.elementsAndPropertiesInvolved = {}

                        htmlAnimationOptions.elementsAndPropertiesInvolved[this.name] = {
                            element: this,
                            properties: ["content"]
                        }
    
                        anim = new Animation(0, 0.2, 0.2, 30, animateImmediately = false, animOptions=htmlAnimationOptions, type="html-css-style")
                        animGroup.addAnim(anim)
                    }
                }

                return animGroup;
            } else {
                console.log("Must be text ");
                return null;
            }

            
        }

        this.show = function(inSeconds=1) {
            theAnim = showElement(this, inSeconds);
            return theAnim;
        }

        this.hide = function(inSeconds=1) {
            // this.element.style.pointerEvents = "none";
            theAnim = hideElement(this, inSeconds);
            return theAnim;
        }

        this.remove = function() {
            
            // console.log(this.element.innerHTML)
            // remove the html element from div
            if (this.element.parentNode != null) {
                this.element.outerHTML = "";
            }
            else {
                this.element.remove();
            }
            // this.element.parentNode.removeChild(this.element);
            // console.log(this.element)
            
        }


    }
 
    function Button(content, onClick) {
        this.content = content;
        this.tags = [];

        this.addTag = function(tagName) {
            manageTags(tagName, this, 'add');
            return this;
        }

        this.removeTag = function(tagName) {
            manageTags(tagName, this, 'remove');
            return this;
        }

        this.scene = rhyform.activeScene;
        this.addTag("<scene>" + this.scene.name)

        buttonText = new Text(content);
        this.textObject = buttonText;

        this.border = "2px solid hsla(0, 0%, 30%, 0.2)";
        this.borderRadius = "8px";

        
        // this.borderGradient = new Gradient(at=[{color: "hsla(198, 100%, 70%,0.8)", position: 0}, {color: "hsla(320, 100%, 30%, 0.2)", position: 1}], direction="horizontal");


        // this.borderImage = this.borderGradient.cssString + " 1 1 stretch";

        this.element = this.textObject.element;
        this.element.style.cursor = "pointer";
        this.element.style.userSelect = "none";
        this.element.style.webkitUserSelect = "none";
        this.element.style.mozUserSelect = "none";
        this.element.style.msUserSelect = "none";
        this.element.style.border = this.border
        this.element.style.borderRadius = this.borderRadius;
        // this.element.style.borderImage = this.borderImage;
        this.element.style.padding = "4px 4px";
        this.element.style.transition = "auto";
        this.element.style.zIndex = "4";

        // add Class
        this.element.classList.add("rhyform-button");

        this.added = false;

        this.coordinates = this.textObject.coordinates;

        this.space = rhyform.activeScene.selectedSpace;
        this.name = "button-" + rhyform.objectAdditionIndex;
        this.color = this.textObject.color;
        this.font = this.textObject.font;
        this.fontSize = this.textObject.fontSize;
        this.width = this.textObject.width;
        this.height =  this.textObject.height;
        this.textAlign = "center";

        this.textObject.loadWith.textAlign(this.textAlign);

        this.place = this.textObject.place;

        this.loadWith = this.textObject.loadWith;


        this.show = function(inSeconds=1) {
            // this.textObject.element.style.pointerEvents = "auto";
            theAnim = showElement(this.textObject, inSeconds);
            return theAnim;
        }

        this.hide = function(inSeconds=1) {
            // this.textObject.element.style.pointerEvents = "none";
            theAnim = hideElement(this.textObject, inSeconds);
            return theAnim;
        }

        this.setClick = function(onClick) {
            this.element.addEventListener("click", onClick);
        }

        this.setClick(onClick);

        this.remove = function() {
            this.textObject.remove();
        }

        return this;
        
    }


    function Gradient(at=[{color: "white", position: 0}, {color: "black", position: 1}], direction="horizontal") {
        this.at = at;
        this.direction = direction;
        this.cssString = "";

        // linear-gradient(to left top, hsla(var(--base-hue), 100%, 50%, 1), hsla(var(--secondary-hue), 100%, 50%, 1));

        if (this.direction == "horizontal") {
            this.cssString = "linear-gradient(to right";
        }

        if (this.direction == "vertical") {
            this.cssString = "linear-gradient(to bottom";
        }

        for (let colorStop of this.at) {
            this.cssString += ", " + colorStop.color + " " + colorStop.position*100 + "%";
        }

        this.cssString += ")";
        
        return this;
    }


    function Line(between=[point1, point2], thickness=0.5, color="white") {
        
        this.space = rhyform.activeScene.selectedSpace;
        this.name = "line-" + rhyform.objectAdditionIndex;
        this.tags = [];

        this.addTag = function(tagName) {
            manageTags(tagName, this, 'add');
            return this;
        }

        this.removeTag = function(tagName) {
            manageTags(tagName, this, 'remove');
            return this;
        }

        this.scene = rhyform.activeScene;
        this.addTag("<scene>" + this.scene.name)

        this.point1 = between[0];
        this.point2 = between[1];


        this.bounds = {
            xmin: Math.min(this.point1.coordinates.x, this.point2.coordinates.x),
            xmax: Math.max(this.point1.coordinates.x, this.point2.coordinates.x),
            ymin: Math.min(this.point1.coordinates.y, this.point2.coordinates.y),
            ymax: Math.max(this.point1.coordinates.y, this.point2.coordinates.y),
            zmin: Math.min(this.point1.coordinates.z, this.point2.coordinates.z),
            zmax: Math.max(this.point1.coordinates.z, this.point2.coordinates.z)
        }

        this.bounds.center = {
            x: (this.bounds.xmin + this.bounds.xmax) / 2,
            y: (this.bounds.ymin + this.bounds.ymax) / 2,
            z: (this.bounds.zmin + this.bounds.zmax) / 2
        }

        this.coordinates = {
            x: this.bounds.xmax,
            y: this.bounds.ymin,
        }

        this.thickness = thickness;
        this.color = color;

        this.added = false;
        this.element = null;

        this.createBasicLine = function() {
            if (!this.added) {
                addingLineData = {x1:this.point1.coordinates.x, y1:this.point1.coordinates.y, x2:this.point2.coordinates.x, y2:this.point2.coordinates.y, strokewidth: this.thickness, linecolor: this.color, opacity: 0}
                addingLine = viewX.addLine(this.space.name + "-graph", this.name, addingLineData)

                this.added = true;
                this.element = addingLine;
            }
        }

        this.updateLineRender = function() {
            if (!this.added) {
                this.createBasicLine()
            }

            updatingLineData = {x1:this.point1.coordinates.x, y1:this.point1.coordinates.y, x2:this.point2.coordinates.x, y2:this.point2.coordinates.y, strokewidth: this.thickness, linecolor: this.color}
            updatingLine = viewX.updateLine(this.space.name + "-graph", this.name, updatingLineData)
        }


        
        this.moveToTop = function() {
            moveToTopViewX(this);
        }
        

        
        // this.createBasicLine()

        rhyform.objectAdditionIndex += 1;

        this.place = {

            between: (point1, point2) => {
                this.point1 = point1;
                this.point2 = point2;

                return this;
            },

        };

        this.show = function(inSeconds=1) {
            this.createBasicLine();
            theAnim = showElement(this, inSeconds);
            return theAnim;
        }

        this.hide = function(inSeconds=1) {
            this.createBasicLine();
            theAnim = hideElement(this, inSeconds);
            return theAnim;
        }

        this.drawFromPoint = function(point=this.point1, lengthPerSecond=1) {
            this.createBasicLine();
            if (point == this.point1 || point == this.point2) {

                distanceBetweenPoints = rhyform.libraryFunctions.distanceBetweenPoints(this.point1, this.point2)

                inSeconds = distanceBetweenPoints / lengthPerSecond

                animationOptions = {}
                animationOptions.keyframes = {}
                animationOptions.keyframes["0"] = {}
                animationOptions.keyframes[inSeconds.toString()] = {}

                animationOptions.keyframes["0"][this.name] = {
                    'graph': this.space.name + "-graph",
                    'object': this.name,
                    'options': { opacity: 1, x1: point.coordinates.x, y1: point.coordinates.y, x2: point.coordinates.x, y2: point.coordinates.y}
                }

                toPoint = this.point1 == point ? this.point2 : this.point1;
    
                animationOptions.keyframes[inSeconds.toString()][this.name] = {
                    'graph': this.space.name + "-graph",
                    'object': this.name,
                    'options': { opacity: 1, x1: point.coordinates.x, y1: point.coordinates.y, x2: toPoint.coordinates.x, y2: toPoint.coordinates.y}
                }

                animationOptions.elementsAndPropertiesInvolved = {}
                
                animationOptions.elementsAndPropertiesInvolved[this.name] = {
                    element: this,
                    properties: ["x1", "y1", "x2", "y2"]
                }

                anim = new Animation(0, inSeconds, inSeconds, 30, animateImmediately = false, animOptions=animationOptions)
                return anim;

            }
        }

        this.draw = function(lengthPerSecond=1) {
            this.createBasicLine();
            point = Math.random() > 0.5 ? this.point1 : this.point2;
            if (point == this.point1 || point == this.point2) {

                distanceBetweenPoints = rhyform.libraryFunctions.distanceBetweenPoints(this.point1, this.point2)

                inSeconds = distanceBetweenPoints / lengthPerSecond

                animationOptions = {}
                animationOptions.keyframes = {}
                animationOptions.keyframes["0"] = {}
                animationOptions.keyframes[inSeconds.toString()] = {}

                animationOptions.keyframes["0"][this.name] = {
                    'graph': this.space.name + "-graph",
                    'object': this.name,
                    'options': { opacity: 1, x1: point.coordinates.x, y1: point.coordinates.y, x2: point.coordinates.x, y2: point.coordinates.y}
                }

                toPoint = this.point1 == point ? this.point2 : this.point1;
    
                animationOptions.keyframes[inSeconds.toString()][this.name] = {
                    'graph': this.space.name + "-graph",
                    'object': this.name,
                    'options': { opacity: 1, x1: point.coordinates.x, y1: point.coordinates.y, x2: toPoint.coordinates.x, y2: toPoint.coordinates.y}
                }

                animationOptions.elementsAndPropertiesInvolved = {}

                animationOptions.elementsAndPropertiesInvolved[this.name] = {
                    element: this,
                    properties: ["x1", "y1", "x2", "y2"]
                }

                anim = new Animation(0, inSeconds, inSeconds, 30, animateImmediately = false, animOptions=animationOptions)
                return anim;

            }
        }


        this.loadWith = {
            

            thickness: (thickness) => {
                this.thickness = thickness;
                this.createBasicLine();
                updatingLineData = {strokewidth: this.thickness}
                viewX.updateLine(this.space.name + "-graph", this.name, updatingLineData)
                return this;
            },

            color: (color) => {
                this.color = color;
                return this;
            },
        };

        this.change = {
            point1 : (point, inSeconds=1) => {
                animationOptions = {}
                animationOptions.keyframes = {}
                animationOptions.keyframes["0"] = {}
                animationOptions.keyframes[inSeconds.toString()] = {}

                animationOptions.keyframes["0"][this.name] = {
                    'graph': this.space.name + "-graph",
                    'object': this.name,
                    'options': {x1:this.point1.coordinates.x, y1:this.point1.coordinates.y, x2:this.point2.coordinates.x, y2:this.point2.coordinates.y}
                }

                this.point1 = point;

                this.bounds = {
                    xmin: Math.min(this.point1.coordinates.x, this.point2.coordinates.x),
                    xmax: Math.max(this.point1.coordinates.x, this.point2.coordinates.x),
                    ymin: Math.min(this.point1.coordinates.y, this.point2.coordinates.y),
                    ymax: Math.max(this.point1.coordinates.y, this.point2.coordinates.y),
                    zmin: Math.min(this.point1.coordinates.z, this.point2.coordinates.z),
                    zmax: Math.max(this.point1.coordinates.z, this.point2.coordinates.z)
                }

                this.bounds.center = {
                    x: (this.bounds.xmin + this.bounds.xmax) / 2,
                    y: (this.bounds.ymin + this.bounds.ymax) / 2,
                    z: (this.bounds.zmin + this.bounds.zmax) / 2
                }

                this.coordinates = {
                    x: this.bounds.xmax,
                    y: this.bounds.ymin,
                }
    
                animationOptions.keyframes[inSeconds.toString()][this.name] = {
                    'graph': this.space.name + "-graph",
                    'object': this.name,
                    'options': {x1:this.point1.coordinates.x, y1:this.point1.coordinates.y, x2:this.point2.coordinates.x, y2:this.point2.coordinates.y}
                }

                animationOptions.elementsAndPropertiesInvolved = {}

                animationOptions.elementsAndPropertiesInvolved[this.name] = {
                    element: this,
                    properties: ["x1", "y1", "x2", "y2"]
                }

                anim = new Animation(0, inSeconds*1.8, inSeconds, 30, animateImmediately = false, animOptions=animationOptions)
                return anim;

            },

            point2 : (point, inSeconds=1) => {
                animationOptions = {}
                animationOptions.keyframes = {}
                animationOptions.keyframes["0"] = {}
                animationOptions.keyframes[inSeconds.toString()] = {}

                animationOptions.keyframes["0"][this.name] = {
                    'graph': this.space.name + "-graph",
                    'object': this.name,
                    'options': {x1:this.point1.coordinates.x, y1:this.point1.coordinates.y, x2:this.point2.coordinates.x, y2:this.point2.coordinates.y}
                }

                this.point2 = point;

                this.bounds = {
                    xmin: Math.min(this.point1.coordinates.x, this.point2.coordinates.x),
                    xmax: Math.max(this.point1.coordinates.x, this.point2.coordinates.x),
                    ymin: Math.min(this.point1.coordinates.y, this.point2.coordinates.y),
                    ymax: Math.max(this.point1.coordinates.y, this.point2.coordinates.y),
                    zmin: Math.min(this.point1.coordinates.z, this.point2.coordinates.z),
                    zmax: Math.max(this.point1.coordinates.z, this.point2.coordinates.z)
                }

                this.bounds.center = {
                    x: (this.bounds.xmin + this.bounds.xmax) / 2,
                    y: (this.bounds.ymin + this.bounds.ymax) / 2,
                    z: (this.bounds.zmin + this.bounds.zmax) / 2
                }

                this.coordinates = {
                    x: this.bounds.xmax,
                    y: this.bounds.ymin,
                }
    
                animationOptions.keyframes[inSeconds.toString()][this.name] = {
                    'graph': this.space.name + "-graph",
                    'object': this.name,
                    'options': {x1:this.point1.coordinates.x, y1:this.point1.coordinates.y, x2:this.point2.coordinates.x, y2:this.point2.coordinates.y}
                }

                animationOptions.elementsAndPropertiesInvolved = {}


                animationOptions.elementsAndPropertiesInvolved[this.name] = {
                    element: this,
                    properties: ["x1", "y1", "x2", "y2"]
                }

                anim = new Animation(0, inSeconds*1.8, inSeconds, 30, animateImmediately = false, animOptions=animationOptions)
                return anim;

            },

            points: (point1, point2, inSeconds=1) => {
                animationOptions = {}
                animationOptions.keyframes = {}
                animationOptions.keyframes["0"] = {}
                animationOptions.keyframes[inSeconds.toString()] = {}

                animationOptions.keyframes["0"][this.name] = {
                    'graph': this.space.name + "-graph",
                    'object': this.name,
                    'options': {x1:this.point1.coordinates.x, y1:this.point1.coordinates.y, x2:this.point2.coordinates.x, y2:this.point2.coordinates.y}
                }

                this.point1 = point1;
                this.point2 = point2;

                this.bounds = {
                    xmin: Math.min(this.point1.coordinates.x, this.point2.coordinates.x),
                    xmax: Math.max(this.point1.coordinates.x, this.point2.coordinates.x),
                    ymin: Math.min(this.point1.coordinates.y, this.point2.coordinates.y),
                    ymax: Math.max(this.point1.coordinates.y, this.point2.coordinates.y),
                    zmin: Math.min(this.point1.coordinates.z, this.point2.coordinates.z),
                    zmax: Math.max(this.point1.coordinates.z, this.point2.coordinates.z)
                }

                this.bounds.center = {
                    x: (this.bounds.xmin + this.bounds.xmax) / 2,
                    y: (this.bounds.ymin + this.bounds.ymax) / 2,
                    z: (this.bounds.zmin + this.bounds.zmax) / 2
                }

                this.coordinates = {
                    x: this.bounds.xmax,
                    y: this.bounds.ymin,
                }
    
                animationOptions.keyframes[inSeconds.toString()][this.name] = {
                    'graph': this.space.name + "-graph",
                    'object': this.name,
                    'options': {x1:this.point1.coordinates.x, y1:this.point1.coordinates.y, x2:this.point2.coordinates.x, y2:this.point2.coordinates.y}
                }

                animationOptions.elementsAndPropertiesInvolved = {}

                animationOptions.elementsAndPropertiesInvolved[this.name] = {
                    element: this,
                    properties: ["x1", "y1", "x2", "y2"]
                }

                anim = new Animation(0, inSeconds*1.8, inSeconds, 30, animateImmediately = false, animOptions=animationOptions)
                return anim;
            },
        };

        this.remove = function() {
            viewX.removeLine(this.space.name + "-graph", this.name)
        }
    }

    function Curve(points=[], thickness=0.2, color="white", fillcolor="none") {
        
        this.space = rhyform.activeScene.selectedSpace;
        this.name = "curve-" + rhyform.objectAdditionIndex;
        this.tags = [];
        
        this.addTag = function(tagName) {
            manageTags(tagName, this, 'add');
            return this;
        }

        this.removeTag = function(tagName) {
            manageTags(tagName, this, 'remove');
            return this;
        }

        this.scene = rhyform.activeScene;
        this.addTag("<scene>" + this.scene.name)

        if (points[0].command != null) {
            this.points = points;
            
            
            this.bounds = {}
            this.bounds.xmin = this.points[0].x;
            this.bounds.xmax = this.points[0].x;
            this.bounds.ymin = this.points[0].y;
            this.bounds.ymax = this.points[0].y;
    
            // this.pointsXY = ""
    
            for (i=0; i<this.points.length; i++) {
                this.bounds.xmin = Math.min(this.bounds.xmin, this.points[i].x);
                this.bounds.xmax = Math.max(this.bounds.xmax, this.points[i].x);
                this.bounds.ymin = Math.min(this.bounds.ymin, this.points[i].y);
                this.bounds.ymax = Math.max(this.bounds.ymax, this.points[i].y);
    
                // this.pointsXY +=  this.points[i].command + " " + this.points[i].x + " " + this.points[i].y + " "
            }
    
    
            this.bounds.center = {
                x: (this.bounds.xmin + this.bounds.xmax) / 2,
                y: (this.bounds.ymin + this.bounds.ymax) / 2,
                z: (this.bounds.zmin + this.bounds.zmax) / 2
            }
    
            this.coordinates = {
                x: this.bounds.xmax,
                y: this.bounds.ymin,
                z: this.bounds.zmin
            }

            this.pointsXY = points;

        }
        else {

            this.points = points;

            this.bounds = {}
            this.bounds.xmin = this.points[0].coordinates.x;
            this.bounds.xmax = this.points[0].coordinates.x;
            this.bounds.ymin = this.points[0].coordinates.y;
            this.bounds.ymax = this.points[0].coordinates.y;
            this.bounds.zmin = this.points[0].coordinates.z;
            this.bounds.zmax = this.points[0].coordinates.z;
    
            this.pointsXY = []
    
            for (i=0; i<this.points.length; i++) {
                this.bounds.xmin = Math.min(this.bounds.xmin, this.points[i].coordinates.x);
                this.bounds.xmax = Math.max(this.bounds.xmax, this.points[i].coordinates.x);
                this.bounds.ymin = Math.min(this.bounds.ymin, this.points[i].coordinates.y);
                this.bounds.ymax = Math.max(this.bounds.ymax, this.points[i].coordinates.y);
                this.bounds.zmin = Math.min(this.bounds.zmin, this.points[i].coordinates.z);
                this.bounds.zmax = Math.max(this.bounds.zmax, this.points[i].coordinates.z);
    
                this.pointsXY.push([this.points[i].coordinates.x, this.points[i].coordinates.y])
            }
    
    
            this.bounds.center = {
                x: (this.bounds.xmin + this.bounds.xmax) / 2,
                y: (this.bounds.ymin + this.bounds.ymax) / 2,
                z: (this.bounds.zmin + this.bounds.zmax) / 2
            }
    
            this.coordinates = {
                x: this.bounds.xmax,
                y: this.bounds.ymin,
                z: this.bounds.zmin
            }
        }


       
        
        this.thickness = thickness;
        this.color = color;
        this.fillColor = fillcolor;

        this.added = false;
        this.element = null;

        this.createBasicCurve= function() {
            if (!this.added) {
                addingPathData = {points:this.pointsXY, strokewidth: this.thickness, pathcolor: this.color, opacity: 0, pathfillcolor: this.fillColor}
                addingPath = viewX.addPath(this.space.name + "-graph", this.name, addingPathData)

                this.added = true;
                this.element = addingPath;
            }
        }

        this.updateCurve= function() {
            if (this.added) {
                addingPath = viewX.updatePathPoints(this.space.name + "-graph", this.name, this.pointsXY)

                updatingPathData = {strokewidth: this.thickness, pathcolor: this.color, pathfillcolor: this.fillColor}

                updatingPath = viewX.updatePath(this.space.name + "-graph", this.name, updatingPathData)
            }
        }

        this.createBasicCurve()

        rhyform.objectAdditionIndex += 1;

        this.place = {
        };

        this.show = function(inSeconds=1) {
            this.updateCurve();
            theAnim = showElement(this, inSeconds);
            return theAnim;
        }

        this.hide = function(inSeconds=1) {
            this.updateCurve();
            theAnim = hideElement(this, inSeconds);
            return theAnim;
        }


        this.draw = function(pointsPerSecond=10) {
            this.updateCurve();
            if (this.points[0].command != null) {
                distanceBetweenPoints = 0;
                for (i=0; i<this.points.length-1; i++) {
                    distanceBetweenPoints += rhyform.libraryFunctions.distanceBetweenPoints(this.points[i], this.points[i+1])
                }

                inSeconds = distanceBetweenPoints / pointsPerSecond

                animationOptions = {}
                animationOptions.keyframes = {}
                animationOptions.keyframes["0"] = {}
                animationOptions.keyframes[inSeconds.toString()] = {}

                animStartPoints = [this.points[0]]

                animationOptions.keyframes["0"][this.name] = {
                    'graph': this.space.name + "-graph",
                    'object': this.name,
                    'options': { opacity: 1, points: animStartPoints}
                }
    
                animationOptions.keyframes[inSeconds.toString()][this.name] = {
                    'graph': this.space.name + "-graph",
                    'object': this.name,
                    'options': { opacity: 1, points: this.pointsXY}
                }

                animationOptions.elementsAndPropertiesInvolved = {}

                animationOptions.elementsAndPropertiesInvolved[this.name] = {
                    element: this,
                    properties: ["points"]
                }

                anim = new Animation(0, inSeconds, inSeconds, 30, animateImmediately = false, animOptions=animationOptions)
                return anim;
            }
            else {
                distanceBetweenPoints = 0;
                for (i=0; i<this.points.length-1; i++) {
                    distanceBetweenPoints += rhyform.libraryFunctions.distanceBetweenPoints(this.points[i], this.points[i+1])
                }

                inSeconds = distanceBetweenPoints / pointsPerSecond

                animationOptions = {}
                animationOptions.keyframes = {}
                animationOptions.keyframes["0"] = {}
                animationOptions.keyframes[inSeconds.toString()] = {}


                animStartPoints = [[this.points[0].coordinates.x, this.points[0].coordinates.y]]
                animStartPoints.push([this.points[1].coordinates.x, this.points[1].coordinates.y])


                animEndPoints = []

                for (i=0; i<this.points.length; i++) {
                    animEndPoints.push([this.points[i].coordinates.x, this.points[i].coordinates.y])
                }

                animationOptions.drawPointsSequentially = "yes"

                animationOptions.keyframes["0"][this.name] = {
                    'graph': this.space.name + "-graph",
                    'object': this.name,
                    'options': { opacity: 1, points: animStartPoints}
                }
    
                animationOptions.keyframes[inSeconds.toString()][this.name] = {
                    'graph': this.space.name + "-graph",
                    'object': this.name,
                    'options': { opacity: 1, points: animEndPoints}
                }

                // console.log(animationOptions)

                animationOptions.elementsAndPropertiesInvolved = {}

                animationOptions.elementsAndPropertiesInvolved[this.name] = {
                    element: this,
                    properties: ["points"]
                }

                anim = new Animation(0, inSeconds, inSeconds, 30, animateImmediately = false, animOptions=animationOptions)

                return anim;
            }
        }



        this.loadWith = {
            size: (thickness) => {
                this.thickness = thickness;
                return this;
            },

            color: (color) => {
                this.color = color;
                return this;
            },

            points: (points) => {
                this.points = points;
                return this;
            },

            fillColor: (fillColor) => {
                this.fillColor = fillColor;
                return this;
            }
        };

        this.set = {
            points: (points) => {

                if (points[0].command != null) {

                    this.points = points;

                    this.bounds = {}
                    this.bounds.xmin = this.points[0].x;
                    this.bounds.xmax = this.points[0].x;
                    this.bounds.ymin = this.points[0].y;
                    this.bounds.ymax = this.points[0].y;
            
                    // this.pointsXY = ""
            
                    for (i=0; i<this.points.length; i++) {
                        this.bounds.xmin = Math.min(this.bounds.xmin, this.points[i].x);
                        this.bounds.xmax = Math.max(this.bounds.xmax, this.points[i].x);
                        this.bounds.ymin = Math.min(this.bounds.ymin, this.points[i].y);
                        this.bounds.ymax = Math.max(this.bounds.ymax, this.points[i].y);
            
                        // this.pointsXY +=  this.points[i].command + " " + this.points[i].x + " " + this.points[i].y + " "
                    }
            
            
                    this.bounds.center = {
                        x: (this.bounds.xmin + this.bounds.xmax) / 2,
                        y: (this.bounds.ymin + this.bounds.ymax) / 2,
                        z: (this.bounds.zmin + this.bounds.zmax) / 2
                    }
            
                    this.coordinates = {
                        x: this.bounds.xmax,
                        y: this.bounds.ymin,
                        z: this.bounds.zmin
                    }

                    this.pointsXY = points;
                }
                else {
                    this.points = points;
                    this.pointsXY = []
                    for (i=0; i<this.points.length; i++) {
                        this.pointsXY.push([this.points[i].coordinates.x, this.points[i].coordinates.y])
                    }

                    this.bounds.xmin = this.points[0].coordinates.x;
                    this.bounds.xmax = this.points[0].coordinates.x;
                    this.bounds.ymin = this.points[0].coordinates.y;
                    this.bounds.ymax = this.points[0].coordinates.y;
                    this.bounds.zmin = this.points[0].coordinates.z;
                    this.bounds.zmax = this.points[0].coordinates.z;

                    for (i=0; i<this.points.length; i++) {
                        this.bounds.xmin = Math.min(this.bounds.xmin, this.points[i].coordinates.x);
                        this.bounds.xmax = Math.max(this.bounds.xmax, this.points[i].coordinates.x);
                        this.bounds.ymin = Math.min(this.bounds.ymin, this.points[i].coordinates.y);
                        this.bounds.ymax = Math.max(this.bounds.ymax, this.points[i].coordinates.y);
                        this.bounds.zmin = Math.min(this.bounds.zmin, this.points[i].coordinates.z);
                        this.bounds.zmax = Math.max(this.bounds.zmax, this.points[i].coordinates.z);
                    }

                    this.bounds.center = {
                        x: (this.bounds.xmin + this.bounds.xmax) / 2,
                        y: (this.bounds.ymin + this.bounds.ymax) / 2,
                        z: (this.bounds.zmin + this.bounds.zmax) / 2
                    }

                    this.coordinates = {
                        x: this.bounds.xmax,
                        y: this.bounds.ymin,
                        z: this.bounds.zmin
                    }
                }

                this.updateCurve();
                return this;
            },

            fillColor: (fillColor) => {
                this.fillColor = fillColor;
                this.updateCurve();
                return this;
            }
        }


        this.change = {
            points: (points, inSeconds=1) => {
                theAnim = changeViewXProperties(this, {points: this.pointsXY}, {points: points}, inSeconds);
                this.points = points;
                this.pointsXY = points; 
                return theAnim;
            },

            color: (color, inSeconds=1) => {
                theAnim = changeViewXProperties(this, {pathcolor: this.color}, {pathcolor: color}, inSeconds);
                this.color = color;
                return theAnim;
            },

            fillColor: (color, inSeconds=1) => {
                theAnim = changeViewXProperties(this, {pathfillcolor: this.fillColor}, {pathfillcolor: color}, inSeconds);
                this.fillColor = color;
                return theAnim;
            }
        }

        
        this.moveToTop = function() {
            moveToTopViewX(this);
        }

        this.remove = function() {
            viewX.removePath(this.space.name + "-graph", this.name)
        }
    }


    function Circle(at=point, radius=1) {
        this.tags = [];

        this.addTag = function(tagName) {
            manageTags(tagName, this, 'add');
            return this;
        }

        this.removeTag = function(tagName) {
            manageTags(tagName, this, 'remove');
            return this;
        }

        this.scene = rhyform.activeScene;
        this.addTag("<scene>" + this.scene.name)


        this.coordinates = at;

        this.space = rhyform.activeScene.selectedSpace;
        this.name = "circle-" + rhyform.objectAdditionIndex;
        this.thickness = 1;
        this.color = 'violet';
        this.fillColor = 'none';
        this.radius = radius;
        this.center = at;

        this.bounds = {
            xmin: at.coordinates.x - this.radius,
            xmax: at.coordinates.x + this.radius,
            ymin: at.coordinates.y - this.radius,
            ymax: at.coordinates.y + this.radius,
            zmin: at.coordinates.z - this.radius,
            zmax: at.coordinates.z + this.radius,
        }

        this.bounds.center = {
            x: at.coordinates.x,
            y: at.coordinates.y,
            z: at.coordinates.z,
        }

        this.added = false;
        this.element = null;

        this.createBasicCircle = function() {
            if (!this.added) {
                addingCircleData = {x:this.center.coordinates.x, y:this.center.coordinates.y, radius: this.radius, circlecolor: this.fillColor, stroke: this.color, opacity: 0, strokewidth: this.thickness}
                addingCircle = viewX.addCircle(this.space.name + "-graph", this.name, addingCircleData)
                this.added = true;
                this.element = addingCircle;
            }
        }

        this.updateCircleRender = function() {

            if (this.seen) {
                if (!this.added) {
                    this.createBasicCircle()
                }
    
                addingCircleData = {x:this.center.coordinates.x, y:this.center.coordinates.y, radius: this.radius, circlecolor: this.fillColor, stroke: this.color, strokewidth: this.thickness}
                updatingPoint = viewX.updateCircle(this.space.name + "-graph", this.name, addingCircleData)
            }


            // this.element = updatingPoint;
        }


        
        // this.createBasicCircle()

        rhyform.objectAdditionIndex += 1;


        this.show = function(inSeconds=1) {
            this.createBasicCircle();
            theAnim = showElement(this, inSeconds);
            return theAnim;
        }

        this.hide = function(inSeconds=1) {
            this.createBasicCircle();
            theAnim = hideElement(this, inSeconds);
            return theAnim;
        }

        this.place = {
 
            at: (x=0, y=0, z=0) => {
                point = {x: x, y: y, z: z};
                this.updateCircleRender();
                return this;
            },

            nextTo: (element, atDistance) => {
                if (atDistance === undefined) {
                    atDistance = this.space.camera.labelDistance;
                }
                point.y = element.bounds.ymin - atDistance;
                point.x = element.bounds.xmax + atDistance;
                this.updateCircleRender();
                return this;
            },

            above: (element, atDistance) => {
                if (atDistance === undefined) {
                    atDistance = this.space.camera.labelDistance;
                }
                point.y = element.bounds.ymax + atDistance;
                point.x = element.bounds.center.x;
                this.updateCircleRender();
                return this;
            },

            below: (element, atDistance) => {
                if (atDistance === undefined) {
                    atDistance = this.space.camera.labelDistance;
                }
                point.y = element.bounds.ymin - atDistance;
                point.x = element.bounds.center.x;
                this.updateCircleRender();
                return this;
            },

            leftOf: (element, atDistance) => {
                if (atDistance === undefined) {
                    atDistance = this.space.camera.labelDistance;
                }
                point.y = element.bounds.center.y;
                point.x = element.bounds.xmin - atDistance;
                this.updateCircleRender();
                return this;
            },

            rightOf: (element, atDistance) => {
                if (atDistance === undefined) {
                    atDistance = this.space.camera.labelDistance;
                }
                point.y = element.bounds.center.y;
                point.x = element.bounds.xmax + atDistance;
                this.updateCircleRender();
                return this;
            },
        };

        this.loadWith = {
            thickness: (thickness) => {
                this.thickness = thickness;
                return this;
            },

            color: (color) => {
                this.color = color;
                return this;
            },

            fillColor: (color) => {
                this.fillColor = color;
                return this;
            },

            position: (x, y, z) => {
                point = {x: x, y: y, z: z};
                
                this.bounds = {
                    xmin: point.x - this.radius,
                    xmax: point.x + this.radius,
                    ymin: point.y - this.radius,
                    ymax: point.y + this.radius,
                    zmin: point.z - this.radius,
                    zmax: point.z + this.radius,
                }
        
                this.bounds.center = {
                    x: point.x,
                    y: point.y,
                    z: point.z,
                }

                return this;
            },

            radius: (radius) => {
                this.radius = radius;

                this.bounds = {
                    xmin: this.center.coordinates.x - this.radius,
                    xmax: this.center.coordinates.x + this.radius,
                    ymin: this.center.coordinates.y - this.radius,
                    ymax: this.center.coordinates.y + this.radius,
                    zmin: this.center.coordinates.z - this.radius,
                    zmax: this.center.coordinates.z + this.radius,
                }

                this.bounds.center = {
                    x: this.center.coordinates.x,
                    y: this.center.coordinates.y,
                    z: this.center.coordinates.z,
                }

                return this;
            }
        };

        this.change = {
            radius: (radius, inSeconds=1) => {
                this.createBasicCircle();
                theAnim = changeViewXProperties(this, {radius: this.radius}, {radius: radius}, inSeconds);
                this.radius = radius;
                return theAnim;
            },

            color: (color, inSeconds=1) => {
                this.createBasicCircle();
                theAnim = changeViewXProperties(this, {stroke: this.color}, {stroke: color}, inSeconds);
                this.color = color;
                return theAnim;
            },

            fillColor: (color, inSeconds=1) => {
                this.createBasicCircle();
                theAnim = changeViewXProperties(this, {circlecolor: this.fillColor}, {circlecolor: color}, inSeconds);
                this.color = color;
                return theAnim;
            },

        };

        
        this.moveToTop = function() {
            moveToTopViewX(this);
        }

        this.remove = function() {
            viewX.removeCircle(this.space.name + "-graph", this.name)
        }

    }



    function ValueSlider(at={x:0, y:0, z:0}, width=5, min=0, max=100, value=50, step=1, sliderProperties={onChange:function(){console.log("Slider value changed")}, 
    valueTransformToText: function(value) {return value;}, thumbSize: 10, thumbColor: "hsla(198, 100% 60%, 1)", trackColor: "hsla(198, 0%, 0%, 0.4)", trackFillColor: "hsla(198, 100%, 40%, 1)",  thickness: 10, isAlwaysVisible: false, backgroundType:'glassy', borderColor:'hsla(0, 0%, 40%, 0.1)'}, valueDisplayProperties={color: "white", fontSize: "large", font: "Nunito"},  labelTextProperties={color: "white", fontSize: 'auto', font: "Nunito", text: ""}, labelDescriptionProperties={color: "white", fontSize: 'small', font: "Nunito", text: ""}) {
        this.tags = [];

        this.addTag = function(tagName) {
            manageTags(tagName, this, 'add');
            return this;
        }

        this.removeTag = function(tagName) {
            manageTags(tagName, this, 'remove');
            return this;
        }

        this.scene = rhyform.activeScene;
        this.addTag("<scene>" + this.scene.name)

        this.coordinates = at;

        this.space = rhyform.activeScene.selectedSpace;
        this.name = "valueSlider-" + rhyform.objectAdditionIndex;
        this.sliderProperties = sliderProperties;
        this.valueDisplayProperties = valueDisplayProperties;
        this.labelTextProperties = labelTextProperties;
        this.labelDescriptionProperties = labelDescriptionProperties;
        this.width = width;
        this.height = 1;
        this.min = min;
        this.max = max;
        this.value = value;
        this.step = step;
        this.sliderVisible = true;


        this.bounds = {
            xmin: this.coordinates.x,
            xmax: this.coordinates.x + this.width,
            ymin: this.coordinates.y ,
            ymax: this.coordinates.y,
            zmin: this.coordinates.z,
            zmax:  this.coordinates.z,
        }

        this.bounds.center = {
            x: this.coordinates.x,
            y: this.coordinates.y,
            z: this.coordinates.z,
        }

        this.added = false;
        this.element = null;

        this.createBasicSlider = function() {
            if (!this.added) {

                // <div class="pt-3 ng-scope" ng-repeat="(nodeParameterKey, nodeParameter) in networkGraph.nodes[networkGraph.selectedNode].parameters">
                //     <span class="parameter-display-text ng-binding" ng-click="nodeParameter.editing = !nodeParameter.editing">0.035</span>
                //     <i class="ml-2 fa fa-pencil sub-addition-button" ng-click="nodeParameter.editing = !nodeParameter.editing"></i>
                //     <div class="pb-2" ng-show="nodeParameter.editing">
                //         <input type="range" id="node-slider-recoveryRate" min="0" max="0.3" step="0.001" ng-model="nodeParameter.value" ng-change="networkGraph.changingNodeParameter()" class="ng-untouched ng-valid ng-not-empty ng-dirty ng-valid-parse ng-valid-min ng-valid-max ng-valid-step">
                //     </div>
                //     <div class="text-ignus ng-binding" style="font-size: normal;">
                //         Recovery Rate
                //     </div>
                //     <div class="text-ignus ng-binding" style="font-size: x-small; color: gray;">
                //         The rate at which the node recovers from the disease
                //     </div>
                // </div>

                // get name with spaces removed and lower cased, it should be a copy
                var idName = this.name.replace(/\s/g, '').toLowerCase();

                styleToAdd = `
                #` + idName + `-rhyform-slider-editToggle-button  {
                    color: hsla(0, 0%, 100%, 0.3);
                }

                #` + idName + `-rhyform-slider-editToggle-button:hover {
                    color: white;
                }

                #` + idName + `-rhyform-slider-glassy {
                    background-color: hsla(0, 0%, 10%, 0.4);
                    backdrop-filter: blur(3px);
                }


                @media screen and (-webkit-min-device-pixel-ratio:0) {
                    #` + idName + `-rhyform-slider-input[type='range'] {
                        background-color: hsla(0, 0%, 100%, 0.2);
                        border-radius: 5px;
                        cursor: pointer;
                        padding:  ` + this.sliderProperties.thickness/2 + `px 0;
                    }

                                
                    #` + idName + `-rhyform-slider-input[type='range']::-webkit-slider-runnable-track {
                        -webkit-appearance: none;
                        height: 0px;
                        color: black;
                        margin-top: -10px;
                    }
                    
                    
                    #` + idName + `-rhyform-slider-input[type='range']::-webkit-slider-thumb {
                        width: ` + this.sliderProperties.thumbSize + `px;
                        height: ` + this.sliderProperties.thumbSize + `px;
                        cursor: ew-resize;
                        background: hsla(198, 100%, 50%, 0);
                        box-shadow: -1001px 0px 0px 1000px ` + this.sliderProperties.trackFillColor + `;
                        margin-top: -5px;
                    }

                    #` + idName + `-rhyform-design-slider-input[type='range'] {
                        background-color: ` + this.sliderProperties.trackColor + `;
                        border-radius: 5px;
                        padding:  ` + this.sliderProperties.thickness/2 + `px 0;
                    }
                    
                    #` + idName + `-rhyform-design-slider-input[type='range']::-webkit-slider-runnable-track {
                        height: 0px;
                        color: black;
                        margin-top: -10px;
                    }
                    
                    #` + idName + `-rhyform-design-slider-input[type='range']::-webkit-slider-thumb {
                        width: ` + this.sliderProperties.thumbSize + `px;
                        height: ` + this.sliderProperties.thumbSize + `px;
                        cursor: ew-resize;
                        background: ` + this.sliderProperties.thumbColor + `;
                        box-shadow: 0px 0px 0px 0px hsla(198, 100%, 70%, 0);
                        margin-top: ` + (-1*(this.sliderProperties.thumbSize - 10)/2) + `px;
                    }

                }

                @supports (-moz-appearance:none) {
                    #` + idName + `-rhyform-slider-input[type='range'] {
                        background-color: hsla(0, 0%, 100%, 0);
                        border-radius: 5px;
                        padding: 5px 0;
                    }

                    #` + idName + `-rhyform-design-slider-input[type='range'] {
                        background-color: hsla(0, 0%, 100%, 0);
                        border-radius: 5px;
                        padding: 5px 0;
                    }
                }

                #` + idName + `-rhyform-slider-input[type="range"]::-moz-range-progress {
                    background-color: ` + this.sliderProperties.trackFillColor + `; 
                }
                #` + idName + `-rhyform-slider-input[type="range"]::-moz-range-track {  
                    background-color: ` + this.sliderProperties.trackColor + `;
                }

                #` + idName + `-rhyform-slider-input[type="range"]::-ms-fill-lower {
                    background-color: ` + this.sliderProperties.trackFillColor + `; 
                }
                #` + idName + `-rhyform-slider-input[type="range"]::-ms-fill-upper {  
                    background-color: ` + this.sliderProperties.trackColor + `;
                }
                `

                var style = document.createElement("style");
                style.id = idName + "-rhyform-slider-styles";
                style.type = "text/css";

                if (style.styleSheet) {
                    style.styleSheet.cssText = styleToAdd;
                } else {
                    style.appendChild(document.createTextNode(styleToAdd));
                }

                document.getElementById("rhyform-slider-styles").appendChild(style);


                
                var mainDiv = document.createElement("div");
                mainDiv.id = this.name;
                mainDiv.style.position = "absolute";
                // add class pt-3
                mainDiv.classList.add("p-3");
                mainDiv.classList.add("p-md-4")
                
                var valueDisplaySpan = document.createElement("span");
                valueDisplaySpan.id = idName + "-value-display";
                valueDisplaySpan.style.fontFamily = this.valueDisplayProperties.font;
                valueDisplaySpan.style.fontSize = this.valueDisplayProperties.fontSize;
                valueDisplaySpan.style.color = this.valueDisplayProperties.color;
                valueDisplaySpan.innerHTML = this.sliderProperties.valueTransformToText(this.value);

                mainDiv.appendChild(valueDisplaySpan);

                mainDiv.style.zIndex = 5;

                

                if (!this.sliderProperties.isAlwaysVisible) {
                    var editValueIcon = document.createElement("i");
                    editValueIcon.id = idName + "-rhyform-slider-editToggle-button";
                    editValueIcon.classList.add("ml-2");
                    editValueIcon.classList.add("fa");
                    editValueIcon.classList.add("fa-pencil");
                    editValueIcon.classList.add("rhyform-slider-editToggle-button");
                    editValueIcon.onclick = () => {
                        this.sliderVisible = !this.sliderVisible;
                        this.updateSliderVisibility();
                    }

                    mainDiv.appendChild(editValueIcon);

                    
                }


                var sliderDiv = document.createElement("div");
                // add class pb-1
                sliderDiv.classList.add("pb-1");
                sliderDiv.classList.add("mb-4");
                sliderDiv.classList.add("pr-4");
                sliderDiv.style.position = "relative"; 

                this.sliderDiv = sliderDiv;

                var sliderInput = document.createElement("input");
                sliderInput.type = "range";
                sliderInput.min = this.min;
                sliderInput.max = this.max;
                sliderInput.step = this.step;
                sliderInput.value = this.value;
                sliderInput.id = idName + "-rhyform-slider-input";
                sliderInput.style.width = '100%';

                sliderDiv.appendChild(sliderInput);
                mainDiv.appendChild(sliderDiv);

                sliderInput.oninput = () => {
                    this.value = sliderInput.value;
                    valueDisplaySpan.innerHTML = this.sliderProperties.valueTransformToText(this.value);

                    designSliderInput.value = this.value;
                    this.sliderProperties.onChange();
                }

                sliderInput.onchange = sliderInput.oninput;

                
                sliderInput.classList.add("rhyform-slider-input");
                sliderInput.style.position = "absolute";

                var designSliderInput = document.createElement("input");
                designSliderInput.type = "range";
                designSliderInput.min = this.min;
                designSliderInput.max = this.max;
                designSliderInput.step = this.step;
                designSliderInput.value = this.value;
                designSliderInput.id = idName + "-rhyform-design-slider-input";
                designSliderInput.style.width = '100%';
                designSliderInput.classList.add("rhyform-design-slider-input");
                designSliderInput.style.pointerEvents = "none";

                sliderDiv.appendChild(designSliderInput);
                designSliderInput.style.position = "absolute";


                if (this.sliderVisible) {
                    sliderDiv.style.display = "block";
                }

                if (this.labelTextProperties.text != "") {
                
                    var labelTextDiv = document.createElement("div");
                    labelTextDiv.id = this.name + "-label-text";
                    labelTextDiv.style.fontFamily = this.labelTextProperties.font;
                    labelTextDiv.style.fontSize = this.labelTextProperties.fontSize;
                    labelTextDiv.style.color = this.labelTextProperties.color;
                    labelTextDiv.innerHTML = this.labelTextProperties.text;

                    mainDiv.appendChild(labelTextDiv);
                }

                if (this.labelDescriptionProperties.text != "") {

                    var labelDescriptionDiv = document.createElement("div");
                    labelDescriptionDiv.id = this.name + "-label-description";
                    labelDescriptionDiv.style.fontFamily = this.labelDescriptionProperties.font;
                    labelDescriptionDiv.style.fontSize = this.labelDescriptionProperties.fontSize;
                    labelDescriptionDiv.style.color = this.labelDescriptionProperties.color;
                    labelDescriptionDiv.innerHTML = this.labelDescriptionProperties.text;

                    mainDiv.appendChild(labelDescriptionDiv);
                }

               

                
                htmlCoordinates = viewX.getHTMLCoordinates(this.space.name + "-graph", this.coordinates.x, this.coordinates.y)

                mainDiv.style.left = htmlCoordinates.x + "px";
                mainDiv.style.top = htmlCoordinates.y + "px";

                mainDiv.style.width = this.width*this.space.camera.pixelsPerUnit + "px";

                document.getElementById(this.space.name + "-html-layer").appendChild(mainDiv);
                mainDiv.style.opacity = 0;


                

                if (this.sliderProperties.backgroundType == "glassy") {
                    mainDiv.classList.add("rhyform-slider-glassy");
                }
                else if (this.sliderProperties.backgroundType == "solid") {
                    mainDiv.style.background = "rgba(0, 0, 0, 0.2)";
                }

                if (this.sliderProperties.borderColor != "none") {
                    mainDiv.style.border = "2px solid " + this.sliderProperties.borderColor;
                }

                mainDiv.style.borderRadius = "10px";

                MathJax.typeset([mainDiv])

                this.added = true;
                this.element = mainDiv;

            }
        }

        this.updateSliderVisibility = function() {
            if (this.sliderVisible) {
                this.sliderDiv.style.display = "block";
            }
            else {
                this.sliderDiv.style.display = "none";
            }
        }


        this.updateSlider = function() {
            if (!this.added) {
                this.createBasicSlider();
            }

            idName = this.name.replace(/\s/g, '').toLowerCase();
            this.element.querySelector("#" + idName + "-value-display").innerHTML = this.sliderProperties.valueTransformToText(this.value);

            this.element.querySelector("#" + idName + "-rhyform-slider-input").min = this.min;
            this.element.querySelector("#" + idName + "-rhyform-slider-input").max = this.max;
            this.element.querySelector("#" + idName + "-rhyform-slider-input").step = this.step;

            this.element.querySelector("#" + idName + "-rhyform-design-slider-input").min = this.min;
            this.element.querySelector("#" + idName + "-rhyform-design-slider-input").max = this.max;
            this.element.querySelector("#" + idName + "-rhyform-design-slider-input").step = this.step;

            
            this.element.querySelector("#" + idName + "-rhyform-slider-input").value = this.value;
            this.element.querySelector("#" + idName + "-rhyform-design-slider-input").value = this.value;


            this.updateSliderVisibility();


        }

        this.set = {    
            value: (value) => {
                this.value = value;
                this.updateSlider();
                return this;
            },

            min: (min) => {
                this.min = min;
                this.updateSlider();
                return this;
            },

            max: (max) => {
                this.max = max;
                this.updateSlider();
                return this;

            },

            step: (step) => {
                this.step = step;
                this.updateSlider();
                return this;
            },
        }



        this.show = function(inSeconds=1) {
            this.createBasicSlider();
            theAnim = showElement(this, inSeconds);
            return theAnim;
        }

        this.hide = function(inSeconds=1) {
            // this.element.style.pointerEvents = "none";
            theAnim = hideElement(this, inSeconds);
            return theAnim;
        }

        this.remove = function() {
            this.element.remove();
        }

        return this;


    }

    function AnimationGroup() {
        this.list = [];
        this.addAnim = function(animation) {
            animation.group = this;
            if (this.list.length > 0) {
                this.list[this.list.length-1].next = animation;
            }

            if (this.list.length == 0) {
                animation.beginsAGroup = true;
            }

            this.list.push(animation);
        }

        this.startGroupAnimationsImmediately = false;

        this.startNextImmediately = function() {
            this.list[0].startNextImmediately();
        }

    }
    

    function Animation(start=0, end=1, duration=1, fps=30, animateImmediately=false, animOptions={}, type="viewX") {
        
        this.name = "animation-" + rhyform.activeScene.animationAdditionIndex + "-forScene-" + rhyform.activeScene.name;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.fps = fps;
        this.animateNextImmediately = animateImmediately;
        this.type = type;
        this.viewXAnimation = null;

        

        if (type == "viewX") {
            this.animationOptions = animOptions;
            this.viewXAnimation = viewX.addAnimation(this.name, animOptions)
        }

        if (type == "html-css-style") {
            this.animationOptions = animOptions;
        }

        if (type == "inner-html") {
            this.animationOptions = animOptions;
        }

        if (type == "audio") {
            this.animationOptions = animOptions;
        }

        if (type == 'wait') {
            this.animationOptions = animOptions;
        }

        if (type == 'function') {
            this.animationOptions = animOptions;
        }


        rhyform.activeScene.animations[this.name] = this;
        rhyform.activeScene.animationAdditionIndex += 1;

        this.startNextImmediately = () => {
            this.animateNextImmediately = true;
            return this;
        };

        return this;
    }

    // Add this audio file to HTML document

    function Audio(url) {
        this.url = url;
        this.name = "audio-" + rhyform.activeScene.audioAdditionIndex;
        this.added = false;
        this.element = null;
        this.volume = 1;

        this.tags = [];

        this.addTag = function(tagName) {
            manageTags(tagName, this, 'add');
            return this;
        }

        this.removeTag = function(tagName) {
            manageTags(tagName, this, 'remove');
            return this;
        }

        this.scene = rhyform.activeScene;
        this.addTag("<scene>" + this.scene.name)

        this.createBasicAudio = function() {
            if (!this.added) {
                addingAudioData = {url: this.url}
                addingAudio = document.createElement("audio");
                addingAudio.id = this.name;
                addingAudio.src = this.url;
                addingAudio.loop = this.loop;
                addingAudio.volume = this.volume;
                document.body.appendChild(addingAudio);
                this.added = true;
                this.element = addingAudio;
            }
        }

        this.createBasicAudio()

        rhyform.activeScene.audioAdditionIndex += 1;

        this.play = function(from=0) {
            this.createBasicAudio();
            audioOptions = {element: this.element, action: "play", from: from}
            anim = new Animation(start=0, end=1, duration=1, fps=30, animateImmediately=false, animOptions=audioOptions, type="audio")
            return anim;
        }
        

        this.pause = function() {
            this.createBasicAudio();
            audioOptions = {element: this.element, action: "pause"}
            anim = new Animation(start=0, end=1, duration=1, fps=30, animateImmediately=false, animOptions=audioOptions, type="audio")
            return anim;
        }

        this.stop = function() {
            this.createBasicAudio();
            audioOptions = {element: this.element, action: "stop"}
            anim = new Animation(start=0, end=1, duration=1, fps=30, animateImmediately=false, animOptions=audioOptions, type="audio")
            return anim;
        }

        this.loadWith = {
            volume: (volume) => {
                this.volume = volume;
                this.createBasicAudio();
                updatingAudioData = {volume: this.volume}
                this.element.volume = this.volume;
                return this;
            },

            loop: (loop) => {
                this.loop = loop;
                this.createBasicAudio();
                updatingAudioData = {loop: this.loop}
                this.element.loop = this.loop;
                return this;
            },
        };

        this.remove = function() {
            this.element.remove();
        }

    }



    function Equation(equationPoints, expression="x", at={x:0, y:0, z:0}, width=2, color="white", fontSize=1) {
        this.space = rhyform.activeScene.selectedSpace;
        this.name = "equation-" + rhyform.objectAdditionIndex;
        this.tags = [];

        this.addTag = function(tagName) {
            manageTags(tagName, this, 'add');
            return this;
        }

        this.removeTag = function(tagName) {
            manageTags(tagName, this, 'remove');
            return this;
        }

        
        this.scene = rhyform.activeScene;
        this.addTag("<scene>" + this.scene.name)

        this.expression = expression;

        
        this.fontSize = fontSize;

        this.width = width*parseFloat(this.fontSize)/this.space.camera.pixelsPerUnit;
        
        this.color = color;


        this.coordinates = at;
        this.points = equationPoints;

        this.generateCurves = function() {
            this.curves = [];

            curveString = []
            for (let i = 0; i < this.points.length; i++) {
                equationPath = this.points[i]
                equationPathPoints = []

                for (let j = 0; j < equationPath.length; j++) {
                    equationPoint = equationPath[j]

                    curvePoint = {}

                    if (j == 0) {
                        // curveString += "M "
                        curvePoint['command'] = 'M'
                    }
                    else {
                        // curveString += "L "
                        curvePoint['command'] = 'L'
                    }

                    // curveString += (equationPoint.x*this.width + this.coordinates.x).toString() + " " + (-equationPoint.y*this.width + this.coordinates.y).toString() + " "
                    newPoint = {
                        coordinates: {
                            x: (equationPoint.x*this.width) + this.coordinates.x,
                            y: (-equationPoint.y*this.width) + this.coordinates.y,
                            z: 0
                        }
                    }

                    curvePoint['x'] = newPoint.coordinates.x
                    curvePoint['y'] = newPoint.coordinates.y

                    equationPathPoints.push(newPoint)
                    
                    curveString.push(curvePoint)
                }


                // curve = new Curve(equationPathPoints, thickness=0.01, color=color, fillcolor=color)
                // this.curves.push(curve)
            }


            // console.log(curveString)

            curve = new Curve(curveString, thickness=0.01, color=color, fillcolor=color)
            this.curves.push(curve)
        }

        this.generateCurves()



        // this.bounds = {}
        // this.bounds.xmin = this.points[0].coordinates.x;
        // this.bounds.xmax = this.points[0].coordinates.x;
        // this.bounds.ymin = this.points[0].coordinates.y;
        // this.bounds.ymax = this.points[0].coordinates.y;
        // this.bounds.zmin = this.points[0].coordinates.z;
        // this.bounds.zmax = this.points[0].coordinates.z;

        // this.pointsXY = []

        // for (i=0; i<this.points.length; i++) {
        //     this.bounds.xmin = Math.min(this.bounds.xmin, this.points[i].coordinates.x);
        //     this.bounds.xmax = Math.max(this.bounds.xmax, this.points[i].coordinates.x);
        //     this.bounds.ymin = Math.min(this.bounds.ymin, this.points[i].coordinates.y);
        //     this.bounds.ymax = Math.max(this.bounds.ymax, this.points[i].coordinates.y);
        //     this.bounds.zmin = Math.min(this.bounds.zmin, this.points[i].coordinates.z);
        //     this.bounds.zmax = Math.max(this.bounds.zmax, this.points[i].coordinates.z);

        //     this.pointsXY.push([this.points[i].coordinates.x, this.points[i].coordinates.y])
        // }


        // this.bounds.center = {
        //     x: (this.bounds.xmin + this.bounds.xmax) / 2,
        //     y: (this.bounds.ymin + this.bounds.ymax) / 2,
        //     z: (this.bounds.zmin + this.bounds.zmax) / 2
        // }


        // this.thickness = thickness;
        // this.color = color;

        // this.added = false;
        // this.element = null;



        
        // this.createBasicCurve()

        // rhyform.objectAdditionIndex += 1;

        // this.place = {
        // };

        this.show = function(inSeconds=1) {
            theAnim = showElement(this, inSeconds);
            return theAnim;
        }

        this.hide = function(inSeconds=1) {
            theAnim = hideElement(this, inSeconds);
            return theAnim;
        }


        this.change = {
            expression: (expression, inSeconds=1) => {
                return new Promise((resolve, reject) => {
                    this.oldCurvesLength = this.curves.length;
                    this.expression = expression;
                    

                    equationToPoints(expression, this.fontSize).then(equationInfo => {

                        // concat points 
                        ar = []

                        // console.log(equationInfo.points.length)
                        for (let i = 0; i < equationInfo.points.length; i++) {
                            ar = ar.concat(equationInfo.points[i])
                        }
                        
                        this.points = ar;

                        // console.log(ar)


                        this.width = equationInfo.width*parseFloat(this.fontSize)/this.space.camera.pixelsPerUnit;
                        // this.generateCurves()

                        // console.log(this.points)

                        curveString = []

                        for (let j = 0; j < this.points.length; j++) {

                            equationPath = this.points[j]

                            for (let k = 0; k < equationPath.length; k++) {
                                equationPoint = equationPath[k]

                                curvePoint = {}

                                if (k == 0) {
                                    // curveString += "M "
                                    curvePoint['command'] = 'M'
                                }
                                else {
                                    // curveString += "L "
                                    curvePoint['command'] = 'L'
                                }

                                // curveString += (equationPoint.x*this.width + this.coordinates.x).toString() + " " + (-equationPoint.y*this.width + this.coordinates.y).toString() + " "

                                newPoint = {
                                    coordinates: {
                                        x: (equationPoint.x*this.width) + this.coordinates.x,
                                        y: (-equationPoint.y*this.width) + this.coordinates.y,
                                        z: 0
                                    }
                                }

                                curvePoint['x'] = newPoint.coordinates.x
                                curvePoint['y'] = newPoint.coordinates.y

                                // newXY.push(newPoint)

                                curveString.push(curvePoint)
                            }

                        }

                        // console.log(curveString)


                        thisAnimation = this.curves[0].change.points(curveString, inSeconds)
                        

                        // if (this.points.length <= this.oldCurvesLength) {
                        //     for (let i = 0; i < this.points.length; i++) {
                        //         newXY = []
                        //         for (let j = 0; j < this.points[i].length; j++) {
                        //             newXY.push([this.points[i][j].x*this.width + this.coordinates.x, -this.points[i][j].y*this.width + this.coordinates.y])
                        //         }

                        //         this.curves[i].change.points(newXY, inSeconds).startNextImmediately()
                        //     }

                        //     for (let i = this.points.length; i < this.oldCurvesLength; i++) {
                        //         this.curves[i].hide().startNextImmediately()
                        //     }

                        //     resolve(this)
                        // }
                        // else if (this.points.length > this.oldCurvesLength) {
                        //     for (let i = 0; i < this.oldCurvesLength; i++) {
                        //         newXY = []
                        //         for (let j = 0; j < this.points[i].length; j++) {
                        //             newXY.push([this.points[i][j].x*this.width + this.coordinates.x, -this.points[i][j].y*this.width + this.coordinates.y])
                        //         }

                        //         this.curves[i].change.points(newXY, inSeconds).startNextImmediately()
                        //     }

                        //     for (let i = this.oldCurvesLength; i < this.points.length; i++) {
                        //         newXY = []
                        //         for (let j = 0; j < this.points[i].length; j++) {
                        //             pseudoPointObject = {}
                        //             pseudoPointObject.coordinates = {
                        //                 x: this.points[i][j].x*this.width + this.coordinates.x, 
                        //                 y: -this.points[i][j].y*this.width + this.coordinates.y}

                        //             newXY.push(pseudoPointObject)
                        //         }
                        //         curve = new Curve(newXY, thickness=0.01, color=color, fillcolor=color)
                        //         this.curves.push(curve)
                        //         curve.show().startNextImmediately()
                        //     }

                        //     resolve(this)
                        // }

                        // console.log(this.curves, this.oldCurves)

                        resolve(thisAnimation)

                    }).catch(error => {
                        console.error("Error changing equation:", error);
                    });
                })
            }
        }



        this.set = {
            color : (color) => {
                this.color = color;
                for (let curve of this.curves) {
                    curve.change.fillColor(color).startNextImmediately()
                }
                return this;
            }
        };

        this.remove = function() {
            for (let curve of this.curves) {
                curve.remove()
            }
        }
    }



    function VectorImage(url="none", at={x:0, y:0, z:0}, color="white", fillcolor="none",  width=1) {
        this.space = rhyform.activeScene.selectedSpace;
        this.name = "vectorImage-" + rhyform.objectAdditionIndex;
        this.tags = [];

        this.addTag = function(tagName) {
            manageTags(tagName, this, 'add');
            return this;
        }

        this.removeTag = function(tagName) {
            manageTags(tagName, this, 'remove');
            return this;
        }
        
        
        this.scene = rhyform.activeScene;
        this.addTag("<scene>" + this.scene.name)

        this.width = width;

        // console.log(this.width)
        
        this.fillcolor = fillcolor;
        this.color = color;

        this.coordinates = at;

        this.url = url;
        
        this.generateCurves = function() {
            return new Promise((resolve, reject) => {
                imageToPoints(this.url).then(imageInfo => {

                    this.points = imageInfo.points[0];

                    // console.log(this.points)

                    // singlePointGroup = []

                    // for (let i = 0; i < this.points.length; i++) {
                    //     pointsFromSegment = this.points[i]
                    //     for (let j = 0; j < pointsFromSegment.length; j++) {
                    //         singlePointGroup.push(pointsFromSegment[j])
                    //     }
                    // }


                    // this.points = singlePointGroup]

                    this.curves = [];

                    // for (let i = 0; i < this.points.length; i++) {
                    //     imagePointGroup = this.points[i]
                    //     imagePoints = []
                        
                    //     curveString = []

                    //     for (let j = 0; j < imagePointGroup.length; j++) {
                    //         imgPoint = imagePointGroup[j]

                    //         curvePoint = {}

                    //         if (j == 0) {
                    //             // curveString += "M "
                    //             curvePoint['command'] = 'M'
                    //         }
                    //         else {
                    //             // curveString += "L "
                    //             curvePoint['command'] = 'L'
                    //         }

                    //         // curveString += (imgPoint.x*this.width + this.coordinates.x).toString() + " " + (-imgPoint.y*this.width + this.coordinates.y).toString() + " "

                    //         newPoint = {
                    //             coordinates: {
                    //                 x: (imgPoint.x*this.width) + this.coordinates.x,
                    //                 y: (-imgPoint.y*this.width) + this.coordinates.y,
                    //                 z: 0
                    //             }
                    //         }

                    //         curvePoint['x'] = newPoint.coordinates.x
                    //         curvePoint['y'] = newPoint.coordinates.y


                    //         // imagePoints.push(newPoint)
                            
                    //         curveString.push(curvePoint)

                    //     }


                    //     curve = new Curve(curveString, thickness=0.01, color=this.color, fillcolor=this.fillcolor)
                    //     this.curves.push(curve)
                    // }


                    curveString = []

                    for (let i = 0; i < this.points.length; i++) {
                        imgPoint = this.points[i]

                        curvePoint = {}

                        curvePoint.command = imgPoint.type
                        curvePoint['x'] = (imgPoint.x*this.width) + this.coordinates.x
                        curvePoint['y'] = (-imgPoint.y*this.width) + this.coordinates.y

                        curveString.push(curvePoint)

                    }


                    curve = new Curve(curveString, thickness=0.01, color=this.color, fillcolor=this.fillcolor)
                    this.curves.push(curve)

                    resolve(this)
                }).catch(error => {
                    console.error("Error generating curve:", error);
                });

            })
        }

        this.show = function(inSeconds=1) {
            theAnim = showElement(this, inSeconds);
            return theAnim;
        }

        this.hide = function(inSeconds=1) {
            theAnim = hideElement(this, inSeconds);
            return theAnim;
        }

        this.draw = function(inSeconds=1) {
            // console.log(this.curves[0])
            this.curves[0].show().startNextImmediately();
            this.curves[0].draw(inSeconds);
        }


        this.change = {
            url: (url, inSeconds=1) => {
                return new Promise((resolve, reject) => {
                    this.url = url;
                    imageToPoints(this.url).then(imageInfo => {

                        this.points = imageInfo.points[0];
    
                        // console.log(this.points)
    
                        // singlePointGroup = []
    
                        // for (let i = 0; i < this.points.length; i++) {
                        //     pointsFromSegment = this.points[i]
                        //     for (let j = 0; j < pointsFromSegment.length; j++) {
                        //         singlePointGroup.push(pointsFromSegment[j])
                        //     }
                        // }
    
    
                        // this.points = singlePointGroup]
    
                        // this.curves = [];
    
                        // for (let i = 0; i < this.points.length; i++) {
                        //     imagePointGroup = this.points[i]
                        //     imagePoints = []
                            
                        //     curveString = []
    
                        //     for (let j = 0; j < imagePointGroup.length; j++) {
                        //         imgPoint = imagePointGroup[j]
    
                        //         curvePoint = {}
    
                        //         if (j == 0) {
                        //             // curveString += "M "
                        //             curvePoint['command'] = 'M'
                        //         }
                        //         else {
                        //             // curveString += "L "
                        //             curvePoint['command'] = 'L'
                        //         }
    
                        //         // curveString += (imgPoint.x*this.width + this.coordinates.x).toString() + " " + (-imgPoint.y*this.width + this.coordinates.y).toString() + " "
    
                        //         newPoint = {
                        //             coordinates: {
                        //                 x: (imgPoint.x*this.width) + this.coordinates.x,
                        //                 y: (-imgPoint.y*this.width) + this.coordinates.y,
                        //                 z: 0
                        //             }
                        //         }
    
                        //         curvePoint['x'] = newPoint.coordinates.x
                        //         curvePoint['y'] = newPoint.coordinates.y
    
    
                        //         // imagePoints.push(newPoint)
                                
                        //         curveString.push(curvePoint)
    
                        //     }
    
    
                        //     curve = new Curve(curveString, thickness=0.01, color=this.color, fillcolor=this.fillcolor)
                        //     this.curves.push(curve)
                        // }
    
    
                        curveString = []
    
                        for (let i = 0; i < this.points.length; i++) {
                            imgPoint = this.points[i]
    
                            curvePoint = {}
    
                            curvePoint.command = imgPoint.type
                            curvePoint['x'] = (imgPoint.x*this.width) + this.coordinates.x
                            curvePoint['y'] = (-imgPoint.y*this.width) + this.coordinates.y
    
                            curveString.push(curvePoint)
    
                        }
    
    
                        // curve = new Curve(curveString, thickness=0.01, color=this.color, fillcolor=this.fillcolor)
                        this.curves[0].change.points(curveString, inSeconds)
    
                        resolve(this)
                    }).catch(error => {
                        console.error("Error generating curve:", error);
                    });
                })
            }
        }


        this.set = {
            color : (color) => {
                this.color = color;
                for (let curve of this.curves) {
                    curve.change.color(color).startNextImmediately()
                }
                return this;
            },
            
        }

        this.remove = function() {
            for (let curve of this.curves) {
                curve.remove()
            }
        }

        return this.generateCurves()
    }


    function hideShowTagGroup(type, tag, inSeconds=1) {
        const elements = rhyform.tags[tag] || [];

        htmlAnimationsToAdd = []

        startWith = type == 0 ? 1 : 0
        endWith = type == 0 ? 0 : 1

        animationOptions = {}
        animationOptions.keyframes = {}
        animationOptions.keyframes["0"] = {}
        animationOptions.keyframes[inSeconds.toString()] = {}

        animationOptions.elementsAndPropertiesInvolved = {}
        

        for (let element of elements) {

            
            if (element instanceof Point || element instanceof Line || element instanceof Circle || element instanceof Curve) {

                element.seen = type == 1 ? true : false;

                // console.log(element)
                
                if (element instanceof Point) {
                    element.updatePointRender();
                }

                if (element instanceof Line) {
                    element.updateLineRender();
                }

                if (element instanceof Circle) {
                    element.updateCircleRender();
                }


                // console.log(element)

                // if (element.element != null) {
                //     if (type == 0) {
                //         element.element[0].style.pointerEvents = "none";
                //     }
                //     else {
                //         element.element[0].style.pointerEvents = "auto";
                //     }
                // }


                animationOptions.keyframes["0"][element.name] = {
                    'graph': element.space.name + "-graph",
                    'object': element.name,
                    'options': { opacity: startWith}
                }

                animationOptions.keyframes[inSeconds.toString()][element.name] = {
                    'graph': element.space.name + "-graph",
                    'object': element.name,
                    'options': { opacity: endWith}
                }

                animationOptions.elementsAndPropertiesInvolved[element.name] = {
                    element: element,
                    properties: ['opacity']
                }

            } else if (element instanceof Text || element instanceof ValueSlider) {

                // if (type == 0) {
                //     element.element.style.pointerEvents = "none";
                // }
                // else {
                //     element.element.style.pointerEvents = "auto";
                // }

                htmlAnimationOptions = {
                    "propertiesAtStart": {
                        "opacity": startWith,
                    },
                    "propertiesAtEnd": {
                        "opacity": endWith,
                    },
                    "element": element.element,
                }

                htmlAnimationOptions.elementsAndPropertiesInvolved = {}

                htmlAnimationOptions.elementsAndPropertiesInvolved[element.name] = {
                    element: element,
                    properties: ['opacity']
                }


                htmlAnimationsToAdd.push({
                    "element": element.element,
                    "seconds": inSeconds,
                    "options": htmlAnimationOptions
                })


            }
            else if (element instanceof Button) {
                
                element = element.textObject

                // if (type == 0) {
                //     element.element.style.pointerEvents = "none";
                // }
                // else {
                //     element.element.style.pointerEvents = "auto";
                // }


                htmlAnimationOptions = {
                    "propertiesAtStart": {
                        "opacity": startWith,
                    },
                    "propertiesAtEnd": {
                        "opacity": endWith,
                    },
                    "element": element.element,
                }

                htmlAnimationOptions.elementsAndPropertiesInvolved = {}

                htmlAnimationOptions.elementsAndPropertiesInvolved[element.name] = {
                    element: element,
                    properties: ['opacity']
                }


                htmlAnimationsToAdd.push({
                    "element": element.element,
                    "seconds": inSeconds,
                    "options": htmlAnimationOptions
                })


            } else if (element instanceof Equation  || element instanceof VectorImage) {
                // console.log(element.curves)
                for (let curveElement of element.curves) {
                    if (curveElement instanceof Curve) {
                        animationOptions.keyframes["0"][curveElement.name] = {
                            'graph': curveElement.space.name + "-graph",
                            'object': curveElement.name,
                            'options': { opacity: startWith}
                        }

                        animationOptions.keyframes[inSeconds.toString()][curveElement.name] = {
                            'graph': curveElement.space.name + "-graph",
                            'object': curveElement.name,
                            'options': { opacity: endWith}
                        }

                        animationOptions.elementsAndPropertiesInvolved[curveElement.name] = {
                            element: curveElement,
                            properties: ['opacity']
                        }
                    }
                }
            
                
                // anim = new Animation(0, inSeconds*2, inSeconds, 30, animateImmediately = false, animOptions=animationOptions)
                // return anim;
            } else {
                console.log("Unknown element type with tag ", tag);
            }


        }


        animGroup = new AnimationGroup()

        anim = new Animation(0, inSeconds, inSeconds, 30, animateImmediately = false, animOptions=animationOptions)
        animGroup.addAnim(anim)

        for (let htmlAnimation of htmlAnimationsToAdd) {
            htmlAnim = new Animation(0, htmlAnimation.seconds, htmlAnimation.seconds, 30, animateImmediately = true, animOptions=htmlAnimation.options, type="html-css-style")
            animGroup.addAnim(htmlAnim)
        }

        animGroup.list[animGroup.list.length - 1].animateNextImmediately = false
        return animGroup;
    }

    // add style to head

    function styleToHead() {
        let style = document.createElement('style');
        style.id = "rhyform-styles";
        style.type = 'text/css';
        style.innerHTML = `
        .rhyform-button {
            background-color: transparent;
            cursor: pointer;
        }
        .rhyform-button:hover {
            background-color: white;
            color: black !important;
        }

        .rhyform-button:active {
            background-color: white;
            color: black;
        }

        .rhyform-gradient-text {
            background-image: linear-gradient(to left top, hsla(var(--base-hue), 100%, 50%, 1), hsla(var(--secondary-hue), 100%, 50%, 1));
            background-clip: text;
            -webkit-background-clip: text;
            -moz-background-clip: text;
            -webkit-text-fill-color: transparent; 
            -moz-text-fill-color: transparent;
        }

        .rhyform-gradient-text:hover {
            background-color: white !important;
            background-image: none !important;
            background-clip: none; !important;
            -webkit-background-clip: none;
            -moz-background-clip: none;
            -webkit-text-fill-color: auto; 
            -moz-text-fill-color: auto;
            color: black !important;
        }

        .rhyform-slider-editToggle-button {
            font-size: 12px;
            cursor: pointer;
            color: hsla(0, 0%, 100%, 0.3);
        }

        .rhyform-slider-editToggle-button:hover {
            color: white;
        }

        .rhyform-slider-glassy {
            background-color: hsla(0, 0%, 10%, 0.4);
            backdrop-filter: blur(3px);
        }


        
        /*Chrome*/
        @media screen and (-webkit-min-device-pixel-ratio:0) {
            .rhyform-slider-input[type='range'] {
                overflow: hidden;
                -webkit-appearance: none;
                background-color: hsla(0, 0%, 100%, 0.2);
                border-radius: 5px;
                padding: 3px 0;
            }
            
            .rhyform-slider-input[type='range']::-webkit-slider-runnable-track {
                -webkit-appearance: none;
                height: 0px;
                width: 100%;
                color: black;
                margin-top: -10px;
                border-radius: 50%;
            }
            
            .rhyform-slider-input[type='range']::-webkit-slider-thumb {
                width: 20px;
                -webkit-appearance: none;
                height: 20px;
                cursor: ew-resize;
                background: hsla(198, 100%, 50%, 0);
                box-shadow: -1001px 0px 0px 1000px hsla(198, 100%, 50%, 1);
                border-radius: 50%;
                margin-top: -5px;
                position: relative;
            }

            .rhyform-design-slider-input[type='range'] {
                overflow: visible;
                -webkit-appearance: none;
                background-color: hsla(0, 0%, 100%, 0.2);
                border-radius: 5px;
                padding: 3px 0;
            }
            
            .rhyform-design-slider-input[type='range']::-webkit-slider-runnable-track {
                -webkit-appearance: none;
                height: 0px;
                width: 100%;
                color: black;
                margin-top: -10px;
                border-radius: 50%;
            }
            
            .rhyform-design-slider-input[type='range']::-webkit-slider-thumb {
                width: 20px;
                -webkit-appearance: none;
                height: 20px;
                cursor: ew-resize;
                background: hsla(198, 100%, 70%, 1);
                box-shadow: 0px 0px 0px 0px hsla(198, 100%, 70%, 0);
                border-radius: 50%;
                margin-top: -5px;
                position: relative;
            }

        }

        @supports (-moz-appearance:none) {
            .rhyform-slider-input[type='range'] {
                overflow: hidden;
                -webkit-appearance: none;
                background-color: hsla(0, 0%, 100%, 0);
                border-radius: 5px;
                padding: 5px 0;
            }

            .rhyform-design-slider-input[type='range'] {
                overflow: hidden;
                -webkit-appearance: none;
                background-color: hsla(0, 0%, 100%, 0);
                border-radius: 5px;
                padding: 5px 0;
            }
          }
          

        /** FF*/
        .rhyform-slider-input[type="range"]::-moz-range-progress {
            background-color: hsla(198, 100%, 50%, 1); 
        }
        .rhyform-slider-input[type="range"]::-moz-range-track {  
            background-color: hsla(0, 0%, 100%, 0.2);
        }
        /* IE*/
        .rhyform-slider-input[type="range"]::-ms-fill-lower {
            background-color: hsla(198, 100%, 50%, 1); 
        }
        .rhyform-slider-input[type="range"]::-ms-fill-upper {  
            background-color: hsla(0, 0%, 100%, 0.2);
        }

        `;  

        document.getElementsByTagName('head')[0].appendChild(style);


        var sliderStylesDiv = document.createElement("div");
        sliderStylesDiv.id = "rhyform-slider-styles";
        sliderStylesDiv.style.display = "none";
        document.body.appendChild(sliderStylesDiv);
        
    }

    styleToHead()

    // Public API
    return {
        scenes: {},
        spaces: {},
        tags: {},
        activeScene: null,

        font: "Nunito",
        fontSize: "auto",

        objectAdditionIndex: 0,

        drawingPrecision: 10,

        generateEquation: function(expression="x", at={x:0, y:0, z:0}, color="white", fontSize="20px") {
            return new Promise((resolve, reject) => {
                equationToPoints(expression, fontSize).then(equationInfo => {
                    // join nested arrays

                    ar = []
                    for (let i = 0; i < equationInfo.points.length; i++) {
                        ar = ar.concat(equationInfo.points[i])
                    }

                    // console.log(ar)

                    equation = new Equation(ar, expression, at, equationInfo.width, color,fontSize);
                    // equation.show();
                    resolve(equation);
                }).catch(error => {
                    console.error("Error creating equation:", error);
                });
            });
        },

        generateVectorImage : function(url="none", at={x:0, y:0, z:0}, color = "white", fillcolor="none", width=1) {
            return new Promise((resolve, reject) => {
                vectorImage = new VectorImage(url, at, color, fillcolor, width);
                resolve(vectorImage);
            });
        },

        libraryFunctions: {
            convertBoundsToViewXBounds : function(bounds) {
                return {
                    xmax: bounds.x + bounds.width,
                    xmin: bounds.x,
                    
                    ymax: bounds.y + bounds.height,
                    ymin: bounds.y
                }
            },
            distanceBetweenPoints: function(point1, point2) {
                if (point1 instanceof Point && point2 instanceof Point) {
                    differenceSquaredSum = 0
                    for (let dimension in point1.coordinates) {
                        differenceSquaredSum += Math.pow(point1.coordinates[dimension] - point2.coordinates[dimension], 2)
                    }
                    return Math.sqrt(differenceSquaredSum)
                }
            }
        },

        wait : function(forSeconds=1) {
            anim = new Animation(0, forSeconds, forSeconds, 30, animateImmediately = false, animOptions={}, type="wait")
            return anim;
        },

        runFunction : function(func, inSeconds=1) {
            animOptions = {
                "function": func
            }
            anim = new Animation(0, inSeconds, inSeconds, 30, animateImmediately = false, animOptions=animOptions, type="function")
            return anim;
        },

        showElementsWithTag: function(tag, inSeconds=1) {
            return hideShowTagGroup(1, tag, inSeconds)
        },

        hideElementsWithTag: function(tag, inSeconds=1) {
            return hideShowTagGroup(0, tag, inSeconds)
        },

        removeElementsWithTag: function(tag) {
            const elements = rhyform.tags[tag] || [];

            for (let element of elements) {
                if (element != null) {
                    // console.log(element)
                    element.remove()

                    // remove from other tags too
                    if (element.tags) {
                        for (let othertag of element.tags) {
                            if (othertag) {
                                rhyform.tags[othertag] = rhyform.tags[othertag].filter(e => e !== element);
                            }
                        }
                    }
                }
            }

            for (let element of elements) {
                if (element && element.name && rhyform[element.name]) {
                    // delete Instance
                    delete rhyform[element.name]
                }
            }

            if (rhyform.tags && rhyform.tags[tag]) {
                delete rhyform.tags[tag];
            }
        },

        deleteElementsWithTag: function(tag) {
            rhyform.removeElementsWithTag(tag)
        },

        createGradient: function(at=[{color: 'white', position: 0}, {color: "black", position: 1}], direction="horizontal") {
            return new Gradient(at, direction);
        },
    
        createScene: function(sceneName) {
            let scene = new Scene(sceneName);
            this.scenes[sceneName] = scene;
            return scene;
        },

        createSpaceInElement: function(elementSelector, spaceName) {
            if (spaceName == undefined) {
                spaceName = "space" + Object.keys(this.spaces).length;
            }
            let space = new Space(spaceName, elementSelector);
            this.spaces[spaceName] = space;
            return space;
        },

        createPoint: function(at={x:0, y:0, z:0}, size=0.5, color="white") {
            return new Point(at, size, color);
        },

        createText: function(content) {
            return new Text(content);
        },

        createLine: function(point1, point2) {
            if (!(point1 instanceof Point)) {
                point1= new Point(at={x:0, y:0, z:0});
            }

            if (!(point2 instanceof Point)) {
                point2= new Point(at={x:1, y:1, z:1});
            }

            return new Line(between=[point1, point2]);
        },

        createCurve: function(points=[]) {

            for (pointIndex = 0; pointIndex < points.length; pointIndex++) {
                point = points[pointIndex];

                // console.log(point)
                if (!(point instanceof Point)) {
                    point = new Point(at={x:Math.random(), y:Math.random(), z:0});
                    points[pointIndex] = point;
                }
            }

            return new Curve(points=points);
        },

        createCircle: function(point, radius) {
            if (!(point instanceof Point)) {
                point= new Point(at={x:0, y:0, z:0});
            }

            return new Circle(point, radius);
        },

        createAudio: function(url) {
            return new Audio(url);
        },

        createSound: function(url) {
            return new Audio(url);
        },

        createButton: function(content, onClick=()=>{}) {
            return new Button(content, onClick);
        },

        createSlider: function(options) {

            const defaults = {
                at: {x: 0, y: 0, z: 0},
                width: 5,
                min: 0,
                max: 100,
                value: 50,
                step: 1,
                sliderProperties: {
                    onChange: function(){ console.log("Slider value changed"); },
                    valueTransformToText: function(value) {return value;},
                    thumbSize: 20,
                    thumbColor: "hsla(198, 100% 60%, 1)", 
                    trackFillColor: "hsla(198, 100%, 40%, 1)",
                    trackColor: "hsla(198, 0%, 100%, 0.3)",
                    thickness: 10,
                    isAlwaysVisible: false,
                    backgroundType: 'glassy',
                    borderColor: 'hsla(0, 0%, 50%, 0.1)'
                },
                valueDisplayProperties: {
                    color: "white",
                    fontSize: "xxx-large",
                    font: "Gaegu"
                },
                labelTextProperties: {
                    color: "hsla(0, 0%, 70%, 1)",
                    fontSize: 'auto',
                    font: "Gaegu",
                    text: "Temperature"
                },
                labelDescriptionProperties: {
                    color: "hsla(0, 0%, 40%, 1)",
                    fontSize: 'small',
                    font: "Gaegu",
                    text: "The value represents the change in some quantity that is important to this visualization. Maybe it's the number of people in a room, or the amount of money in a bank account or number of stars in a galaxy ⭐️."
                }
            };
        

            const sliderProperties = Object.assign({}, defaults.sliderProperties, options.sliderProperties);
            const valueDisplayProperties = Object.assign({}, defaults.valueDisplayProperties, options.valueDisplayProperties);
            const labelTextProperties = Object.assign({}, defaults.labelTextProperties, options.labelTextProperties);
            const labelDescriptionProperties = Object.assign({}, defaults.labelDescriptionProperties, options.labelDescriptionProperties);

            const params = Object.assign({}, defaults, options);
            params.sliderProperties = sliderProperties;
            params.valueDisplayProperties = valueDisplayProperties;
            params.labelTextProperties = labelTextProperties;
            params.labelDescriptionProperties = labelDescriptionProperties;
            
            return new ValueSlider(params.at, params.width, params.min, params.max, params.value, params.step, params.sliderProperties, params.valueDisplayProperties, params.labelTextProperties, params.labelDescriptionProperties);
        },




        selectActiveScene: function(scene) {
            this.activeScene = scene;
        },

        moveToTop: function(element) {
        },


    };

})();


