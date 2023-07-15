viewX = {}
  

viewX.graphToSvgY = function (value, graphymin, graphymax) {
	if (graphymin == graphymax) {
		graphymin = graphymin - 1
		graphymax = graphymax + 1
		console.log('Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : ' + graphymax + ' and Min value : ' + graphymin)
	}
	if (graphymin > graphymax) {
		temp = graphymin
		graphymin = graphymax
		graphymax = temp
		console.log('Conversion error, maximum value less than minimum value. Values were swapped. Max value : ' + graphymax + ' and Min value : ' + graphymin)
	}
	y = ((-80)/(graphymax - graphymin))*(value - graphymin) + 90
	return y
}

viewX.graphToScaledY = function (value, graphymin, graphymax, aspectratio) {
	if(aspectratio > 1) {
		if (graphymin == graphymax) {
			graphymin = graphymin - 1
			graphymax = graphymax + 1
			console.log('Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : ' + graphymax + ' and Min value : ' + graphymin)
		}
		if (graphymin > graphymax) {
			temp = graphymin
			graphymin = graphymax
			graphymax = temp
			console.log('Conversion error, maximum value less than minimum value. Values were swapped. Max value : ' + graphymax + ' and Min value : ' + graphymin)
		}
		y = ((-80)/(graphymax - graphymin))*(value - graphymin) + 90
		
	}
	else {
		if (graphymin == graphymax) {
			graphymin = graphymin - 1
			graphymax = graphymax + 1
			console.log('Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : ' + graphymax + ' and Min value : ' + graphymin)
		}
		if (graphymin > graphymax) {
			temp = graphymin
			graphymin = graphymax
			graphymax = temp
			console.log('Conversion error, maximum value less than minimum value. Values were swapped. Max value : ' + graphymax + ' and Min value : ' + graphymin)
		}
		aspectratio = 1/aspectratio
		vl = (100*(1 - aspectratio)/2) + (10*aspectratio)
		vh = (100*(aspectratio + 1)/2) - (10*aspectratio)
		y = ((vl - vh)/(graphymax - graphymin))*(value - graphymin) + vh
		// console.log(x)
		// console.log(v1, v2)
		// y = (((v2 - v1)/(100))*(y)) + v1
	}

	return y
}

viewX.svgToGraphY = function (percentvalue, graphymin, graphymax, aspectratio) {
	if(aspectratio > 1) {
		if (graphymin == graphymax) {
			graphymin = graphymin - 1
			graphymax = graphymax + 1
			console.log('Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : ' + graphymax + ' and Min value : ' + graphymin)
		}
		if (graphymin > graphymax) {
			temp = graphymin
			graphymin = graphymax
			graphymax = temp
			console.log('Conversion error, maximum value less than minimum value. Values were swapped. Max value : ' + graphymax + ' and Min value : ' + graphymin)
		}

		y = ((percentvalue - 90)*(graphymax - graphymin)/((-1)*80)) + graphymin
		
	}
	else {
		if (graphymin == graphymax) {
			graphymin = graphymin - 1
			graphymax = graphymax + 1
			console.log('Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : ' + graphymax + ' and Min value : ' + graphymin)
		}
		if (graphymin > graphymax) {
			temp = graphymin
			graphymin = graphymax
			graphymax = temp
			console.log('Conversion error, maximum value less than minimum value. Values were swapped. Max value : ' + graphymax + ' and Min value : ' + graphymin)
		}
		aspectratio = 1/aspectratio
		vl = (100*(1 - aspectratio)/2) + (10*aspectratio)
		vh = (100*(aspectratio + 1)/2) - (10*aspectratio)

		// y = ((vl - vh)/(graphymax - graphymin))*(value - graphymin) + vh
		y = (((percentvalue - vh)*(graphymax - graphymin))/(vl - vh)) + graphymin
		// console.log(x)
		// console.log(v1, v2)
		// y = (((v2 - v1)/(100))*(y)) + v1
	}

	return y
}

viewX.graphToSvgX = function (value, graphxmin, graphxmax) {
	if (graphxmin == graphxmax) {
		graphxmin = graphxmin - 1
		graphxmax = graphxmax + 1
		console.log('Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : ' + graphxmax + ' and Min value : ' + graphxmin)
	}
	if (graphxmin > graphxmax) {
		temp = graphxmin
		graphxmin = graphxmax
		graphxmax = temp
		console.log('Conversion error, maximum value less than minimum value. Values were swapped. Max value : ' + graphxmax + ' and Min value : ' + graphxmin)
	}
	x = ((80)/(graphxmax - graphxmin))*(value - graphxmin) + 10
	return x
}

viewX.graphToScaledX = function(value, graphxmin, graphxmax, aspectratio) {
	if (aspectratio <= 1) {
		if (graphxmin == graphxmax) {
			graphxmin = graphxmin - 1
			graphxmax = graphxmax + 1
			console.log('Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : ' + graphxmax + ' and Min value : ' + graphxmin)
		}
		if (graphxmin > graphxmax) {
			temp = graphxmin
			graphxmin = graphxmax
			graphxmax = temp
			console.log('Conversion error, maximum value less than minimum value. Values were swapped. Max value : ' + graphxmax + ' and Min value : ' + graphxmin)
		}
		x = ((80)/(graphxmax - graphxmin))*(value - graphxmin) + 10
	}
	else {
		if (graphxmin == graphxmax) {
			graphxmin = graphxmin - 1
			graphxmax = graphxmax + 1
			console.log('Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : ' + graphxmax + ' and Min value : ' + graphxmin)
		}
		if (graphxmin > graphxmax) {
			temp = graphxmin
			graphxmin = graphxmax
			graphxmax = temp
			console.log('Conversion error, maximum value less than minimum value. Values were swapped. Max value : ' + graphxmax + ' and Min value : ' + graphxmin)
		}
		vl = (100*(1 - aspectratio)/2) + (10*aspectratio)
		vh = (100*(aspectratio + 1)/2) - (10*aspectratio)
		x = ((vh - vl)/(graphxmax - graphxmin))*(value - graphxmin) + vl
		// console.log(x)
		// console.log(v1, v2)
		// y - y1 = (y2 - y1)/(x2 - x1) * (x - x1)
		// x = (((v2 - v1)/(90))*(x - 10)) + v1
		// console.log(x)
		// console.log('_') 
	}
	return x
}

viewX.svgToGraphX = function(percentvalue, graphxmin, graphxmax, aspectratio) {
	if (aspectratio <= 1) {
		if (graphxmin == graphxmax) {
			graphxmin = graphxmin - 1
			graphxmax = graphxmax + 1
			console.log('Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : ' + graphxmax + ' and Min value : ' + graphxmin)
		}
		if (graphxmin > graphxmax) {
			temp = graphxmin
			graphxmin = graphxmax
			graphxmax = temp
			console.log('Conversion error, maximum value less than minimum value. Values were swapped. Max value : ' + graphxmax + ' and Min value : ' + graphxmin)
		}

		x = ((percentvalue - 10)*(graphxmax - graphxmin)/80) + graphxmin
	}
	else {
		if (graphxmin == graphxmax) {
			graphxmin = graphxmin - 1
			graphxmax = graphxmax + 1
			console.log('Conversion error, maximum value is equal to minimum value. Max value was raised by 1 and Min value was reduced by 1. Max value : ' + graphxmax + ' and Min value : ' + graphxmin)
		}
		if (graphxmin > graphxmax) {
			temp = graphxmin
			graphxmin = graphxmax
			graphxmax = temp
			console.log('Conversion error, maximum value less than minimum value. Values were swapped. Max value : ' + graphxmax + ' and Min value : ' + graphxmin)
		}
		vl = (100*(1 - aspectratio)/2) + (10*aspectratio)
		vh = (100*(aspectratio + 1)/2) - (10*aspectratio)

		// x = ((vh - vl)/(graphxmax - graphxmin))*(value - graphxmin) + vl

		x = ((percentvalue - vl)*(graphxmax - graphxmin)/(vh - vl)) + graphxmin

		// y - y1 = (y2 - y1)/(x2 - x1) * (x - x1)
		// x = (((v2 - v1)/(90))*(x - 10)) + v1
		 
	}
	return x
}

viewX.isInt = function(n){
	return Number(n) === n && n % 1 === 0;
}

viewX.isFloat = function(n){
	return Number(n) === n && n % 1 !== 0;
}



viewX.gridtickvalues = function(valmin, valmax, ticksexpected) {
	expstring = ((valmax - valmin)/ticksexpected).toExponential()
	majorgridorder = parseFloat(Math.pow(10 , expstring.slice(expstring.indexOf('e') + 1)))
	
	if (expstring.indexOf('.') != -1) {
		majorgriddivision = parseFloat(expstring.slice(0, expstring.indexOf('.'))*majorgridorder)	
	}
	else {
		majorgriddivision = parseFloat(expstring.slice(0, expstring.indexOf('e'))*majorgridorder)
	}
	

	integerchoices = [1,2,5,10]
	for(choice = 0; choice < integerchoices.length - 1; choice++) {
		if (majorgriddivision < integerchoices[choice + 1]*majorgridorder) {
			majorgriddivisionchoice = majorgridorder*integerchoices[choice]
			break
		}
	}

	if(valmin > 0) {
		majorgridstart = Math.ceil(valmin/majorgriddivisionchoice)*majorgriddivisionchoice;
		majorgridstart = majorgridstart - majorgriddivisionchoice
	}
	else if(valmin < 0) {
		majorgridstart = Math.floor(valmin/majorgriddivisionchoice)*majorgriddivisionchoice;
	}
	else{
		majorgridstart = majorgriddivisionchoice;
	}

	// majorgridstart = majorgridstart - majorgriddivisionchoice
	// console.log(majorgridstart, (valmax + majorgriddivisionchoice), majorgriddivisionchoice)

	majortickvalues = []
	for(majoraxispoint = majorgridstart; majoraxispoint < (valmax + majorgriddivisionchoice); majoraxispoint = majoraxispoint + majorgriddivisionchoice) {
		majortickvalues.push(majoraxispoint)
	}

	return majortickvalues
}

viewX.updateGraphZoom = function(graphname, newMinMax) {
	gdata = viewX.graphData[graphname]

	svgElement = gdata.svgElement

	if (newMinMax.xmin != 0) {
		gdata.xmin = newMinMax.xmin || gdata.xmin
	}
	else {
		gdata.xmin = 0
	}

	if (newMinMax.xmax != 0) {
		gdata.xmax = newMinMax.xmax || gdata.xmax
	}
	else {
		gdata.xmax = 0
	}

	if (newMinMax.ymin != 0) {
		gdata.ymin = newMinMax.ymin || gdata.ymin
	}
	else {
		gdata.ymin = 0
	}

	if (newMinMax.ymax != 0) {
		gdata.ymax = newMinMax.ymax || gdata.ymax
	}
	else {
		gdata.ymax = 0
	}

	aratio = gdata.aspectratio

	if (gdata.unitAspectRatio == 'yes') {
		if (gdata.fixAxis == 'yaxis') {
			if (gdata.fixAxisStretchCentrally == 'yes') {
				centre = (gdata.xmax + gdata.xmin)/2
				gdata.xmin = centre - ((gdata.ymax - gdata.ymin)*aratio/2)
				gdata.xmax = centre + ((gdata.ymax - gdata.ymin)*aratio/2)
			}
			else {
				gdata.xmax = gdata.xmin + (gdata.ymax - gdata.ymin)*aratio
			}
			
		}
		else {
			if (gdata.fixAxisStretchCentrally == 'yes') {
				centre = (gdata.ymax + gdata.ymin)/2
				gdata.ymin = centre - ((gdata.xmax - gdata.xmin)*aratio/2)
				gdata.ymax = centre + ((gdata.xmax - gdata.xmin)*aratio/2)
			}
			else {
				gdata.ymax = gdata.ymin + (gdata.xmax - gdata.xmin)*aratio	
			}
			
		}
	}

	if (gdata.yaxisvisibility == 'yes') {
		var lineElement = gdata.yaxisElement
		lineElement.setAttribute('x1', viewX.graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) + '%');
		lineElement.setAttribute('y1', viewX.graphToScaledY(gdata.ymax, gdata.ymin, gdata.ymax, aratio) + '%');
		lineElement.setAttribute('x2', viewX.graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) + '%')
		lineElement.setAttribute('y2', viewX.graphToScaledY(gdata.ymin, gdata.ymin, gdata.ymax, aratio) + '%');
		if (viewX.darkmode == false) {
			lineElement.style.stroke = gdata.yaxiscolor
		}
		else {
			lineElement.style.stroke = 'hsla(0, 0%, 100%, 1)'
		}
		gdata.yaxisElement = lineElement
	}

	if (gdata.xaxisvisibility == 'yes') {
		var lineElement = gdata.xaxisElement
		lineElement.setAttribute('x1', viewX.graphToScaledX(gdata.xmin, gdata.xmin, gdata.xmax, aratio) + '%');
		lineElement.setAttribute('y1', viewX.graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) + '%');
		lineElement.setAttribute('x2', viewX.graphToScaledX(gdata.xmax, gdata.xmin, gdata.xmax, aratio) + '%')
		lineElement.setAttribute('y2', viewX.graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) + '%');
		if (viewX.darkmode == false) {
			lineElement.style.stroke = gdata.xaxiscolor
		}
		else {
			lineElement.style.stroke = 'hsla(0, 0%, 100%, 1)'
		}
		gdata.xaxisElement = lineElement
	}

	viewX.deleteSegments(gdata.xmajorgridElements)

	ticks = gdata.gridlinenumberX

	if (gdata.xmajorgridlinesvisibility == 'yes') {
		xmajortickvalues = viewX.gridtickvalues(gdata.xmin, gdata.xmax, ticks)
		gdata.xmajorgridElements = []
		for (m = 0; m < xmajortickvalues.length; m++) {
			ticklocation = xmajortickvalues[m]
			var lineElement = document.createElementNS("http://www.w3.org/2000/svg", 'line');
			ylength = (gdata.ymax - gdata.ymin)
			if (gdata.xmajorgridlinesextension == 'yes') {
				lineElement.setAttribute('x1', viewX.graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) + '%');
				lineElement.setAttribute('y1', viewX.graphToScaledY(gdata.ymin - (ylength)/2, gdata.ymin, gdata.ymax, aratio) + '%');
				lineElement.setAttribute('vector-effect','non-scaling-stroke');
				lineElement.setAttribute('x2', viewX.graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) + '%')
				lineElement.setAttribute('y2', viewX.graphToScaledY(gdata.ymax + (ylength)/2, gdata.ymin, gdata.ymax, aratio) + '%');
				
			}
			else {
				lineElement.setAttribute('x1', viewX.graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) + '%');
				lineElement.setAttribute('y1', viewX.graphToScaledY(gdata.ymin, gdata.ymin, gdata.ymax, aratio) + '%');
				lineElement.setAttribute('vector-effect','non-scaling-stroke');
				lineElement.setAttribute('x2', viewX.graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) + '%')
				lineElement.setAttribute('y2', viewX.graphToScaledY(gdata.ymax, gdata.ymin, gdata.ymax, aratio) + '%');
				lineElement.setAttribute('id', gdata.name + '-xmajorgridline-' + m)
			}
			if (viewX.darkmode == false) {
				lineElement.style.stroke = gdata.xmajorgridcolor
			}
			else {
				lineElement.style.stroke = 'hsla(0, 0%, 100%, 1)'
			}
			lineElement.setAttribute('id', gdata.name + '-xmajorgridline-' + m)	
			lineElement.style.strokeWidth = gdata.xmajorgridthickness + '%';
			gdata.xmajorgridElements.push(lineElement)
			svgElement.appendChild(lineElement);
		}
		gdata.xmajorgridticks = xmajortickvalues
	}

	viewX.deleteSegments(gdata.ymajorgridElements)

	ticks = gdata.gridlinenumberY

	if (gdata.ymajorgridlinesvisibility == 'yes') {
		ymajortickvalues = viewX.gridtickvalues(gdata.ymin, gdata.ymax, ticks)
		gdata.ymajorgridElements = []
		for (m = 0; m < ymajortickvalues.length; m++) {
			ticklocation = ymajortickvalues[m]
			var lineElement = document.createElementNS("http://www.w3.org/2000/svg", 'line');
			xlength = (gdata.xmax - gdata.xmin)
			if (gdata.ymajorgridlinesextension == 'yes') {
				lineElement.setAttribute('x1', viewX.graphToScaledX((gdata.xmin) - xlength/2, gdata.xmin, gdata.xmax, aratio) + '%');
				lineElement.setAttribute('y1', viewX.graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + '%');
				lineElement.setAttribute('vector-effect','non-scaling-stroke');
				lineElement.setAttribute('x2', viewX.graphToScaledX(gdata.xmax + (xlength/2), gdata.xmin, gdata.xmax, aratio) + '%')
				lineElement.setAttribute('y2', viewX.graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + '%');
			}
			else {
				lineElement.setAttribute('x1', viewX.graphToScaledX(gdata.xmin, gdata.xmin, gdata.xmax, aratio) + '%');
				lineElement.setAttribute('y1', viewX.graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + '%');
				lineElement.setAttribute('vector-effect','non-scaling-stroke');
				lineElement.setAttribute('x2', viewX.graphToScaledX(gdata.xmax, gdata.xmin, gdata.xmax, aratio) + '%')
				lineElement.setAttribute('y2', viewX.graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + '%');
			}
			lineElement.setAttribute('id', gdata.name + '-ymajorgridline-' + m)
			if (viewX.darkmode == false) {
				lineElement.style.stroke = gdata.ymajorgridcolor
			}
			else {
				lineElement.style.stroke = 'hsla(0, 0%, 100%, 1)'
			}
			lineElement.setAttribute('id', gdata.name + '-ymajorgridline-' + m)
			lineElement.style.strokeWidth = gdata.ymajorgridthickness + '%';
			gdata.ymajorgridElements.push(lineElement)
			svgElement.appendChild(lineElement);
		}
		gdata.ymajorgridticks = ymajortickvalues
	}

	viewX.deleteSegments(gdata.ymajorlabelsElements)


	ticks = gdata.gridlinenumberY

	if (gdata.ymajorgridlabelvisibility == 'yes') {
		gdata.ymajorlabelsElements = []
		ymajortickvalues = viewX.gridtickvalues(gdata.ymin, gdata.ymax, ticks)
		scale = gdata.ymax - gdata.ymin
		expstring = scale.toExponential().toString()
		order = (expstring.slice(expstring.indexOf('e') + 1)*(-1))
		labelylocationX = gdata.axislocationX
		if (viewX.graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) < 0) {
			labelylocationX = gdata.xmin
		}
		if (viewX.graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) > 100) {
			labelylocationX = gdata.xmax
		}
		for (m = gdata.ylabelexclusionsstart; m < ymajortickvalues.length - gdata.ylabelexclusionsend; m++) {
			ticklocation = ymajortickvalues[m]
			value = ticklocation
			if (eval(gdata.ymajorgridlabelOnlyIf)) {
			
				var textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
				

				if(viewX.isInt(ticklocation)) {
					if (gdata.isComplexPlane == 'yes') {
						textElement.innerHTML = ticklocation + 'i'
					}
					else {
						textElement.innerHTML = ticklocation
					}
				}
				else {
					
					if (Math.abs(ticklocation) < 0.01 && order > 2) {
						ticklocation = ticklocation.toExponential(order)
							
					}
					else {
						ticklocation = ticklocation.toFixed(order + 1)
					}
					if (gdata.isComplexPlane == 'yes') {
						textElement.innerHTML = ticklocation + 'i'
					}
					else {
						textElement.innerHTML = ticklocation	
					}
					if(ticklocation == 0) {
						textElement.innerHTML = 0
					}

				}


				textElement.setAttribute('x', viewX.graphToScaledX(labelylocationX, gdata.xmin, gdata.xmax, aratio) + 0.5 + gdata.ymajorgridlabelshift + '%');
				textElement.setAttribute('y',viewX.graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + 0.5 + '%');
				textElement.setAttribute('id',gdata.name + '-yticklabel-' + m)
				textElement.style.fontSize = gdata.fontSize
				textElement.style.fontFamily = 'Source Sans Pro'
				textElement.style.userSelect = 'none'
				// textElement.setAttribute('text-anchor', 'middle')
				textElement.style.fill = gdata.ymajorgridlabelcolor
				if (viewX.darkmode == false) {
					textElement.style.fill = gdata.ymajorgridlabelcolor
				}
				else {
					textElement.style.fill = 'hsla(0, 0%, 100%, 1)'
				}	
				svgElement.appendChild(textElement);

				gdata.ymajorlabelsElements.push(textElement)
			}
			
		}
	}


	viewX.deleteSegments(gdata.xmajorlabelsElements)

	ticks = gdata.gridlinenumberX

	if (gdata.xmajorgridlabelvisibility == 'yes') {
		gdata.xmajorlabelsElements = []
		xmajortickvalues = viewX.gridtickvalues(gdata.xmin, gdata.xmax, ticks)
		scale = gdata.xmax - gdata.xmin
		expstring = scale.toExponential().toString()
		order = (expstring.slice(expstring.indexOf('e') + 1)*(-1))
		
		labelxlocationY = gdata.axislocationY
		if (viewX.graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) < 0) {
			labelxlocationY = gdata.ymax
		}
		if (viewX.graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) > 100) {
			labelxlocationY = gdata.ymin
		}


		for (m = gdata.xlabelexclusionsstart; m < xmajortickvalues.length - gdata.xlabelexclusionsend; m++) {
			ticklocation = xmajortickvalues[m]

			value = ticklocation
			if (eval(gdata.xmajorgridlabelOnlyIf)) {

				var textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');

				if(viewX.isInt(ticklocation)) {
					textElement.innerHTML = ticklocation
				}
				else {
					
					if (Math.abs(ticklocation) < 0.01 && order > 2) {
						ticklocation = ticklocation.toExponential(order)
						
						
					}
					else {
						ticklocation = ticklocation.toFixed(order + 1)
					}
					textElement.innerHTML = ticklocation	
					
					if(ticklocation == 0) {
						textElement.innerHTML = 0
					}

				}

				transformedXval = viewX.graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) - 1
				textElement.setAttribute('x', transformedXval + '%');
				transformedYval = viewX.graphToScaledY(labelxlocationY, gdata.ymin, gdata.ymax, aratio) + 2 + gdata.xmajorgridlabelshift
				textElement.setAttribute('y', transformedYval + '%');
				textElement.setAttribute('id',gdata.name + '-xticklabel-' + m)
				textElement.style.fontSize = gdata.fontSize
				textElement.style.userSelect = 'none'
				textElement.setAttribute('text-anchor', 'middle')
				if (parseFloat(order) >= 2) {
					textElement.setAttribute('transform', 'rotate(90, ' + transformedXval + ', ' + transformedYval + ')')	
				}
				textElement.style.fontFamily = 'Source Sans Pro'
				if (viewX.darkmode == false) {
					textElement.style.fill = gdata.xmajorgridlabelcolor
				}
				else {
					textElement.style.fill = 'hsla(0, 0%, 100%, 1)'
				}
				svgElement.appendChild(textElement);
				
				gdata.xmajorlabelsElements.push(textElement)
			}
			
		}
	}


	if (gdata.xaxislabelvisibility == 'yes') {
		var textElement = gdata.xaxislabelElement 
		textElement.setAttribute('x', viewX.graphToScaledX(gdata.xmax, gdata.xmin, gdata.xmax, aratio) + gdata.xaxislabelshift + '%');
		textElement.setAttribute('y',viewX.graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) + 1 + '%');
		gdata.xaxislabelElement = textElement
	}


	if (gdata.yaxislabelvisibility == 'yes') {
		var textElement = gdata.yaxislabelElement
		textElement.setAttribute('x', viewX.graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) + 0 + '%');
		textElement.setAttribute('y',viewX.graphToScaledY(gdata.ymax, gdata.ymin, gdata.ymax, aratio) - gdata.yaxislabelshift + '%');
		gdata.yaxislabelElement = textElement
		
	}


	for (var key in gdata.lineData) {
		lineElement = gdata.lineData[key][0]
		lineoptions = gdata.lineData[key][1]

		lineElement.setAttribute('x1', viewX.graphToScaledX(lineoptions.x1, gdata.xmin, gdata.xmax, aratio) + '%');
		lineElement.setAttribute('y1', viewX.graphToScaledY(lineoptions.y1, gdata.ymin, gdata.ymax, aratio) + '%');
		lineElement.setAttribute('x2', viewX.graphToScaledX(lineoptions.x2, gdata.xmin, gdata.xmax, aratio) + '%')
		lineElement.setAttribute('y2', viewX.graphToScaledY(lineoptions.y2, gdata.ymin, gdata.ymax, aratio) + '%');
	}

	for (var key in gdata.circleData) {
		circleElement = gdata.circleData[key][0]
		circleoptions = gdata.circleData[key][1]
		rx = viewX.distanceBTWgraphToSvg([0,0],[circleoptions.radius, 0], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
		ry = viewX.distanceBTWgraphToSvg([0,0],[0,circleoptions.radius], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
		circleElement.setAttribute('cx', viewX.graphToScaledX(circleoptions.x, gdata.xmin, gdata.xmax, aratio) + '%');
		circleElement.setAttribute('cy', viewX.graphToScaledY(circleoptions.y, gdata.ymin, gdata.ymax, aratio) + '%');
		circleElement.setAttribute('rx', rx + '%')
		circleElement.setAttribute('ry', ry + '%');
		
	}

	for (var key in gdata.pathData) {
		pathElement = gdata.pathData[key][0]
		pathoptions = gdata.pathData[key][1]
		pathstring = 'M'
		for (pth = 0; pth < pathoptions.points.length; pth++) {
			if (pth == 0) {
				pathstring = pathstring + viewX.graphToScaledX(pathoptions.points[pth][0], gdata.xmin, gdata.xmax, aratio) + ' ' + viewX.graphToScaledY(pathoptions.points[pth][1], gdata.ymin, gdata.ymax, aratio) + ' '
			}
			else {
				pathstring = pathstring + 'L' + viewX.graphToScaledX(pathoptions.points[pth][0], gdata.xmin, gdata.xmax, aratio) + ' ' + viewX.graphToScaledY(pathoptions.points[pth][1], gdata.ymin, gdata.ymax, aratio) + ' '
			}
		}
		pathElement.setAttribute('d', pathstring);

	}

	for (var key in gdata.ellipseData) {
		ellipseElement = gdata.ellipseData[key][0]
		ellipseoptions = gdata.ellipseData[key][1]
		rx = viewX.distanceBTWgraphToSvg([0,0],[ellipseoptions.rx, 0], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
		ry = viewX.distanceBTWgraphToSvg([0,0],[0, ellipseoptions.ry], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
		ellipseElement.setAttribute('cx', viewX.graphToScaledX(ellipseoptions.x, gdata.xmin, gdata.xmax, aratio) + '%');
		ellipseElement.setAttribute('cy', viewX.graphToScaledY(ellipseoptions.y, gdata.ymin, gdata.ymax, aratio) + '%');
		ellipseElement.setAttribute('rx', rx + '%')
		ellipseElement.setAttribute('ry', ry + '%');
		
	}

	for (var key in gdata.textData) {
		textElement = gdata.textData[key][0]
		textoptions = gdata.textData[key][1]
		textElement.setAttribute('x', viewX.graphToScaledX(textoptions.x, gdata.xmin, gdata.xmax, aratio) + '%');
		textElement.setAttribute('y', viewX.graphToScaledY(textoptions.y, gdata.ymin, gdata.ymax, aratio) + '%');
	
	}

	for (var key in gdata.rectData) {
		rectElement = gdata.rectData[key][0]
		rectoptions = gdata.rectData[key][1]	
		
		rx = viewX.distanceBTWgraphToSvg([0,0],[rectoptions.w, 0], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
		ry = viewX.distanceBTWgraphToSvg([0,0],[0, rectoptions.h], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
		
		rectElement.setAttribute('x', viewX.graphToScaledX(rectoptions.x, gdata.xmin, gdata.xmax, aratio) + '%');
		rectElement.setAttribute('y', viewX.graphToScaledY(rectoptions.y, gdata.ymin, gdata.ymax, aratio) + '%');
		rectElement.setAttribute('width', rx + '%')
		rectElement.setAttribute('height', ry + '%');
	}			

	for (var key in gdata.pointData) {
		pointElement = gdata.pointData[key][0]
		pointoptions = gdata.pointData[key][1]
		
		pointElement.setAttribute('cx', viewX.graphToScaledX(pointoptions.x, gdata.xmin, gdata.xmax, aratio) + '%');
		pointElement.setAttribute('cy', viewX.graphToScaledY(pointoptions.y, gdata.ymin, gdata.ymax, aratio) + '%');
	}


	for (var key in gdata.arrowData) {
		arrowElement = gdata.arrowData[key][0]
		arrowoptions = gdata.arrowData[key][1]

		arrowFrom = [viewX.graphToScaledX(arrowoptions.from[0], gdata.xmin, gdata.xmax, aratio), viewX.graphToScaledY(arrowoptions.from[1], gdata.ymin, gdata.ymax, aratio)]
		arrowTo = [viewX.graphToScaledX(arrowoptions.to[0], gdata.xmin, gdata.xmax, aratio), viewX.graphToScaledY(arrowoptions.to[1], gdata.ymin, gdata.ymax, aratio)]

		arrowstring = 'M'
		arrowstring = arrowstring + arrowFrom[0] + ' ' + arrowFrom[1] + ' ';
		arrowstring = arrowstring + 'L' + arrowTo[0] + ' ' + arrowTo[1] + ' ';

		arrowDirectionVector = viewX.directionVec(arrowTo, arrowFrom);
		arrowHeadSize = Math.max(3*arrowoptions.strokewidth, 2);

		arrowHeadDirectionVec = viewX.rotatedVec(arrowDirectionVector, -35);
		arrowHeadDirectionUnitVec = [arrowHeadDirectionVec[0]/viewX.mod(arrowHeadDirectionVec), arrowHeadDirectionVec[1]/viewX.mod(arrowHeadDirectionVec)]
		arrowHeadDirectionHeadPoint = [arrowTo[0] + arrowHeadSize*arrowHeadDirectionUnitVec[0], arrowTo[1] + arrowHeadSize*arrowHeadDirectionUnitVec[1]]

		
		arrowstring = arrowstring + 'M' + arrowHeadDirectionHeadPoint[0] + ' ' + arrowHeadDirectionHeadPoint[1] + ' ';
		arrowstring = arrowstring + 'L' + arrowTo[0] + ' ' + arrowTo[1] + ' ';

		arrowHeadDirectionVec = viewX.rotatedVec(arrowDirectionVector, 35);
		arrowHeadDirectionUnitVec = [arrowHeadDirectionVec[0]/viewX.mod(arrowHeadDirectionVec), arrowHeadDirectionVec[1]/viewX.mod(arrowHeadDirectionVec)]
		arrowHeadDirectionHeadPoint = [arrowTo[0] + arrowHeadSize*arrowHeadDirectionUnitVec[0], arrowTo[1] + arrowHeadSize*arrowHeadDirectionUnitVec[1]]


		arrowstring = arrowstring + 'M' + arrowHeadDirectionHeadPoint[0] + ' ' + arrowHeadDirectionHeadPoint[1] + ' ';
		arrowstring = arrowstring + 'L' + arrowTo[0] + ' ' + arrowTo[1] + ' ';
			
		arrowElement.setAttribute('d', arrowstring);

	}
}

viewX.addGraph = function (parentdiv, name, graphData) {
	gdata = {}
	gdata = graphData || {}
	viewX.graphData.objectType[gdata.name] = 'graph'
	gdata.name = name || 'graph' + Math.random().toString()

	if (gdata.axislocationX != 0) {
		gdata.axislocationX = gdata.axislocationX || 0
	}
	else {
		gdata.axislocationX = 0
	}
	if (gdata.axislocationY != 0) {
		gdata.axislocationY = gdata.axislocationY || 0
	}
	else {
		gdata.axislocationY = 0
	}
	if (gdata.xmin != 0) {
		gdata.xmin = gdata.xmin || -1
	}
	else {
		gdata.xmin = 0
	}
	if (gdata.xmax != 0) {
		gdata.xmax = gdata.xmax || -1
	}
	else {
		gdata.xmax = 0
	}
	if (gdata.ymin != 0) {
		gdata.ymin = gdata.ymin || -1
	}
	else {
		gdata.ymin = 0
	}
	if (gdata.ymax != 0) {
		gdata.ymax = gdata.ymax || -1
	}
	else {
		gdata.ymax = 0
	}

	gdata.unitAspectRatio = gdata.unitAspectRatio || 'no'
	gdata.fixAxis = gdata.fixAxis || 'yaxis'
	gdata.fixAxisStretchCentrally = gdata.fixAxisStretchCentrally || 'no'


	gdata.xaxisvisibility = gdata.xaxisvisibility || 'yes'
	gdata.yaxisvisibility = gdata.yaxisvisibility || 'yes'

	gdata.xaxislabelvisibility = gdata.xaxislabelvisibility || 'yes' 
	gdata.yaxislabelvisibility = gdata.yaxislabelvisibility || 'yes'
	
	gdata.xmajorgridlinesvisibility = gdata.xmajorgridlinesvisibility || 'yes'
	gdata.ymajorgridlinesvisibility = gdata.ymajorgridlinesvisibility || 'yes'

	gdata.position = gdata.position || 'absolute'

	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
	svgElement.setAttribute('height',"100%");
	svgElement.setAttribute('width', '100%');
	svgElement.setAttribute('viewBox',"0 0 100 100")
	// svgElement.setAttribute('preserveAspectRatio',"none")
	svgElement.setAttribute('id', name)
	svgElement.style.position = gdata.position
	svgElement.style.left = '0%'
	svgElement.style.top = '0%'
	parentdiv.appendChild(svgElement)
	gdata.svgElement = svgElement
	gdata.parentElement = parentdiv

	gdata.fontSize = gdata.fontSize || 5

	gdata.gridlinenumberX = gdata.gridlinenumberX || 10
	gdata.gridlinenumberY = gdata.gridlinenumberY || 10

	

	gdata.parentW = parentdiv.offsetWidth
	gdata.parentH = parentdiv.offsetHeight

	aratio = parentdiv.offsetWidth/parentdiv.offsetHeight

	if (gdata.unitAspectRatio == 'yes') {
		if (gdata.fixAxis == 'yaxis') {
			if (gdata.fixAxisStretchCentrally == 'yes') {
				centre = (gdata.xmax + gdata.xmin)/2
				gdata.xmin = centre - ((gdata.ymax - gdata.ymin)*aratio/2)
				gdata.xmax = centre + ((gdata.ymax - gdata.ymin)*aratio/2)
			}
			else {
				gdata.xmax = gdata.xmin + (gdata.ymax - gdata.ymin)*aratio
			}
			
		}
		else {
			if (gdata.fixAxisStretchCentrally == 'yes') {
				centre = (gdata.ymax + gdata.ymin)/2
				gdata.ymin = centre - ((gdata.xmax - gdata.xmin)*aratio/2)
				gdata.ymax = centre + ((gdata.xmax - gdata.xmin)*aratio/2)
			}
			else {
				gdata.ymax = gdata.ymin + (gdata.xmax - gdata.xmin)*aratio	
			}
			
		}
	}



	if (viewX.darkmode) {
		gdata.yaxiscolor = gdata.yaxiscolor || 'hsla(0, 100%, 100%, 1)'			
		gdata.xaxiscolor = gdata.xaxiscolor || 'hsla(0, 100%, 100%, 1)'			
		gdata.xmajorgridlabelcolor = gdata.xmajorgridlabelcolor || 'hsla(0, 100%, 100%, 1)'
		gdata.ymajorgridlabelcolor = gdata.ymajorgridlabelcolor || 'hsla(0, 100%, 100%, 1)'
		gdata.xmajorgridcolor = gdata.xmajorgridcolor || 'hsla(0, 100%, 100%, 1)'
		gdata.ymajorgridcolor = gdata.ymajorgridcolor || 'hsla(0, 100%, 100%, 1)'
	}

	gdata.yaxisthickness = gdata.yaxisthickness || 0.5
	gdata.yaxiscolor = gdata.yaxiscolor || 'hsla(0, 50%, 0%, 1)'


	if (gdata.yaxisvisibility == 'yes') {
		var lineElement = document.createElementNS("http://www.w3.org/2000/svg", 'line');
		lineElement.setAttribute('x1', viewX.graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) + '%');
		lineElement.setAttribute('y1', viewX.graphToScaledY(gdata.ymax, gdata.ymin, gdata.ymax, aratio) + '%');
		lineElement.setAttribute('vector-effect','non-scaling-stroke');
		lineElement.setAttribute('x2', viewX.graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) + '%')
		lineElement.setAttribute('y2', viewX.graphToScaledY(gdata.ymin, gdata.ymin, gdata.ymax, aratio) + '%');
		lineElement.setAttribute('id', gdata.name + '-yaxis')
		lineElement.style.stroke = gdata.yaxiscolor
		lineElement.style.strokeWidth = gdata.yaxisthickness + '%';
		gdata.yaxisElement = lineElement
		svgElement.appendChild(lineElement);
	}

	gdata.xaxisthickness = gdata.xaxisthickness || 0.5
	gdata.xaxiscolor = gdata.xaxiscolor || 'hsla(0, 50%, 0%, 1)'

	
	if (gdata.xaxisvisibility == 'yes') {
		var lineElement = document.createElementNS("http://www.w3.org/2000/svg", 'line');
		lineElement.setAttribute('x1', viewX.graphToScaledX(gdata.xmin, gdata.xmin, gdata.xmax, aratio) + '%');
		lineElement.setAttribute('y1', viewX.graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) + '%');
		lineElement.setAttribute('vector-effect','non-scaling-stroke');
		lineElement.setAttribute('x2', viewX.graphToScaledX(gdata.xmax, gdata.xmin, gdata.xmax, aratio) + '%')
		lineElement.setAttribute('y2', viewX.graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) + '%');
		lineElement.setAttribute('id', gdata.name + '-xaxis')
		lineElement.style.stroke = gdata.xaxiscolor
		lineElement.style.strokeWidth = gdata.xaxisthickness + '%';
		gdata.xaxisElement = lineElement
		svgElement.appendChild(lineElement);
	}


	gdata.xmajorgridcolor = gdata.xmajorgridcolor || 'hsla(190, 0%, 50%, 1)'
	gdata.xmajorgridthickness = gdata.xmajorgridthickness || 0.3

	gdata.xmajorgridlinesextension = gdata.xmajorgridlinesextension || 'yes'
	gdata.ymajorgridlinesextension = gdata.ymajorgridlinesextension || 'yes'

	ticks = gdata.gridlinenumberX
	
	if (gdata.xmajorgridlinesvisibility == 'yes') {
		xmajortickvalues = viewX.gridtickvalues(gdata.xmin, gdata.xmax, ticks)
		gdata.xmajorgridElements = []
		for (m = 0; m < xmajortickvalues.length; m++) {
			ticklocation = xmajortickvalues[m]
			var lineElement = document.createElementNS("http://www.w3.org/2000/svg", 'line');
			ylength = (gdata.ymax - gdata.ymin)
			if (gdata.xmajorgridlinesextension == 'yes') {
				lineElement.setAttribute('x1', viewX.graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) + '%');
				lineElement.setAttribute('y1', viewX.graphToScaledY(gdata.ymin - (ylength)/2, gdata.ymin, gdata.ymax, aratio) + '%');
				lineElement.setAttribute('vector-effect','non-scaling-stroke');
				lineElement.setAttribute('x2', viewX.graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) + '%')
				lineElement.setAttribute('y2', viewX.graphToScaledY(gdata.ymax + (ylength)/2, gdata.ymin, gdata.ymax, aratio) + '%');
				
			}
			else {
				lineElement.setAttribute('x1', viewX.graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) + '%');
				lineElement.setAttribute('y1', viewX.graphToScaledY(gdata.ymin, gdata.ymin, gdata.ymax, aratio) + '%');
				lineElement.setAttribute('vector-effect','non-scaling-stroke');
				lineElement.setAttribute('x2', viewX.graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) + '%')
				lineElement.setAttribute('y2', viewX.graphToScaledY(gdata.ymax, gdata.ymin, gdata.ymax, aratio) + '%');
				lineElement.setAttribute('id', gdata.name + '-xmajorgridline-' + m)
			}
			lineElement.setAttribute('id', gdata.name + '-xmajorgridline-' + m)
			lineElement.style.stroke = gdata.xmajorgridcolor
			lineElement.style.strokeWidth = gdata.xmajorgridthickness + '%';
			gdata.xmajorgridElements.push(lineElement)
			svgElement.appendChild(lineElement);
		}
		gdata.xmajorgridticks = xmajortickvalues
	}

	gdata.ymajorgridcolor = gdata.ymajorgridcolor || 'hsla(190, 0%, 50%, 1)'
	gdata.ymajorgridthickness = gdata.ymajorgridthickness || 0.3


	ticks = gdata.gridlinenumberY


	if (gdata.ymajorgridlinesvisibility == 'yes') {
		ymajortickvalues = viewX.gridtickvalues(gdata.ymin, gdata.ymax, ticks)
		gdata.ymajorgridElements = []
		for (m = 0; m < ymajortickvalues.length; m++) {
			ticklocation = ymajortickvalues[m]
			var lineElement = document.createElementNS("http://www.w3.org/2000/svg", 'line');
			xlength = (gdata.xmax - gdata.xmin)
			if (gdata.ymajorgridlinesextension == 'yes') {
				lineElement.setAttribute('x1', viewX.graphToScaledX((gdata.xmin) - xlength/2, gdata.xmin, gdata.xmax, aratio) + '%');
				lineElement.setAttribute('y1', viewX.graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + '%');
				lineElement.setAttribute('vector-effect','non-scaling-stroke');
				lineElement.setAttribute('x2', viewX.graphToScaledX(gdata.xmax + (xlength/2), gdata.xmin, gdata.xmax, aratio) + '%')
				lineElement.setAttribute('y2', viewX.graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + '%');
			}
			else {
				lineElement.setAttribute('x1', viewX.graphToScaledX(gdata.xmin, gdata.xmin, gdata.xmax, aratio) + '%');
				lineElement.setAttribute('y1', viewX.graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + '%');
				lineElement.setAttribute('vector-effect','non-scaling-stroke');
				lineElement.setAttribute('x2', viewX.graphToScaledX(gdata.xmax, gdata.xmin, gdata.xmax, aratio) + '%')
				lineElement.setAttribute('y2', viewX.graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + '%');
			}
			lineElement.setAttribute('id', gdata.name + '-ymajorgridline-' + m)
			lineElement.style.stroke = gdata.ymajorgridcolor
			lineElement.style.strokeWidth = gdata.ymajorgridthickness + '%';
			gdata.ymajorgridElements.push(lineElement)
			svgElement.appendChild(lineElement);
		}
		gdata.ymajorgridticks = ymajortickvalues
	}

	

	gdata.ymajorgridlabelvisibility = gdata.ymajorgridlabelvisibility || 'yes'
	gdata.ymajorgridlabelcolor = gdata.ymajorgridlabelcolor || 'hsla(190, 0%, 50%, 1)'


	gdata.ymajorgridlabelshift = gdata.ymajorgridlabelshift || 0.1
	gdata.xmajorgridlabelshift = gdata.xmajorgridlabelshift || 0.1

	gdata.xmajorgridlabelvisibility = gdata.xmajorgridlabelvisibility || 'yes'
	gdata.xmajorgridlabelcolor = gdata.xmajorgridlabelcolor || 'hsla(190, 0%, 50%, 1)'

	if (viewX.darkmode) {
		gdata.ymajorgridlabelcolor = gdata.ymajorgridlabelcolor || 'hsla(190, 100%, 50%, 1)'
		gdata.xmajorgridlabelcolor = gdata.xmajorgridlabelcolor || 'hsla(190, 100%, 50%, 1)'

	}
	else {
		gdata.ymajorgridlabelcolor = gdata.ymajorgridlabelcolor || 'hsla(190, 0%, 50%, 1)'
		gdata.xmajorgridlabelcolor = gdata.xmajorgridlabelcolor || 'hsla(190, 0%, 50%, 1)'
	}





	gdata.xlabelexclusionsstart = gdata.xlabelexclusionsstart || 0
	gdata.xlabelexclusionsend = gdata.xlabelexclusionsend || 0

	gdata.ylabelexclusionsstart = gdata.ylabelexclusionsstart || 0
	gdata.ylabelexclusionsend = gdata.ylabelexclusionsend || 0


	gdata.isComplexPlane = gdata.isComplexPlane || 'no'

	gdata.ymajorgridlabelOnlyIf = gdata.ymajorgridlabelOnlyIf || 'true'


	if (gdata.ymajorgridlabelvisibility == 'yes') {
		gdata.ymajorlabelsElements = []
		ymajortickvalues = viewX.gridtickvalues(gdata.ymin, gdata.ymax, ticks)
		labelylocationX = gdata.axislocationX
		if (viewX.graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) < 0) {
			labelylocationX = gdata.xmin
		}
		if (viewX.graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) > 100) {
			labelylocationX = gdata.xmax
		}
		for (m = gdata.ylabelexclusionsstart; m < ymajortickvalues.length - gdata.ylabelexclusionsend; m++) {
			ticklocation = ymajortickvalues[m]
			value = ticklocation
			if (eval(gdata.ymajorgridlabelOnlyIf)) {
				var textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
				

				if(viewX.isInt(ticklocation)) {
					if (gdata.isComplexPlane == 'yes') {
						textElement.innerHTML = ticklocation + 'i'
					}
				}
				else {
					expstring = ticklocation.toExponential().toString()
					order = (expstring.slice(expstring
						.indexOf('e') + 1)*(-1))
					if (parseFloat(order) < -1) {
						ticklocation = ticklocation.toExponential(0)	
					}
					else {
						ticklocation = ticklocation.toFixed(2)
					}
					textElement.innerHTML = ticklocation
					if(ticklocation == 0) {
						textElement.innerHTML = 0
					}
					if (gdata.isComplexPlane == 'yes') {
						textElement.innerHTML = ticklocation + 'i'
					}

				}


				textElement.setAttribute('x', viewX.graphToScaledX(labelylocationX, gdata.xmin, gdata.xmax, aratio) + 0.5 + gdata.ymajorgridlabelshift + '%');
				textElement.setAttribute('y',viewX.graphToScaledY(ticklocation, gdata.ymin, gdata.ymax, aratio) + 0.5 + '%');
				textElement.setAttribute('id', gdata.name + '-yticklabel-' + m)
				textElement.style.fontSize = gdata.fontSize
				textElement.style.userSelect = 'none'
				textElement.style.fontFamily = 'Source Sans Pro'
				textElement.style.fill = gdata.ymajorgridlabelcolor
				svgElement.appendChild(textElement);
				gdata.ymajorlabelsElements.push(textElement)
			}
			
		}
	}

	ticks = gdata.gridlinenumberX

	gdata.xmajorgridlabelOnlyIf = gdata.xmajorgridlabelOnlyIf || 'true'


	if (gdata.xmajorgridlabelvisibility == 'yes') {
		gdata.xmajorlabelsElements = []
		xmajortickvalues = viewX.gridtickvalues(gdata.xmin, gdata.xmax, ticks)
		labelxlocationY = gdata.axislocationY
		if (viewX.graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) < 0) {
			labelxlocationY = gdata.ymin
		}
		if (viewX.graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) > 100) {
			labelxlocationY = gdata.ymax
		}


		for (m = gdata.xlabelexclusionsstart; m < xmajortickvalues.length - gdata.xlabelexclusionsend; m++) {
			ticklocation = xmajortickvalues[m]
			value = ticklocation
			if (eval(gdata.xmajorgridlabelOnlyIf)) {
				var textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');

				if(viewX.isInt(ticklocation)) {
					textElement.innerHTML = ticklocation
				}
				else {

					expstring = ticklocation.toExponential().toString()
					order = (expstring.slice(expstring.indexOf('e') + 1)*(-1))
					if (parseFloat(order) < -1) {
						ticklocation = ticklocation.toExponential(0)	
					}
					else {
						ticklocation = ticklocation.toFixed(2)
					}
					textElement.innerHTML = ticklocation
					if(ticklocation == 0) {
						textElement.innerHTML = 0
					}

				}

				textElement.setAttribute('x', viewX.graphToScaledX(ticklocation, gdata.xmin, gdata.xmax, aratio) - 1 + '%');
				textElement.setAttribute('y',viewX.graphToScaledY(labelxlocationY, gdata.ymin, gdata.ymax, aratio) + 2 + gdata.xmajorgridlabelshift + '%');
				textElement.setAttribute('id', gdata.name + '-xticklabel-' + m)
				textElement.style.fontSize = gdata.fontSize
				textElement.style.fontFamily = 'Source Sans Pro'
				textElement.style.userSelect = 'none'
				textElement.style.fill = gdata.xmajorgridlabelcolor

				svgElement.appendChild(textElement);
				
				gdata.xmajorlabelsElements.push(textElement)
			}
			
		}
	}


	gdata.xaxislabel = gdata.xaxislabel || 'x axis'
	gdata.yaxislabel = gdata.yaxislabel || 'y axis'

	gdata.xaxislabelshift = gdata.xaxislabelshift || 2
	gdata.yaxislabelshift = gdata.yaxislabelshift || 2

	if (viewX.darkmode) {
		gdata.yaxislabelcolor = gdata.yaxislabelcolor || 'hsla(190, 100%, 100%, 1)'
		gdata.xaxislabelcolor = gdata.xaxislabelcolor || 'hsla(190, 100%, 100%, 1)'
	}
	else {
		gdata.yaxislabelcolor = gdata.yaxislabelcolor || 'hsla(190, 0%, 0%, 1)'
		gdata.xaxislabelcolor = gdata.xaxislabelcolor || 'hsla(190, 0%, 0%, 1)'
	}
	


	if (gdata.xaxislabelvisibility == 'yes') {
		var textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		textElement.innerHTML = gdata.xaxislabel 
		textElement.setAttribute('x', viewX.graphToScaledX(gdata.xmax, gdata.xmin, gdata.xmax, aratio) + gdata.xaxislabelshift + '%');
		textElement.setAttribute('y',viewX.graphToScaledY(gdata.axislocationY, gdata.ymin, gdata.ymax, aratio) + 1 + '%');
		textElement.setAttribute('id', name + '-xaxislabel')
		textElement.style.fontSize = gdata.fontSize
		textElement.style.color = gdata.xaxislabelcolor
		textElement.style.fontFamily = 'Source Sans Pro'
		
		svgElement.appendChild(textElement);
		gdata.xaxislabelElement = textElement
		
	}


	if (gdata.yaxislabelvisibility == 'yes') {
		var textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		textElement.innerHTML = gdata.yaxislabel 
		textElement.setAttribute('x', viewX.graphToScaledX(gdata.axislocationX, gdata.xmin, gdata.xmax, aratio) + 0 + '%');
		textElement.setAttribute('y',viewX.graphToScaledY(gdata.ymax, gdata.ymin, gdata.ymax, aratio) - gdata.yaxislabelshift + '%');
		textElement.setAttribute('id',name + '-yaxislabel')
		textElement.style.fontSize = gdata.fontSize
		textElement.style.color = gdata.yaxislabelcolor
		textElement.style.fontFamily = 'Source Sans Pro'
		
		svgElement.appendChild(textElement);
		gdata.yaxislabelElement = textElement
		
	}

	gdata.scrollZoom = gdata.scrollZoom || 'yes'

	if (gdata.scrollZoom == 'yes') {
		svgElement.addEventListener('wheel', viewX.wheelHandle(gdata.name))
	}

	viewX.svgPTVariable[name] = svgElement.createSVGPoint()

	gdata.draggability = gdata.draggability || 'no'
	if (gdata.draggability == 'yes') {
		gdata.currentlyDraggableGraph = gdata.currentlyDraggableGraph || 'yes'
	}
	else {
		gdata.currentlyDraggableGraph = gdata.currentlyDraggableGraph || 'no'
	}
	gdata.runFunctionOnDragEnd = gdata.runFunctionOnDragEnd || ''
	gdata.runFunctionDuringDrag = gdata.runFunctionDuringDrag || ''

	if (gdata.draggability == 'yes') {
		svgElement.addEventListener('mousedown', viewX.graphDragHandle(gdata.name))
		svgElement.addEventListener('touchstart', viewX.graphDragHandle(gdata.name))
	}
	// else {
	// 	svgElement.addEventListener('touchmove', viewX.graphTouchDisable)
	// }

	if (gdata.draggability != 'yes' && gdata.scrollZoom != 'yes') {
		svgElement.style.pointerEvents = 'none'
	}

	gdata.dragDirection = gdata.dragDirection || 'bothXY'
	gdata.dragIfCondition = gdata.dragIfCondition || 'true'


	gdata.lineData = {}
	gdata.circleData = {}
	gdata.pointData = {}
	gdata.ellipseData = {}
	gdata.rectData = {}
	gdata.textData = {}
	gdata.pathData = {}
	gdata.sliderData = {}
	gdata.arrowData = {}

	gdata.aspectratio = aratio


	viewX.graphData[name] =  Object.assign({}, gdata);
	return JSON.parse(JSON.stringify(gdata));
}

viewX.updateGraph = function (name, gdata_parametersToUpdate) {

	for (var key in gdata_parametersToUpdate) {
		viewX.graphData[name][key] = gdata_parametersToUpdate[key]
	}

	newZoom = {
		xmin : viewX.graphData[name].xmin,
		xmax : viewX.graphData[name].xmax,
		ymin : viewX.graphData[name].ymin,
		ymax : viewX.graphData[name].ymax
	}
	viewX.updateGraphZoom(name, newZoom)
	
	return viewX.graphData[name];
}

viewX.getGraphCursorLocation = function (cursorpercent, graphname) {
	gdata = viewX.graphData[graphname]

	graphEl = document.getElementById(gdata.name)

	valx = viewX.svgToGraphX(cursorpercent[0], gdata.xmin, gdata.xmax, gdata.aspectratio)
	valy = viewX.svgToGraphY(cursorpercent[1], gdata.ymin, gdata.ymax, gdata.aspectratio)

	return [valx, valy]
}

viewX.addLine = function(graphname, linename, lineoptions) {
	gdata = viewX.graphData[graphname]
	lineoptions = lineoptions || {}

	aratio = gdata.aspectratio
	viewX.graphData.objectType[linename] = 'line'
	lineoptions.x1 = parseFloat(lineoptions.x1.toString() || 0)
	lineoptions.y1 = parseFloat(lineoptions.y1.toString() || 0)
	lineoptions.x2 = parseFloat(lineoptions.x2.toString() || 0.5)
	lineoptions.y2 = parseFloat(lineoptions.y2.toString() || 0.5)
	lineoptions.name = linename || viewX.uid

	if (lineoptions.opacity == undefined) {
		lineoptions.opacity = 1
	}

	lineoptions.strokedasharray = lineoptions.strokedasharray || ""
	lineoptions.strokewidth = lineoptions.strokewidth || 1
	lineoptions.linecolor = lineoptions.linecolor || 'hsla(190, 100%, 50%, 1)'

	var lineElement = document.createElementNS("http://www.w3.org/2000/svg", 'line');
	lineElement.setAttribute('x1', viewX.graphToScaledX(lineoptions.x1, gdata.xmin, gdata.xmax, aratio) + '%');
	lineElement.setAttribute('y1', viewX.graphToScaledY(lineoptions.y1, gdata.ymin, gdata.ymax, aratio) + '%');
	lineElement.setAttribute('x2', viewX.graphToScaledX(lineoptions.x2, gdata.xmin, gdata.xmax, aratio) + '%')
	lineElement.setAttribute('y2', viewX.graphToScaledY(lineoptions.y2, gdata.ymin, gdata.ymax, aratio) + '%');
	lineElement.setAttribute('stroke-dasharray', lineoptions.strokedasharray);
	lineElement.style.opacity = lineoptions.opacity;
	
	lineElement.setAttribute('id', graphname + '-line-' + linename)
	viewX.uid = viewX.uid + 1
	lineElement.setAttribute('vector-effect','non-scaling-stroke');
	lineElement.style.stroke = lineoptions.linecolor
	lineElement.style.strokeWidth = lineoptions.strokewidth + '%';
	gdata.svgElement.appendChild(lineElement);

	viewX.graphData[graphname].lineData[linename] = [lineElement, lineoptions]
	return [lineElement, lineoptions]
}


viewX.updateLine = function(graphname, linename, linevalues) {

	gdata = viewX.graphData[graphname]
	aratio = gdata.aspectratio
	lineoptions = gdata.lineData[linename][1]
	lineElement = gdata.lineData[linename][0]
	
	if (linevalues.x1 != 0) {
		lineoptions.x1 = linevalues.x1 || lineoptions.x1	
	}
	else {
		lineoptions.x1 = linevalues.x1
	}


	if (linevalues.y1 != 0) {
		lineoptions.y1 = linevalues.y1 || lineoptions.y1	
	}
	else {
		lineoptions.y1 = linevalues.y1
	}


	if (linevalues.x2 != 0) {
		lineoptions.x2 = linevalues.x2 || lineoptions.x2	
	}
	else {
		lineoptions.x2 = linevalues.x2
	}


	if (linevalues.y2 != 0) {
		lineoptions.y2 = linevalues.y2 || lineoptions.y2	
	}
	else {
		lineoptions.y2 = linevalues.y2
	}

	lineoptions.strokedasharray = linevalues.strokedasharray || lineoptions.strokedasharray
	lineoptions.strokewidth = linevalues.strokewidth || lineoptions.strokewidth
	lineoptions.linecolor = linevalues.linecolor || lineoptions.linecolor

	if (linevalues.opacity !== undefined) {
		lineoptions.opacity = linevalues.opacity
	}

	lineElement.setAttribute('x1', viewX.graphToScaledX(lineoptions.x1, gdata.xmin, gdata.xmax, aratio) + '%');
	lineElement.setAttribute('y1', viewX.graphToScaledY(lineoptions.y1, gdata.ymin, gdata.ymax, aratio) + '%');
	lineElement.setAttribute('x2', viewX.graphToScaledX(lineoptions.x2, gdata.xmin, gdata.xmax, aratio) + '%')
	lineElement.setAttribute('y2', viewX.graphToScaledY(lineoptions.y2, gdata.ymin, gdata.ymax, aratio) + '%');

	lineElement.setAttribute('stroke-dasharray', lineoptions.strokedasharray);
	lineElement.style.opacity = lineoptions.opacity;
	lineElement.style.stroke = lineoptions.linecolor
	lineElement.style.strokeWidth = lineoptions.strokewidth + '%';
	
	viewX.graphData[graphname].lineData[linename] = [lineElement, lineoptions]
}


viewX.addSlider = function(graphname, slidername, slideroptions) {
	gdata = viewX.graphData[graphname]
	slideroptions = slideroptions || {}
	viewX.graphData.objectType[slidername] = 'slider'
	aratio = gdata.aspectratio

	slideroptions.x1 = parseFloat(slideroptions.x1.toString() || 0)
	slideroptions.y1 = parseFloat(slideroptions.y1.toString() || 0)
	slideroptions.x2 = parseFloat(slideroptions.x2.toString() || 0.5)
	slideroptions.y2 = parseFloat(slideroptions.y2.toString() || 0.5)
	slideroptions.name = slidername || viewX.uid

	slideroptions.automaticallySetKnobRadius

	slideroptions.currentvalue = parseFloat(slideroptions.currentvalue.toString() || 0.5)
	slideroptions.maxvalue = parseFloat(slideroptions.maxvalue.toString() || 0.5)
	slideroptions.minvalue = parseFloat(slideroptions.minvalue.toString() || 0.5)

	slideroptions.strokewidth = slideroptions.strokewidth || 1
	slideroptions.sliderfillcolor = slideroptions.sliderfillcolor || 'hsla(190, 100%, 50%, 1)'
	slideroptions.sliderbasecolor = slideroptions.sliderbasecolor || 'hsla(190, 0%, 70%, 1)'
	slideroptions.sliderknobcolor = slideroptions.sliderknobcolor || 'hsla(190, 100%, 50%, 1)'

	slideroptions.knobradius = parseFloat(slideroptions.knobradius || 0.5)

	kfactor = (slideroptions.currentvalue - slideroptions.minvalue)/(slideroptions.maxvalue - slideroptions.minvalue)

	slideroptions.cx = ((slideroptions.x2*kfactor) + slideroptions.x1)/(kfactor + 1)
	slideroptions.cy = ((slideroptions.y2*kfactor) + slideroptions.y1)/(kfactor + 1)

	slideroptions.cx = parseFloat(slideroptions.cx.toString() || 0)
	slideroptions.cy = parseFloat(slideroptions.cy.toString() || 0)

	var sliderbaseElement = document.createElementNS("http://www.w3.org/2000/svg", 'line');
	sliderbaseElement.setAttribute('x1', viewX.graphToScaledX(slideroptions.x1, gdata.xmin, gdata.xmax, aratio) + '%');
	sliderbaseElement.setAttribute('y1', viewX.graphToScaledY(slideroptions.y1, gdata.ymin, gdata.ymax, aratio) + '%');
	sliderbaseElement.setAttribute('x2', viewX.graphToScaledX(slideroptions.x2, gdata.xmin, gdata.xmax, aratio) + '%')
	sliderbaseElement.setAttribute('y2', viewX.graphToScaledY(slideroptions.y2, gdata.ymin, gdata.ymax, aratio) + '%');
	
	sliderbaseElement.setAttribute('id', graphname + '-slider-base-' + slidername)
	sliderbaseElement.setAttribute('vector-effect','non-scaling-stroke');
	sliderbaseElement.style.stroke = slideroptions.sliderbasecolor
	sliderbaseElement.style.strokeWidth = slideroptions.strokewidth + '%';
	gdata.svgElement.appendChild(sliderbaseElement);

	var sliderfillElement = document.createElementNS("http://www.w3.org/2000/svg", 'line');
	sliderfillElement.setAttribute('x1', viewX.graphToScaledX(slideroptions.x1, gdata.xmin, gdata.xmax, aratio) + '%');
	sliderfillElement.setAttribute('y1', viewX.graphToScaledY(slideroptions.y1, gdata.ymin, gdata.ymax, aratio) + '%');
	sliderfillElement.setAttribute('x2', viewX.graphToScaledX(slideroptions.cx, gdata.xmin, gdata.xmax, aratio) + '%')
	sliderfillElement.setAttribute('y2', viewX.graphToScaledY(slideroptions.cy, gdata.ymin, gdata.ymax, aratio) + '%');
	
	sliderfillElement.setAttribute('id', graphname + '-slider-fill-' + slidername)
	sliderfillElement.setAttribute('vector-effect','non-scaling-stroke');
	sliderfillElement.style.stroke = slideroptions.sliderfillcolor
	sliderfillElement.style.strokeWidth = slideroptions.strokewidth + '%';
	gdata.svgElement.appendChild(sliderfillElement);

	rx = viewX.distanceBTWgraphToSvg([0,0],[slideroptions.knobradius, 0], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
	ry = viewX.distanceBTWgraphToSvg([0,0],[0, slideroptions.knobradius], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)

	slideroptions.automaticallySetKnobRadius = slideroptions.automaticallySetKnobRadius || 'yes'

	if (slideroptions.automaticallySetKnobRadius == 'yes') {
		// Adjusted based on certain calculations at https://www.desmos.com/calculator/wocvdzcn1p 
		aRegress = -1.2979*Math.pow(10, -9);
		bRegress = -9.8036
		cRegress = -0.0337978
		fRegress = 10.1808

		strokeW = options.strokewidth
		if (strokeW < 25) {
			rx = ((aRegress*strokeW) + bRegress)*(Math.exp(cRegress*strokeW)) + fRegress
			ry = rx
		}
		else {
			rx = 0.2217*strokeW + 0.736503
			ry = rx
		}
	}

		
	
	var circleElement = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
	circleElement.setAttribute('cx', viewX.graphToScaledX(slideroptions.cx, gdata.xmin, gdata.xmax, aratio) + '%');
	circleElement.setAttribute('cy', viewX.graphToScaledY(slideroptions.cy, gdata.ymin, gdata.ymax, aratio) + '%');
	circleElement.setAttribute('rx', rx + '%')
	circleElement.setAttribute('ry', ry + '%');
	circleElement.setAttribute('id', graphname + '-slider-knob-' + slidername)
	viewX.uid = viewX.uid + 1
	circleElement.setAttribute('vector-effect','non-scaling-stroke');
	circleElement.style.fill = slideroptions.sliderknobcolor
	circleElement.style.strokeWidth = '0%';
	gdata.svgElement.appendChild(circleElement);

	viewX.graphData[graphname].sliderData[slidername] = [sliderbaseElement,sliderfillElement, circleElement, slideroptions]
	return [sliderbaseElement,sliderfillElement, circleElement, slideroptions]
}

viewX.sliderDivData = {}

viewX.addSliderToDiv = function(holderName, slidername, slideroptions) {
	slideroptions = slideroptions || {}

	slideroptions.classname = slideroptions.classname || 'standardSlider'

	var sliderinputElement = document.createElement("input");
	sliderinputElement.type = 'range';
	sliderinputElement.setAttribute('min', slideroptions.min);
	sliderinputElement.setAttribute('max', slideroptions.max);
	sliderinputElement.setAttribute('step', slideroptions.step);
	sliderinputElement.setAttribute('value', slideroptions.value);
	sliderinputElement.setAttribute('id', slidername);
	sliderinputElement.setAttribute('class', slideroptions.classname);
	sliderinputElement.setAttribute('oninput', slideroptions.eventFunction);

	holderDiv = document.getElementById(holderName)

	holderDiv.appendChild(sliderinputElement);

	sliderinputElement.style.width = slideroptions.w;
	sliderinputElement.style.height = slideroptions.h;
	sliderinputElement.style.backgroundColor = slideroptions.sliderbasecolor

	viewX.sliderDivData[slidername] = [holderDiv, slidername, slideroptions]
	return [slidername, holderDiv]
}

viewX.divSlider = function(holder, divslidername, minval, maxval, currvalue, stepval, eventfunc, widthval, heightval, sliderTrackColor, thumbSize, thumbColor) {
	options = {}
	options.min = minval
	options.max = maxval
	options.value = currvalue
	options.step = stepval
	options.eventFunction = eventfunc
	options.w = widthval
	options.h = heightval
	options.sliderbasecolor = sliderTrackColor
	// options.classname = sliderClass


	$('<style>#' + divslidername + '::-webkit-slider-thumb {-webkit-appearance: none; appearance: none;width: ' + thumbSize + ';height: ' + thumbSize + ';border-radius: 50%; background: ' + thumbColor + ';cursor: pointer; }  #' + divslidername + '::-moz-slider-thumb {appearance: none;width: ' + thumbSize + ';height: ' + thumbSize + ';border-radius: 50%; background: ' + thumbColor + ';cursor: pointer; }</style>').appendTo('head');

	viewX.addSliderToDiv(holder, divslidername, options)
}

// GPT 3.5

viewX.generateSliderStyles = function(sliderProperties, elementId) {
	var css = "";

      css += "#" + elementId + " {";
      css += "min-width: " + sliderProperties.minwidth + ";";
	  css += "width: " + sliderProperties.width + ";";
      css += "height: " + sliderProperties.height + "px;";
      css += "background: " + sliderProperties.trackColor + ";";
      css += "opacity: " + sliderProperties.opacity + ";";
      css += "transition: opacity 0.2s;";
	  css += "border-radius: 15px;";
      css += "}";
	  

      css += "#" + elementId + "::-webkit-slider-thumb {";
      css += "-webkit-appearance: none !important;";
      css += "appearance: none !important;";
      css += "width: " + sliderProperties.thumbWidth + "px;";
      css += "height: " + sliderProperties.thumbHeight + "px;";
      css += "background: " + sliderProperties.thumbColor + ";";
      css += "cursor: pointer;";
      css += "border-radius: 50%;";
	  css += "border: none;";
      css += "margin-top: -" + (sliderProperties.thumbHeight / 2 - sliderProperties.height / 2) + "px;";
      css += "}";

      css += "#" + elementId + "::-webkit-slider-runnable-track {";
      css += "height: " + sliderProperties.height + "px;";
	  css += "border-radius: 12px;";
      css += "background: " + sliderProperties.trackColor + ";";
      css += "}";

      css += "#" + elementId + "::-moz-range-thumb {";
      css += "width: " + sliderProperties.thumbWidth + "px;";
      css += "height: " + sliderProperties.thumbHeight + "px;";
      css += "background: " + sliderProperties.thumbColor + ";";
      css += "cursor: pointer;";
      css += "border-radius: 50%;";
	  css += "border: none;";
      css += "margin-top: -" + (sliderProperties.thumbHeight / 2 - sliderProperties.height / 2) + "px;";
      css += "}";

      css += "#" + elementId + "::-moz-range-progress {";
      css += "height: " + sliderProperties.height + "px;";
      css += "background-color: " + sliderProperties.trackFillColor + ";";
      css += "}";

      css += "#" + elementId + "::-moz-range-track {";
      css += "height: " + sliderProperties.height + "px;";
      css += "background: " + sliderProperties.trackColor + ";";
      css += "}";

      css += "#" + elementId + "::-ms-thumb {";
      css += "width: " + sliderProperties.thumbWidth + "px;";
      css += "height: " + sliderProperties.thumbHeight + "px;";
      css += "background: " + sliderProperties.thumbColor + ";";
      css += "cursor: pointer;";
      css += "border-radius: 50%;";
      css += "margin-top: 0;";
      css += "}";

      css += "#" + elementId + "::-ms-fill-lower {";
      css += "background: " + sliderProperties.trackFillColor + ";";
      css += "}";

      css += "#" + elementId + "::-ms-fill-upper {";
      css += "background: " + sliderProperties.trackColor + ";";
      css += "}";

      css += "#" + elementId + "::-ms-tooltip {";
      css += "display: none;";
      css += "}";


	var styleElement = document.createElement("style");
	styleElement.innerHTML = css;
    styleElement.style.setProperty('--track-fill-color-for-' + elementId, sliderProperties.trackFillColor);

	document.head.appendChild(styleElement);
}

viewX.addPath = function(graphname, pathname, pathoptions) {
	gdata = viewX.graphData[graphname]
	pathoptions = pathoptions || {}
	viewX.graphData.objectType[pathname] = 'path'
	aratio = gdata.aspectratio

	pathoptions.points = pathoptions.points || [[0, 1], [1, 0]]


	pathstring = 'M'

	for (pth = 0; pth < pathoptions.points.length; pth++) {
		if (pth == 0) {
			pathstring = pathstring + viewX.graphToScaledX(pathoptions.points[pth][0], gdata.xmin, gdata.xmax, aratio) + ' ' + viewX.graphToScaledY(pathoptions.points[pth][1], gdata.ymin, gdata.ymax, aratio) + ' '
		}
		else {
			pathstring = pathstring + 'L' + viewX.graphToScaledX(pathoptions.points[pth][0], gdata.xmin, gdata.xmax, aratio) + ' ' + viewX.graphToScaledY(pathoptions.points[pth][1], gdata.ymin, gdata.ymax, aratio) + ' '
		}
		
	}

	pathoptions.name = pathname || viewX.uid

	pathoptions.strokewidth = pathoptions.strokewidth || 1
	pathoptions.pathcolor = pathoptions.pathcolor || 'hsla(190, 100%, 50%, 1)'
	pathoptions.pathfillcolor = pathoptions.pathfillcolor || 'none'
	pathoptions.strokedasharray = pathoptions.strokedasharray || ''
	if (pathoptions.opacity == undefined) {
		pathoptions.opacity = 1
	}

	var pathElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
	try {
		pathElement.setAttribute('d', pathstring);
		pathElement.setAttribute('id', graphname + '-path-' + pathname)
		pathElement.setAttribute('stroke-dasharray', pathoptions.strokedasharray);
		pathElement.style.opacity = pathoptions.opacity;
		viewX.uid = viewX.uid + 1
		pathElement.style.stroke = pathoptions.pathcolor
		pathElement.style.fill = pathoptions.pathfillcolor;
		pathElement.style.strokeWidth = pathoptions.strokewidth + '%';
		
		gdata.svgElement.appendChild(pathElement);

		viewX.graphData[graphname].pathData[pathname] = [pathElement, pathoptions]
		return [pathElement, pathoptions]
	}
	catch (err){
		console.log("Could plot path points.", pathoptions.points)
	}
		
}

viewX.addArrow = function(graphname, arrowname, arrowoptions) {
	gdata = viewX.graphData[graphname]
	arrowoptions = arrowoptions || {}
	viewX.graphData.objectType[arrowname] = 'arrow'

	aratio = gdata.aspectratio

	arrowoptions.strokewidth = arrowoptions.strokewidth || 0.4

	arrowoptions.from = arrowoptions.from || [0, 0];
	arrowoptions.to = arrowoptions.to || [1, 1];

	arrowFrom = [viewX.graphToScaledX(arrowoptions.from[0], gdata.xmin, gdata.xmax, aratio), viewX.graphToScaledY(arrowoptions.from[1], gdata.ymin, gdata.ymax, aratio)]
	arrowTo = [viewX.graphToScaledX(arrowoptions.to[0], gdata.xmin, gdata.xmax, aratio), viewX.graphToScaledY(arrowoptions.to[1], gdata.ymin, gdata.ymax, aratio)]

	arrowstring = 'M'
	arrowstring = arrowstring + arrowFrom[0] + ' ' + arrowFrom[1] + ' ';
	arrowstring = arrowstring + 'L' + arrowTo[0] + ' ' + arrowTo[1] + ' ';

	arrowDirectionVector = viewX.directionVec(arrowTo, arrowFrom);
	arrowHeadSize = Math.max(3*arrowoptions.strokewidth, 2);

	arrowHeadDirectionVec = viewX.rotatedVec(arrowDirectionVector, -35);
	arrowHeadDirectionUnitVec = [arrowHeadDirectionVec[0]/viewX.mod(arrowHeadDirectionVec), arrowHeadDirectionVec[1]/viewX.mod(arrowHeadDirectionVec)]
	arrowHeadDirectionHeadPoint = [arrowTo[0] + arrowHeadSize*arrowHeadDirectionUnitVec[0], arrowTo[1] + arrowHeadSize*arrowHeadDirectionUnitVec[1]]

	
	arrowstring = arrowstring + 'M' + arrowHeadDirectionHeadPoint[0] + ' ' + arrowHeadDirectionHeadPoint[1] + ' ';
	arrowstring = arrowstring + 'L' + arrowTo[0] + ' ' + arrowTo[1] + ' ';

	arrowHeadDirectionVec = viewX.rotatedVec(arrowDirectionVector, 35);
	arrowHeadDirectionUnitVec = [arrowHeadDirectionVec[0]/viewX.mod(arrowHeadDirectionVec), arrowHeadDirectionVec[1]/viewX.mod(arrowHeadDirectionVec)]
	arrowHeadDirectionHeadPoint = [arrowTo[0] + arrowHeadSize*arrowHeadDirectionUnitVec[0], arrowTo[1] + arrowHeadSize*arrowHeadDirectionUnitVec[1]]


	arrowstring = arrowstring + 'M' + arrowHeadDirectionHeadPoint[0] + ' ' + arrowHeadDirectionHeadPoint[1] + ' ';
	arrowstring = arrowstring + 'L' + arrowTo[0] + ' ' + arrowTo[1] + ' ';
	

	arrowoptions.name = arrowname || viewX.uid;
	arrowoptions.arrowcolor = arrowoptions.arrowcolor || 'hsla(0, 0%, 0%, 1)';

	arrowoptions.strokedasharray = arrowoptions.strokedasharray || ''

	if (arrowoptions.opacity == undefined) {
		arrowoptions.opacity = 1
	}

	var arrowElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
	try {
		arrowElement.setAttribute('d', arrowstring);
		arrowElement.setAttribute('id', graphname + '-arrow-' + arrowname);
		viewX.uid = viewX.uid + 1;
		arrowElement.style.stroke = arrowoptions.arrowcolor;
		arrowElement.style.fill = 'none';
		arrowElement.style.strokeWidth = arrowoptions.strokewidth + '%';
		arrowElement.setAttribute('stroke-dasharray', arrowoptions.strokedasharray);
		arrowElement.style.opacity = arrowoptions.opacity;
		gdata.svgElement.appendChild(arrowElement);
		

		viewX.graphData[graphname].arrowData[arrowname] = [arrowElement, arrowoptions]
		return [arrowElement, arrowoptions]
	}
	catch (err){
		console.log("Could plot arrow points.", arrowoptions.points)
	}
		
}


viewX.updateArrow = function(graphname, arrowname, newarrowoptions) {

	gdata = viewX.graphData[graphname]
	aratio = gdata.aspectratio;

	arrowoptions = gdata.arrowData[arrowname][1]
	arrowElement = gdata.arrowData[arrowname][0]

	arrowoptions.points = newarrowoptions.points || arrowoptions.points

	arrowoptions.strokewidth = newarrowoptions.strokewidth || arrowoptions.strokewidth

	arrowoptions.from = newarrowoptions.from || arrowoptions.from;
	arrowoptions.to = newarrowoptions.to || arrowoptions.to;
	arrowoptions.strokedasharray = newarrowoptions.strokedasharray || arrowoptions.strokedasharray;
	if (newarrowoptions.opacity !== undefined) {
		arrowoptions.opacity = newarrowoptions.opacity
	}


	arrowFrom = [viewX.graphToScaledX(arrowoptions.from[0], gdata.xmin, gdata.xmax, aratio), viewX.graphToScaledY(arrowoptions.from[1], gdata.ymin, gdata.ymax, aratio)]
	arrowTo = [viewX.graphToScaledX(arrowoptions.to[0], gdata.xmin, gdata.xmax, aratio), viewX.graphToScaledY(arrowoptions.to[1], gdata.ymin, gdata.ymax, aratio)]

	arrowstring = 'M'
	arrowstring = arrowstring + arrowFrom[0] + ' ' + arrowFrom[1] + ' ';
	arrowstring = arrowstring + 'L' + arrowTo[0] + ' ' + arrowTo[1] + ' ';

	arrowDirectionVector = viewX.directionVec(arrowTo, arrowFrom);
	arrowHeadSize = Math.max(3*arrowoptions.strokewidth, 2);

	arrowHeadDirectionVec = viewX.rotatedVec(arrowDirectionVector, -35);
	arrowHeadDirectionUnitVec = [arrowHeadDirectionVec[0]/viewX.mod(arrowHeadDirectionVec), arrowHeadDirectionVec[1]/viewX.mod(arrowHeadDirectionVec)]
	arrowHeadDirectionHeadPoint = [arrowTo[0] + arrowHeadSize*arrowHeadDirectionUnitVec[0], arrowTo[1] + arrowHeadSize*arrowHeadDirectionUnitVec[1]]

	
	arrowstring = arrowstring + 'M' + arrowHeadDirectionHeadPoint[0] + ' ' + arrowHeadDirectionHeadPoint[1] + ' ';
	arrowstring = arrowstring + 'L' + arrowTo[0] + ' ' + arrowTo[1] + ' ';

	arrowHeadDirectionVec = viewX.rotatedVec(arrowDirectionVector, 35);
	arrowHeadDirectionUnitVec = [arrowHeadDirectionVec[0]/viewX.mod(arrowHeadDirectionVec), arrowHeadDirectionVec[1]/viewX.mod(arrowHeadDirectionVec)]
	arrowHeadDirectionHeadPoint = [arrowTo[0] + arrowHeadSize*arrowHeadDirectionUnitVec[0], arrowTo[1] + arrowHeadSize*arrowHeadDirectionUnitVec[1]]


	arrowstring = arrowstring + 'M' + arrowHeadDirectionHeadPoint[0] + ' ' + arrowHeadDirectionHeadPoint[1] + ' ';
	arrowstring = arrowstring + 'L' + arrowTo[0] + ' ' + arrowTo[1] + ' ';


	try {
		arrowElement.setAttribute('d', arrowstring);
		arrowoptions.arrowcolor = newarrowoptions.arrowcolor || arrowoptions.arrowcolor

		arrowElement.style.stroke = arrowoptions.arrowcolor
		arrowElement.style.fill = 'none'
		arrowElement.style.strokeWidth = arrowoptions.strokewidth + '%';
		arrowElement.setAttribute('stroke-dasharray', arrowoptions.strokedasharray);
		arrowElement.style.opacity = arrowoptions.opacity;
		viewX.graphData[graphname].arrowData[arrowname] = [arrowElement, arrowoptions]
	}

	catch (err){
		console.log("Arrow points Error", newarrowoptions.points)
	}
		
}

viewX.updatePath = function(graphname, pathname, newpathoptions) {	

	gdata = viewX.graphData[graphname]
	aratio = gdata.aspectratio

	pathoptions = gdata.pathData[pathname][1]
	pathElement = gdata.pathData[pathname][0]



	pathoptions.points = newpathoptions.points || pathoptions.points

	

	pathstring = 'M'

	for (pth = 0; pth < pathoptions.points.length; pth++) {
		if (pth == 0) {
			pathstring = pathstring + viewX.graphToScaledX(pathoptions.points[pth][0], gdata.xmin, gdata.xmax, aratio) + ' ' + viewX.graphToScaledY(pathoptions.points[pth][1], gdata.ymin, gdata.ymax, aratio) + ' '
		}
		else {
			pathstring = pathstring + 'L' + viewX.graphToScaledX(pathoptions.points[pth][0], gdata.xmin, gdata.xmax, aratio) + ' ' + viewX.graphToScaledY(pathoptions.points[pth][1], gdata.ymin, gdata.ymax, aratio) + ' '
		}
		
	}


	try {
		pathElement.setAttribute('d', pathstring);
		pathoptions.strokewidth = newpathoptions.strokewidth || pathoptions.strokewidth
		pathoptions.pathcolor = newpathoptions.pathcolor || pathoptions.pathcolor
		pathoptions.pathfillcolor = newpathoptions.pathfillcolor || pathoptions.pathfillcolor
		pathoptions.strokedasharray = newpathoptions.strokedasharray || pathoptions.strokedasharray

		if (newpathoptions.opacity !== undefined) {
			pathoptions.opacity = newpathoptions.opacity
		}

		pathElement.style.stroke = pathoptions.pathcolor
		pathElement.style.fill = pathoptions.pathfillcolor
		pathElement.style.strokeWidth = pathoptions.strokewidth + '%';
		pathElement.setAttribute('stroke-dasharray', pathoptions.strokedasharray);
		pathElement.style.opacity = pathoptions.opacity;
		
		viewX.graphData[graphname].pathData[pathname] = [pathElement, pathoptions]
		return [pathElement, pathoptions]
	}

	catch (err){
		console.log("Path points Error", newpathoptions.points)
	}
		
}

viewX.updatePathPoints = function(graphname, pathname, npathpoints) {
	gdata = viewX.graphData[graphname]
	aratio = gdata.aspectratio

	pathoptions = gdata.pathData[pathname][1]
	pathElement = gdata.pathData[pathname][0]

	pathoptions.points = npathpoints || pathoptions.points

	if (pathoptions.points.length > 0) {
		pathstring = 'M'

		for (pth = 0; pth < pathoptions.points.length; pth++) {
			if (pth == 0) {
				pathstring = pathstring + viewX.graphToScaledX(pathoptions.points[pth][0], gdata.xmin, gdata.xmax, aratio) + ' ' + viewX.graphToScaledY(pathoptions.points[pth][1], gdata.ymin, gdata.ymax, aratio) + ' '
			}
			else {
				pathstring = pathstring + 'L' + viewX.graphToScaledX(pathoptions.points[pth][0], gdata.xmin, gdata.xmax, aratio) + ' ' + viewX.graphToScaledY(pathoptions.points[pth][1], gdata.ymin, gdata.ymax, aratio) + ' '
			}
			
		}

		try {
			pathElement.setAttribute('d', pathstring);
			viewX.graphData[graphname].pathData[pathname] = [pathElement, pathoptions]
			return [pathElement, pathoptions]
		}
		catch (err){
			console.log(npathpoints)
		}
	}
	
}

viewX.distanceBTWgraphToSvg = function(p1, p2, xmin, xmax, ymin, ymax, aspectratio) {
	pt1 = [viewX.graphToScaledX(p1[0], xmin, xmax, aspectratio), viewX.graphToScaledY(p1[1], ymin, ymax, aspectratio)]
	pt2 = [viewX.graphToScaledX(p2[0], xmin, xmax, aspectratio), viewX.graphToScaledY(p2[1], ymin, ymax, aspectratio)]

	return Math.pow(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2), 0.5)
}

viewX.addCircle = function(graphname, circlename, circleoptions) {
	gdata = viewX.graphData[graphname]
	circleoptions = circleoptions || {}
	viewX.graphData.objectType[circlename] = 'circle'
	aratio = gdata.aspectratio

	if (circleoptions.x != 0) {
		circleoptions.x = circleoptions.x || 0.3
	}
	else {
		circleoptions.x = 0
	}

	if (circleoptions.y != 0) {
		circleoptions.y = circleoptions.y || 0.3
	}
	else {
		circleoptions.y = 0
	}

	if (circleoptions.radius != 0) {
		circleoptions.radius = circleoptions.radius || 0.3
	}
	else {
		circleoptions.radius = 0
	}

	circleoptions.name = circlename || viewX.uid

	circleoptions.stroke = circleoptions.stroke || 'hsla(190, 100%, 50%, 0.5)'
	circleoptions.strokewidth = circleoptions.strokewidth || 0.1
	
	circleoptions.circlecolor = circleoptions.circlecolor || 'hsla(190, 100%, 50%, 1)'
	circleoptions.strokedasharray = circleoptions.strokedasharray || ''
	if (circleoptions.opacity == undefined) {
		circleoptions.opacity = 1
	}

	rx = viewX.distanceBTWgraphToSvg([0,0],[circleoptions.radius, 0], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
	ry = viewX.distanceBTWgraphToSvg([0,0],[0, circleoptions.radius], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
	
	var circleElement = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
	circleElement.setAttribute('cx', viewX.graphToScaledX(circleoptions.x, gdata.xmin, gdata.xmax, aratio) + '%');
	circleElement.setAttribute('cy', viewX.graphToScaledY(circleoptions.y, gdata.ymin, gdata.ymax, aratio) + '%');
	circleElement.setAttribute('rx', rx + '%')
	circleElement.setAttribute('ry', ry + '%');
	circleElement.setAttribute('id', graphname + '-circle-' + circlename)
	viewX.uid = viewX.uid + 1
	circleElement.setAttribute('vector-effect','non-scaling-stroke');
	
	circleElement.style.opacity = circleoptions.opacity;


	circleElement.style.fill = circleoptions.circlecolor
	circleElement.style.strokeWidth = circleoptions.strokewidth + '%';
	circleElement.style.stroke = circleoptions.stroke;
	circleElement.setAttribute('stroke-dasharray', circleoptions.strokedasharray);
	gdata.svgElement.appendChild(circleElement);

	viewX.graphData[graphname].circleData[circlename] = [circleElement, circleoptions]
	return [circleElement, circleoptions]
}

viewX.updateCircle = function(graphname, circlename, circlenewvalues) {

	gdata = viewX.graphData[graphname]
	aratio = gdata.aspectratio

	circleoptions = gdata.circleData[circlename][1]
	circleElement = gdata.circleData[circlename][0]


	if (circleoptions.x != 0) {
		circleoptions.x = circlenewvalues.x || circleoptions.x
	}
	else {
		circleoptions.x = circlenewvalues.x
	}

	if (circleoptions.y != 0) {
		circleoptions.y = circlenewvalues.y || circleoptions.y
	}
	else {
		circleoptions.y = circlenewvalues.y
	}

	if (circleoptions.radius != 0) {
		circleoptions.radius = circlenewvalues.radius || circleoptions.radius
	}
	else {
		circleoptions.radius = circlenewvalues.radius
	}

	circleoptions.name = circlename || viewX.uid

	circleoptions.stroke = circlenewvalues.stroke || circleoptions.stroke
	circleoptions.strokewidth = circlenewvalues.strokewidth || circleoptions.strokewidth
	
	circleoptions.circlecolor = circlenewvalues.circlecolor || circleoptions.circlecolor
	circleoptions.strokedasharray = circlenewvalues.strokedasharray || circleoptions.strokedasharray
	if (circlenewvalues.opacity !== undefined) {
		circleoptions.opacity = circlenewvalues.opacity
	}

	rx = viewX.distanceBTWgraphToSvg([0,0],[circleoptions.radius, 0], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
	ry = viewX.distanceBTWgraphToSvg([0,0],[0, circleoptions.radius], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
	
	circleElement.setAttribute('cx', viewX.graphToScaledX(circleoptions.x, gdata.xmin, gdata.xmax, aratio) + '%');
	circleElement.setAttribute('cy', viewX.graphToScaledY(circleoptions.y, gdata.ymin, gdata.ymax, aratio) + '%');
	circleElement.setAttribute('rx', rx + '%')
	circleElement.setAttribute('ry', ry + '%');
	circleElement.setAttribute('id', graphname + '-circle-' + circlename)
	viewX.uid = viewX.uid + 1
	circleElement.setAttribute('vector-effect','non-scaling-stroke');
	circleElement.style.fill = circleoptions.circlecolor
	circleElement.style.strokeWidth = circleoptions.strokewidth + '%';
	circleElement.style.stroke = circleoptions.stroke;
	circleElement.setAttribute('stroke-dasharray', circleoptions.strokedasharray);
	circleElement.style.opacity = circleoptions.opacity;
	
	viewX.graphData[graphname].circleData[circlename] = [circleElement, circleoptions]
}

viewX.addEllipse = function(graphname, ellipsename, ellipseoptions) {
	gdata = viewX.graphData[graphname]

	aratio = gdata.aspectratio

	ellipseoptions = ellipseoptions || {}
	viewX.graphData.objectType[ellipsename] = 'ellipse'

	ellipseoptions.x = parseFloat(ellipseoptions.x.toString() || 0)
	ellipseoptions.y = parseFloat(ellipseoptions.y.toString() || 0)
	ellipseoptions.rx = parseFloat(ellipseoptions.rx.toString() || 0.3)
	ellipseoptions.ry = parseFloat(ellipseoptions.ry.toString() || 8)
	ellipseoptions.name = ellipsename || viewX.uid

	ellipseoptions.stroke = ellipseoptions.stroke || 'hsla(190, 100%, 50%, 0.5)'
	ellipseoptions.strokewidth = ellipseoptions.strokewidth || 0.1
	
	ellipseoptions.ellipsecolor = ellipseoptions.ellipsecolor || 'hsla(190, 100%, 50%, 1)'
	ellipseoptions.strokedasharray = ellipseoptions.strokedasharray || ''

	if (ellipseoptions.opacity == undefined) {
		ellipseoptions.opacity = 1
	}

	rx = viewX.distanceBTWgraphToSvg([0,0],[ellipseoptions.rx, 0], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
	ry = viewX.distanceBTWgraphToSvg([0,0],[0, ellipseoptions.ry], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
	
	var ellipseElement = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
	ellipseElement.setAttribute('cx', viewX.graphToScaledX(ellipseoptions.x, gdata.xmin, gdata.xmax, aratio) + '%');
	ellipseElement.setAttribute('cy', viewX.graphToScaledY(ellipseoptions.y, gdata.ymin, gdata.ymax, aratio) + '%');
	ellipseElement.setAttribute('rx', rx + '%')
	ellipseElement.setAttribute('ry', ry + '%');
	ellipseElement.setAttribute('id', graphname + '-ellipse-' + ellipsename)
	viewX.uid = viewX.uid + 1
	ellipseElement.setAttribute('vector-effect','non-scaling-stroke');
	ellipseElement.style.opacity = ellipseoptions.opacity;
	ellipseElement.setAttribute('stroke-dasharray', ellipseoptions.strokedasharray);

	ellipseElement.style.fill = ellipseoptions.ellipsecolor
	ellipseElement.style.strokeWidth = ellipseoptions.strokewidth + '%';
	ellipseElement.style.stroke = ellipseoptions.stroke;
	gdata.svgElement.appendChild(ellipseElement);

	viewX.graphData[graphname].ellipseData[ellipsename] = [ellipseElement, ellipseoptions]
	return [ellipseElement, ellipseoptions]
}

viewX.updateEllipse = function(graphname, ellipsename, ellipsenewvalues) {
	gdata = viewX.graphData[graphname]
	aratio = gdata.aspectratio

	ellipseoptions = gdata.ellipseData[ellipsename][1]
	ellipseElement = gdata.ellipseData[ellipsename][0]

	if (ellipseoptions.x != 0) {
		ellipseoptions.x = ellipsenewvalues.x || ellipseoptions.x
	}
	else {
		ellipseoptions.x = 0
	}

	if (ellipseoptions.y != 0) {
		ellipseoptions.y = ellipsenewvalues.y || ellipseoptions.y
	}
	else {
		ellipseoptions.y = 0
	}

	if (ellipseoptions.rx != 0) {
		ellipseoptions.rx = ellipsenewvalues.rx || ellipseoptions.rx
	}
	else {
		ellipseoptions.rx = 0
	}
	if (ellipseoptions.ry != 0) {
		ellipseoptions.ry = ellipsenewvalues.ry || ellipseoptions.ry
	}
	else {
		ellipseoptions.ry = 0
	}

	ellipseoptions.name = ellipsename || viewX.uid

	ellipseoptions.stroke = ellipsenewvalues.stroke || ellipseoptions.stroke
	ellipseoptions.strokewidth = ellipsenewvalues.strokewidth || ellipseoptions.strokewidth
	
	ellipseoptions.ellipsecolor = ellipsenewvalues.ellipsecolor || ellipseoptions.ellipsecolor
	ellipseoptions.strokedasharray = ellipsenewvalues.strokedasharray || ellipseoptions.strokedasharray
	if (ellipsenewvalues.opacity !== undefined) {
		ellipseoptions.opacity = ellipsenewvalues.opacity
	}

	rx = viewX.distanceBTWgraphToSvg([0,0],[ellipseoptions.rx, 0], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
	ry = viewX.distanceBTWgraphToSvg([0,0],[0, ellipseoptions.ry], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
	
	ellipseElement.setAttribute('cx', viewX.graphToScaledX(ellipseoptions.x, gdata.xmin, gdata.xmax, aratio) + '%');
	ellipseElement.setAttribute('cy', viewX.graphToScaledY(ellipseoptions.y, gdata.ymin, gdata.ymax, aratio) + '%');
	ellipseElement.setAttribute('rx', rx + '%')
	ellipseElement.setAttribute('ry', ry + '%');
	ellipseElement.setAttribute('id', graphname + '-ellipse-' + ellipsename)
	viewX.uid = viewX.uid + 1
	ellipseElement.setAttribute('vector-effect','non-scaling-stroke');
	ellipseElement.style.opacity = ellipseoptions.opacity;
	ellipseElement.setAttribute('stroke-dasharray', ellipseoptions.strokedasharray);

	ellipseElement.style.fill = ellipseoptions.ellipsecolor
	ellipseElement.style.strokeWidth = ellipseoptions.strokewidth + '%';
	ellipseElement.style.stroke = ellipseoptions.stroke;
	gdata.svgElement.appendChild(ellipseElement);

	viewX.graphData[graphname].ellipseData[ellipsename] = [ellipseElement, ellipseoptions]
}

viewX.addText = function(graphname, textname, textoptions) {
	gdata = viewX.graphData[graphname]
	textoptions = textoptions || {}
	viewX.graphData.objectType[textname] = 'text'
	aratio = gdata.aspectratio

	textoptions.x = parseFloat(textoptions.x.toString() || 0)
	textoptions.y = parseFloat(textoptions.y.toString() || 0)
	textoptions.text = textoptions.text || ''
	textoptions.name = textname || viewX.uid

	textoptions.textAlign = textoptions.textAlign || 'left'
	textoptions.fontSize = textoptions.fontSize || 12
	textoptions.fontFamily = textoptions.fontFamily || 'Source Sans Pro'
	
	textoptions.textcolor = textoptions.textcolor || 'hsla(190, 100%, 0%, 1)'

	if (textoptions.opacity == undefined) {
		textoptions.opacity = 1
	}
	
	var textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
	textElement.setAttribute('x', viewX.graphToScaledX(textoptions.x, gdata.xmin, gdata.xmax, aratio) + '%');
	textElement.setAttribute('y', viewX.graphToScaledY(textoptions.y, gdata.ymin, gdata.ymax, aratio) + '%');
	textElement.setAttribute('id', graphname + '-text-' + textname)
	viewX.uid = viewX.uid + 1
	textElement.setAttribute('vector-effect','non-scaling-stroke');
	textElement.style.opacity = textoptions.opacity;
	textElement.style.fill = textoptions.textcolor
	textElement.innerHTML = textoptions.text
	textElement.style.fontFamily = textoptions.fontFamily
	textElement.style.fontSize = textoptions.fontSize + 'px';

	if (textoptions.textAlign == 'center') {
		textElement.setAttribute('text-anchor','middle')
	}
	gdata.svgElement.appendChild(textElement);

	viewX.graphData[graphname].textData[textname] = [textElement, textoptions]
	return [textElement, textoptions]
}

viewX.updateText = function(graphname, textname, textvalues) {
	gdata = viewX.graphData[graphname]

	aratio = gdata.aspectratio

	textoptions = gdata.textData[textname][1]
	textElement = gdata.textData[textname][0]

	textoptions.text = textvalues.text || textoptions.text
	textoptions.x = textvalues.x || textoptions.x
	textoptions.y = textvalues.y || textoptions.y
	textoptions.textcolor = textvalues.textcolor || textoptions.textcolor
	textoptions.fontSize = textvalues.fontSize || textoptions.fontSize
	textoptions.fontFamily = textvalues.fontFamily || textoptions.fontFamily

	if (textvalues.opacity !== undefined) {
		textoptions.opacity = textvalues.opacity
	}

	textElement.innerHTML = textoptions.text
	textElement.setAttribute('x', viewX.graphToScaledX(textoptions.x, gdata.xmin, gdata.xmax, aratio) + '%');
	textElement.setAttribute('y', viewX.graphToScaledY(textoptions.y, gdata.ymin, gdata.ymax, aratio) + '%');
	textElement.style.opacity = textoptions.opacity;
	textElement.style.fontFamily = textoptions.fontFamily
	textElement.style.fill = textoptions.textcolor
	textElement.style.fontSize = textoptions.fontSize + "px"
	
	viewX.graphData[graphname].textData[textname] = [textElement, textoptions]
	return [textElement, textoptions]
}

viewX.addRectangle = function(graphname, rectname, rectoptions) {
	gdata = viewX.graphData[graphname]
	aratio = gdata.aspectratio
	rectoptions = rectoptions || {}
	viewX.graphData.objectType[rectname] = 'rectangle'

	rectoptions.x = parseFloat(rectoptions.x.toString() || 0)
	rectoptions.y = parseFloat(rectoptions.y.toString() || 0)
	rectoptions.w = parseFloat(rectoptions.w.toString() || 1)
	rectoptions.h = parseFloat(rectoptions.h.toString() || 1)
	rectoptions.name = rectname || viewX.uid

	rectoptions.stroke = rectoptions.stroke || 'hsla(190, 100%, 50%, 0.5)'
	rectoptions.strokewidth = rectoptions.strokewidth || 0.1
	rectoptions.strokedasharray = rectoptions.strokedasharray || ""

	if (rectoptions.opacity == undefined) {
		rectoptions.opacity = 1
	}

	
	rectoptions.rectcolor = rectoptions.rectcolor || 'hsla(190, 100%, 50%, 1)'

	rx = viewX.distanceBTWgraphToSvg([0,0],[rectoptions.w, 0], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
	ry = viewX.distanceBTWgraphToSvg([0,0],[0, rectoptions.h], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
	
	var rectElement = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
	rectElement.setAttribute('x', viewX.graphToScaledX(rectoptions.x, gdata.xmin, gdata.xmax, aratio) + '%');
	rectElement.setAttribute('y', viewX.graphToScaledY(rectoptions.y, gdata.ymin, gdata.ymax, aratio) + '%');
	rectElement.setAttribute('width', rx + '%')
	rectElement.setAttribute('height', ry + '%');
	rectElement.setAttribute('id', graphname + '-rect-' + rectname)
	viewX.uid = viewX.uid + 1
	rectElement.setAttribute('vector-effect','non-scaling-stroke');
	rectElement.style.fill = rectoptions.rectcolor
	rectElement.style.strokeWidth = rectoptions.strokewidth + '%';
	rectElement.style.stroke = rectoptions.stroke;
	rectElement.style.opacity = rectoptions.opacity;
	rectElement.setAttribute('stroke-dasharray', rectoptions.strokedasharray);

	gdata.svgElement.appendChild(rectElement);

	viewX.graphData[graphname].rectData[rectname] = [rectElement, rectoptions]

	return [rectElement, rectoptions]
}

viewX.updateRectangle = function(graphname, rectname, rectvalueupdate) {
	gdata = viewX.graphData[graphname]
	rectoptions = gdata.rectData[rectname][1]
	rectElement = gdata.rectData[rectname][0]
	aratio = gdata.aspectratio

	if (rectvalueupdate.x != 0) {
		rectoptions.x = rectvalueupdate.x || rectoptions.x	
	}
	else {
		rectoptions.x = rectvalueupdate.x
	}


	if (rectvalueupdate.y != 0) {
		rectoptions.y = rectvalueupdate.y || rectoptions.y	
	}
	else {
		rectoptions.y = rectvalueupdate.y
	}


	if (rectvalueupdate.w != 0) {
		rectoptions.w = rectvalueupdate.w || rectoptions.w	
	}
	else {
		rectoptions.w = rectvalueupdate.w
	}


	if (rectvalueupdate.h != 0) {
		rectoptions.h = rectvalueupdate.h || rectoptions.h	
	}
	else {
		rectoptions.h = rectvalueupdate.h
	}
	
	rectoptions.stroke = rectvalueupdate.stroke || rectoptions.stroke
	rectoptions.strokewidth = rectvalueupdate.strokewidth || rectoptions.strokewidth
	
	rectoptions.rectcolor = rectvalueupdate.rectcolor || rectoptions.rectcolor
	rectoptions.strokedasharray = rectvalueupdate.strokedasharray || rectoptions.strokedasharray

	if (rectvalueupdate.opacity != 0) {
		rectoptions.opacity = rectvalueupdate.opacity || rectoptions.opacity
	}
	else {
		rectoptions.opacity = rectvalueupdate.opacity
	}

	

	rx = viewX.distanceBTWgraphToSvg([0,0],[rectoptions.w, 0], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
	ry = viewX.distanceBTWgraphToSvg([0,0],[0, rectoptions.h], gdata.xmin, gdata.xmax, gdata.ymin, gdata.ymax, aratio)
	
	rectElement.setAttribute('x', viewX.graphToScaledX(rectoptions.x, gdata.xmin, gdata.xmax, aratio) + '%');
	rectElement.setAttribute('y', viewX.graphToScaledY(rectoptions.y, gdata.ymin, gdata.ymax, aratio) + '%');
	rectElement.setAttribute('width', rx + '%')
	rectElement.setAttribute('height', ry + '%');
	rectElement.setAttribute('stroke-dasharray', rectoptions.strokedasharray);

	rectElement.style.fill = rectoptions.rectcolor
	rectElement.style.strokeWidth = rectoptions.strokewidth + '%';
	rectElement.style.stroke = rectoptions.stroke;
	rectElement.style.opacity = rectoptions.opacity;

	
	viewX.graphData[graphname].rectData[rectname] = [rectElement, rectoptions]
}

viewX.addPoint = function(graphname, pointname, pointoptions) {
	gdata = viewX.graphData[graphname]
	aratio = gdata.aspectratio

	pointoptions = pointoptions || {}
	viewX.graphData.objectType[pointname] = 'point'
	if (pointoptions.x != 0) {
		pointoptions.x = pointoptions.x || 0.3	
	}
	if (pointoptions.y != 0) {
		pointoptions.y = pointoptions.y || 0.3	
	}
	// pointoptions.y = pointoptions.y || 0.3
	pointoptions.pointsize = pointoptions.pointsize || 0.7
	pointoptions.name = pointname || viewX.uid

	pointoptions.pointcolor = pointoptions.pointcolor || 'hsla(190, 100%, 50%, 1)'

	if (pointoptions.opacity == undefined) {
		pointoptions.opacity = 1
	}
	
	var pointElement = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
	pointElement.setAttribute('cx', viewX.graphToScaledX(pointoptions.x, gdata.xmin, gdata.xmax, aratio) + '%');
	pointElement.setAttribute('cy', viewX.graphToScaledY(pointoptions.y, gdata.ymin, gdata.ymax, aratio) + '%');
	pointElement.setAttribute('rx', pointoptions.pointsize + '%')
	pointElement.setAttribute('ry', pointoptions.pointsize + '%');
	pointElement.setAttribute('id', graphname + '-point-' + pointname)
	viewX.uid = viewX.uid + 1
	pointElement.setAttribute('vector-effect','non-scaling-stroke');
	pointElement.style.fill = pointoptions.pointcolor
	pointElement.style.opacity = pointoptions.opacity;
	gdata.svgElement.appendChild(pointElement);

	pointoptions.draggability = pointoptions.draggability || 'no'
	if (pointoptions.draggability == 'yes') {
		pointoptions.currentlyDraggable = pointoptions.currentlyDraggable || 'yes'
	}
	else {
		pointoptions.currentlyDraggable = pointoptions.currentlyDraggable || 'no'
	}
	pointoptions.runFunctionOnDragEnd = pointoptions.runFunctionOnDragEnd || ''
	pointoptions.runFunctionDuringDrag = pointoptions.runFunctionDuringDrag || ''

	if (pointoptions.draggability == 'yes') {
		pointElement.addEventListener('mousedown', viewX.pointDrag)
		pointElement.addEventListener('touchstart', viewX.pointDrag)
		gdata.svgElement.addEventListener('touchmove', viewX.graphTouchDisable)

		pointElement.style.cursor = 'move'
		pointElement.style.pointerEvents = 'auto'
	}
	else {
		pointElement.style.pointerEvents = 'none'
	}

	pointoptions.dragDirection = pointoptions.dragDirection || 'bothXY'
	pointoptions.dragIfCondition = pointoptions.dragIfCondition || 'true'

	viewX.graphData[graphname].pointData[pointname] = [pointElement, pointoptions]
	viewX.reverseGraphElementMap[pointElement.id] = [graphname, pointname]
	return [pointElement, pointoptions]
}

viewX.updatePoint = function(graphname, pointname, newpointoptions) {
	gdata = viewX.graphData[graphname]
	pointoptions = gdata.pointData[pointname][1]
	pointElement = gdata.pointData[pointname][0]
	aratio = gdata.aspectratio

	if (pointoptions.x != 0) {
		pointoptions.x = newpointoptions.x || pointoptions.x
	}
	if (pointoptions.y != 0) {
		pointoptions.y = newpointoptions.x || pointoptions.y
	}
	// pointoptions.y = pointoptions.y || 0.3
	pointoptions.pointsize = newpointoptions.pointsize || pointoptions.pointsize

	pointoptions.pointcolor = newpointoptions.pointcolor || pointoptions.pointcolor

	if (newpointoptions.opacity !== undefined) {
		pointoptions.opacity = newpointoptions.opacity
	}
	
	pointElement.setAttribute('cx', viewX.graphToScaledX(pointoptions.x, gdata.xmin, gdata.xmax, aratio) + '%');
	pointElement.setAttribute('cy', viewX.graphToScaledY(pointoptions.y, gdata.ymin, gdata.ymax, aratio) + '%');
	pointElement.setAttribute('rx', pointoptions.pointsize + '%')
	pointElement.setAttribute('ry', pointoptions.pointsize + '%');
	pointElement.setAttribute('vector-effect','non-scaling-stroke');
	pointElement.style.fill = pointoptions.pointcolor
	pointElement.style.opacity = pointoptions.opacity;

	pointoptions.draggability = newpointoptions.draggability || 'no'
	if (pointoptions.draggability == 'yes') {
		pointoptions.currentlyDraggable = newpointoptions.currentlyDraggable || 'yes'
	}
	else {
		pointoptions.currentlyDraggable = newpointoptions.currentlyDraggable || 'no'
	}
	pointoptions.runFunctionOnDragEnd = newpointoptions.runFunctionOnDragEnd || ''
	pointoptions.runFunctionDuringDrag = newpointoptions.runFunctionDuringDrag || ''
	pointoptions.dragDirection = newpointoptions.dragDirection || 'bothXY'
	pointoptions.dragIfCondition = newpointoptions.dragIfCondition || ''

	if (pointoptions.draggability == 'yes') {
		pointElement.addEventListener('mousedown', viewX.pointDrag)
		pointElement.addEventListener('touchstart', viewX.pointDrag)
	}
	else {
		pointElement.removeEventListener('mousedown', viewX.pointDrag)
		pointElement.removeEventListener('touchstart', viewX.pointDrag)
	}

	viewX.graphData[graphname].pointData[pointname] = [pointElement, pointoptions]

}

viewX.updatePointXY = function(graphname, pointname, xvalue, yvalue) {
	pointElement = document.getElementById(graphname + '-point-' + pointname)
	gdata = viewX.graphData[graphname]
	aratio = gdata.aspectratio

	pointoptions = viewX.graphData[graphname].pointData[pointname][1]

	pointoptions.x = xvalue
	pointoptions.y = yvalue
	
	
	pointElement.setAttribute('cx', viewX.graphToScaledX(pointoptions.x, gdata.xmin, gdata.xmax, aratio) + '%');
	pointElement.setAttribute('cy', viewX.graphToScaledY(pointoptions.y, gdata.ymin, gdata.ymax, aratio) + '%');

	viewX.graphData[graphname].pointData[pointname] = [pointElement, pointoptions]
}

viewX.removePoint = function(graphname, pointname) {
	if (typeof viewX.graphData[graphname].pointData[pointname] != 'undefined') {
		pointElement = document.getElementById(graphname + '-point-' + pointname)
		
		pointElement.outerHTML = "";
		delete viewX.reverseGraphElementMap[pointElement.id]
		delete viewX.graphData[graphname].pointData[pointname]
		delete viewX.graphData.objectType[pointname]
		
	}
	
}

viewX.removeLine = function(graphname, linename) {
	if (typeof viewX.graphData[graphname].lineData[linename] != 'undefined') {
		lineElement = document.getElementById(graphname + '-line-' + linename)
		
		lineElement.outerHTML = "";
		delete viewX.graphData.objectType[linename]
		delete viewX.graphData[graphname].lineData[linename]
	}
}

viewX.removeCircle = function(graphname, circlename) {
	if (typeof viewX.graphData[graphname].circleData[circlename] != 'undefined') {
		circleElement = document.getElementById(graphname + '-circle-' + circlename)
		
		circleElement.outerHTML = "";
		delete viewX.graphData[graphname].circleData[circlename]
		delete viewX.graphData.objectType[circlename]
	}
}

viewX.removeText = function(graphname, textname) {
	if (typeof viewX.graphData[graphname].textData[textname] != 'undefined') {
		textElement = document.getElementById(graphname + '-text-' + textname)
		textElement.outerHTML = "";
		delete viewX.graphData[graphname].textData[textname]
		delete viewX.graphData.objectType[textname]
	}
}

viewX.removePath = function(graphname, pathname) {
	if (typeof viewX.graphData[graphname].pathData[pathname] != 'undefined') {
		pathElement = document.getElementById(graphname + '-path-' + pathname)
		pathElement.outerHTML = "";
		delete viewX.graphData[graphname].pathData[pathname]
		delete viewX.graphData.objectType[pathname]
	}
}

viewX.removeArrow = function(graphname, arrowname) {
	if (typeof viewX.graphData[graphname].arrowData[arrowname] != 'undefined') {
		arrowElement = document.getElementById(graphname + '-arrow-' + arrowname)
		arrowElement.outerHTML = "";
		delete viewX.graphData[graphname].arrowData[arrowname]
		delete viewX.graphData.objectType[arrowname]
	}
}

viewX.removeRectangle = function(graphname, rectname) {
	if (typeof viewX.graphData[graphname].rectData[rectname] != 'undefined') {
		rectElement = document.getElementById(graphname + '-rect-' + rectname)
		
		rectElement.outerHTML = "";
		delete viewX.graphData.objectType[rectname]
		delete viewX.graphData[graphname].rectData[rectname]
	}
}

viewX.removeGraph = function(graphname) {
	graphElement = document.getElementById(graphname)
	graphElement.outerHTML = "";
	delete viewX.graphData[graphname]
	delete viewX.graphData.objectType[graphname]
}

viewX.basicSlider = function(graphname2, slidernamebasic, maxv, minv, currentv, thickness, coordinates) {
	options = {}
	options.maxvalue = maxv
	options.minvalue = minv
	options.currentvalue = currentv
	options.x1 = coordinates[0][0]
	options.y1 = coordinates[0][1]
	options.x2 = coordinates[1][0]
	options.y2 = coordinates[1][1]
	options.strokewidth = thickness
	options.automaticallySetKnobRadius = 'yes'
	viewX.addSlider(graphname2, slidernamebasic, options)
}

viewX.makeArc = function(gphname, ringname, arcradius, arccenter, arcthickness, arccolor, startanglepercent,endanglepercent, resolution) {
	arcpoints = []
	for (p = startanglepercent*resolution; p < endanglepercent*(resolution + 1); p++) {
		quanta = 2*Math.PI/resolution
		arcpoints.push([arccenter[0] + arcradius*Math.cos(quanta*p), arccenter[1] + arcradius*Math.sin(quanta*p)])
	}
	options = {}
	options.points = arcpoints
	options.pathcolor = arccolor
	options.strokewidth = arcthickness
	viewX.addPath(gphname, ringname, options)
	// console.log(options.points)

	return arcpoints
}

viewX.makeArcS = function(ringarcnum, arcradius, arcthickness, arccolor, startanglepercent, endanglepercent, ringname) {
	resolution = 20
	arcpoints = []
	for (p = startanglepercent*resolution; p < endanglepercent*(resolution + 1); p++) {
		quanta = 2*Math.PI/resolution
		arcpoints.push([arcradius*Math.cos(quanta*p), arcradius*Math.sin(quanta*p)])
	}
	options = {}
	options.points = arcpoints
	options.pathcolor = arccolor
	options.strokewidth = arcthickness
	viewX.addPath('ringvisualgraph', ringname, options)
	// console.log(options.points)
}

viewX.deleteSegments = function(collection) {
	if (typeof collection != 'undefined') {
		for (f = 0; f < collection.length; f++) {
			collection[f].outerHTML = ''
		}
	}
}

viewX.randomChoice = function(choicearray) {
	return choicearray[parseInt(Math.random()*choicearray.length)]
}

viewX.randomWeightedChoice = function(choicearray, weightArray) {
	if (choicearray.length == weightArray.length) {
		weightSumA = weightArray.reduce(function(a, b) { return a + b; }, 0);
		weightvalueChosen = Math.random()*weightSumA
		weightSumZ = 0
		for (weightIndex = 0; weightIndex < weightArray.length; weightIndex++) {
			weightSumZ = weightSumZ + weightArray[weightIndex]
			if (weightSumZ >= weightvalueChosen) {
				indexchosenW = weightIndex
				break
			}
		}
		return choicearray[indexchosenW]
	}
		
}

viewX.linearValue = function(xv1, xv2, yv1, yv2, inputvl) {
	return yv1 + ((inputvl - xv1)/(xv2 - xv1))*(yv2 - yv1)
}

viewX.currentMovingPoint = ''

viewX.pointDrag = function(event) {
	gphname = viewX.reverseGraphElementMap[event.target.id][0]
	ptname = viewX.reverseGraphElementMap[event.target.id][1]
	if (viewX.graphData[gphname].pointData[ptname][1].currentlyDraggable == 'yes') {
		if (viewX.graphData[gphname].currentlyDraggableGraph == 'yes') {
			document.getElementById(gphname).removeEventListener('mousedown', viewX.graphDragHandle)
			document.getElementById(gphname).removeEventListener('touchstart', viewX.graphDragHandle)
		}
		event.target.removeEventListener('mousedown', viewX.pointDrag)
		event.target.removeEventListener('touchstart', viewX.pointDrag)
		window.addEventListener('mousemove', viewX.pointMoveEvent)
		window.addEventListener('mouseup', viewX.pointUpEvent)
		event.preventDefault()
		window.addEventListener('touchmove', viewX.pointMoveEvent, { passive: false })
		window.addEventListener('touchend', viewX.pointUpEvent)
		// window.addEventListener('mouseout', viewX.pointUpEvent)
		viewX.currentMovingPoint = event.target
	}
		
}

viewX.svgPTVariable = {}


viewX.pointMoveEvent = function(event) {
	event.preventDefault()
	gphname = viewX.reverseGraphElementMap[viewX.currentMovingPoint.id][0]
	ptname = viewX.reverseGraphElementMap[viewX.currentMovingPoint.id][1]
	var rect = document.getElementById(gphname).getBoundingClientRect();
	posx = event.clientX - rect.left;
	posy = event.clientY - rect.top;
	viewX.svgPTVariable[gphname].x = event.clientX;
	viewX.svgPTVariable[gphname].y = event.clientY;

	if (event.clientX == undefined) {
		posx = event.changedTouches[0].clientX - rect.left;
		posy = event.changedTouches[0].clientY - rect.top;
		viewX.svgPTVariable[gphname].x = event.changedTouches[0].clientX;
		viewX.svgPTVariable[gphname].y = event.changedTouches[0].clientY;
	}

	var cursorpt =  viewX.svgPTVariable[gphname].matrixTransform(document.getElementById(gphname).getScreenCTM().inverse());

	moveX = viewX.svgToGraphX(cursorpt.x, viewX.graphData[gphname].xmin,viewX.graphData[gphname].xmax, viewX.graphData[gphname].aspectratio)
	moveY = viewX.svgToGraphY(cursorpt.y, viewX.graphData[gphname].ymin,viewX.graphData[gphname].ymax, viewX.graphData[gphname].aspectratio)

	if (typeof eval(viewX.graphData[gphname].pointData[ptname][1].dragIfCondition) != undefined) {
		if (eval(viewX.graphData[gphname].pointData[ptname][1].dragIfCondition) == true) {
			if (viewX.graphData[gphname].pointData[ptname][1].dragDirection == 'bothXY') {
				viewX.updatePointXY(gphname, ptname, moveX, moveY)
				eval(viewX.graphData[gphname].pointData[ptname][1].runFunctionDuringDrag)
			}
			else if (viewX.graphData[gphname].pointData[ptname][1].dragDirection == 'onlyY') {
				viewX.updatePointXY(gphname, ptname, viewX.graphData[gphname].pointData[ptname][1].x, moveY)
				eval(viewX.graphData[gphname].pointData[ptname][1].runFunctionDuringDrag)
			}
			else if (viewX.graphData[gphname].pointData[ptname][1].dragDirection == 'onlyX') {
				viewX.updatePointXY(gphname, ptname, moveX, viewX.graphData[gphname].pointData[ptname][1].y)
				eval(viewX.graphData[gphname].pointData[ptname][1].runFunctionDuringDrag)
			}
		}
	}
}

viewX.cursorCoordinates = {}

viewX.getCoordinatesOfEvent = (gphname, runFunctionAtEnd) => (event) => {
	event.preventDefault()
	var rect = document.getElementById(gphname).getBoundingClientRect();
	posx = event.clientX - rect.left;
	posy = event.clientY - rect.top;
	viewX.svgPTVariable[gphname].x = event.clientX;
	viewX.svgPTVariable[gphname].y = event.clientY;

	if (event.clientX == undefined) {
		posx = event.changedTouches[0].clientX - rect.left;
		posy = event.changedTouches[0].clientY - rect.top;
		viewX.svgPTVariable[gphname].x = event.changedTouches[0].clientX;
		viewX.svgPTVariable[gphname].y = event.changedTouches[0].clientY;
	}

	var cursorpt =  viewX.svgPTVariable[gphname].matrixTransform(document.getElementById(gphname).getScreenCTM().inverse());

	coordinatesX = viewX.svgToGraphX(cursorpt.x, viewX.graphData[gphname].xmin,viewX.graphData[gphname].xmax, viewX.graphData[gphname].aspectratio)
	coordinatesY = viewX.svgToGraphY(cursorpt.y, viewX.graphData[gphname].ymin,viewX.graphData[gphname].ymax, viewX.graphData[gphname].aspectratio)
	viewX.cursorCoordinates[gphname] = [coordinatesX, coordinatesY]
	window[runFunctionAtEnd]()

	return [coordinatesX, coordinatesY]
}

viewX.pointUpEvent = function(event) {
	gphname = viewX.reverseGraphElementMap[viewX.currentMovingPoint.id][0]
	ptname = viewX.reverseGraphElementMap[viewX.currentMovingPoint.id][1]
	if (viewX.graphData[gphname].currentlyDraggableGraph == 'yes') {
		document.getElementById(gphname).addEventListener('mousedown', viewX.graphDragHandle)
		document.getElementById(gphname).addEventListener('touchstart', viewX.graphDragHandle)
	}
	viewX.currentMovingPoint.addEventListener('mousedown', viewX.pointDrag)
	viewX.currentMovingPoint.addEventListener('touchstart', viewX.pointDrag)
	window.removeEventListener('mousemove', viewX.pointMoveEvent)
	window.removeEventListener('mouseup', viewX.pointUpEvent)
	window.removeEventListener('touchmove', viewX.pointMoveEvent)
	window.removeEventListener('touchend', viewX.pointUpEvent)

	// window.removeEventListener('mouseout', viewX.pointUpEvent)
	eval(viewX.graphData[gphname].pointData[ptname][1].runFunctionOnDragEnd)
}

viewX.wheelHandle = (gphname) => (event) => {
	event.preventDefault();
	whlvalue = (event.wheelDeltaY)/Math.abs(event.wheelDeltaY)
	if (event.wheelDeltaY == undefined) {
		whlvalue = (event.deltaY)/Math.abs(event.deltaY)
		// For FireFox
	}
	scalefactorup = 1.1
	scalefactordown = 0.9
	if (viewX.graphData[gphname] == undefined) {
		console.log("Cannot scroll")
	}
	else {
		gdata = viewX.graphData[gphname]

		scale = gdata.ymax - gdata.ymin
		expstring = scale.toExponential().toString()
		ordery = (expstring.slice(expstring.indexOf('e') + 1)*(-1))
		// console.log(ordery)

		scale = gdata.xmax - gdata.xmin
		expstring = scale.toExponential().toString()
		orderx = (expstring.slice(expstring.indexOf('e') + 1)*(-1))
		// console.log(orderx)

		gphname = gdata.name

		var rect = document.getElementById(gphname).getBoundingClientRect();
		posx = event.clientX - rect.left;
		posy = event.clientY - rect.top;
		viewX.svgPTVariable[gphname].x = event.clientX;
		viewX.svgPTVariable[gphname].y = event.clientY;

		if (event.clientX == undefined) {
			posx = event.changedTouches[0].clientX - rect.left;
			posy = event.changedTouches[0].clientY - rect.top;
			viewX.svgPTVariable[gphname].x = event.changedTouches[0].clientX;
			viewX.svgPTVariable[gphname].y = event.changedTouches[0].clientY;
		}

		var cursorpt =  viewX.svgPTVariable[gphname].matrixTransform(document.getElementById(gphname).getScreenCTM().inverse());

		zoomlocationX = viewX.svgToGraphX(cursorpt.x, viewX.graphData[gphname].xmin,viewX.graphData[gphname].xmax, viewX.graphData[gphname].aspectratio)
		zoomlocationY = viewX.svgToGraphY(cursorpt.y, viewX.graphData[gphname].ymin,viewX.graphData[gphname].ymax, viewX.graphData[gphname].aspectratio)

		currentvalues = viewX.graphData[gphname]

		posx = posx/rect.width
		posy = posy/rect.height

		if (posx > 0.11 && posx < 0.89 && posy > 0.11 && posy < 0.89) {
			if (whlvalue < 0) {
				scaleupdownFactor = scalefactorup
				leftX = (zoomlocationX - currentvalues.xmin)*scaleupdownFactor
				newZXmin = zoomlocationX - leftX
				rightX = (currentvalues.xmax - zoomlocationX)*scaleupdownFactor
				newZXmax = zoomlocationX + rightX
				leftY = (zoomlocationY - currentvalues.ymin)*scaleupdownFactor
				newZYmin = zoomlocationY - leftY
				rightY = (currentvalues.ymax - zoomlocationY)*scaleupdownFactor
				newZYmax = zoomlocationY + rightY

				options = {}
				options.xmin = newZXmin
				options.xmax = newZXmax
				options.ymin = newZYmin
				options.ymax = newZYmax
				
				viewX.updateGraphZoom(gphname, options)
			}
			else if (whlvalue >= 0 && orderx < 14 && ordery < 14) {

				scaleupdownFactor = scalefactordown
				leftX = (zoomlocationX - currentvalues.xmin)*scaleupdownFactor
				newZXmin = zoomlocationX - leftX
				rightX = (currentvalues.xmax - zoomlocationX)*scaleupdownFactor
				newZXmax = zoomlocationX + rightX
				leftY = (zoomlocationY - currentvalues.ymin)*scaleupdownFactor
				newZYmin = zoomlocationY - leftY
				rightY = (currentvalues.ymax - zoomlocationY)*scaleupdownFactor
				newZYmax = zoomlocationY + rightY

				options = {}
				options.xmin = newZXmin
				options.xmax = newZXmax
				options.ymin = newZYmin
				options.ymax = newZYmax
				viewX.updateGraphZoom(gphname, options)
			}
		}

			
	}
}

viewX.currentMovingGraph = ''
viewX.currentMovingGraphStartLocation = []

viewX.graphDragHandle = (gphname) => (event) => {
	event.preventDefault();
	// gphname = event.target.id.split('-')[0]
	if (viewX.graphData[gphname].currentlyDraggableGraph == 'yes') {
		viewX.graphData[gphname].svgElement.removeEventListener('mousedown', viewX.graphDragHandle)
		viewX.graphData[gphname].svgElement.removeEventListener('touchstart', viewX.graphDragHandle)
		window.addEventListener('mousemove', viewX.graphDragMoveEvent)
		window.addEventListener('mouseup', viewX.graphDragUpEvent)
		event.preventDefault()
		window.addEventListener('touchmove', viewX.graphDragMoveEvent, { passive: false })
		window.addEventListener('touchend', viewX.graphDragUpEvent)
		// window.addEventListener('mouseout', viewX.pointUpEvent)
		viewX.currentMovingGraph = viewX.graphData[gphname].svgElement

		var rect = document.getElementById(gphname).getBoundingClientRect();
		posx = event.clientX - rect.left;
		posy = event.clientY - rect.top;
		viewX.svgPTVariable[gphname].x = event.clientX;
		viewX.svgPTVariable[gphname].y = event.clientY;

		if (event.clientX == undefined) {
			posx = event.changedTouches[0].clientX - rect.left;
			posy = event.changedTouches[0].clientY - rect.top;
			viewX.svgPTVariable[gphname].x = event.changedTouches[0].clientX;
			viewX.svgPTVariable[gphname].y = event.changedTouches[0].clientY;

		}

		var cursorpt =  viewX.svgPTVariable[gphname].matrixTransform(document.getElementById(gphname).getScreenCTM().inverse());

		tapX = viewX.svgToGraphX(cursorpt.x, viewX.graphData[gphname].xmin,viewX.graphData[gphname].xmax, viewX.graphData[gphname].aspectratio)
		tapY = viewX.svgToGraphY(cursorpt.y, viewX.graphData[gphname].ymin,viewX.graphData[gphname].ymax, viewX.graphData[gphname].aspectratio)

		viewX.currentMovingGraphStartLocation = [tapX, tapY]
		currentMovingGraphOriginalBounds = [viewX.graphData[gphname].xmin, viewX.graphData[gphname].xmax, viewX.graphData[gphname].ymin, viewX.graphData[gphname].ymax]

		viewX.currentMovingGraph.style.cursor = 'move'

	}
}

viewX.clientToGraph = function(clientValues, graphNameInput) {
	viewX.svgPTVariable[graphNameInput].x = clientValues[0];
	viewX.svgPTVariable[graphNameInput].y = clientValues[1];

	var cursorpt =  viewX.svgPTVariable[gphname].matrixTransform(document.getElementById(gphname).getScreenCTM().inverse());

	return [svgToGraphX(cursorpt.x, viewX.graphData[gphname].xmin,viewX.graphData[gphname].xmax, viewX.graphData[gphname].aspectratio), viewX.svgToGraphY(cursorpt.y, viewX.graphData[gphname].ymin,viewX.graphData[gphname].ymax, viewX.graphData[gphname].aspectratio)]

}

viewX.graphPinchMoveEvent = function(event) {
	if (event.changedTouches.length == 2) {
		gphname = event.target.id.split('-')[0]
		touch1 = [event.changedTouches[0].clientX, event.changedTouches[0].clientY]
		touch2 = [event.changedTouches[1].clientX, event.changedTouches[1].clientY]

		touch1 = viewX.clientToGraph(touch1, gphname)
		touch2 = viewX.clientToGraph(touch2, gphname)

		oldtouch1 = viewX.clientToGraph(viewX.pinchStartData[0], gphname)
		oldtouch2 = viewX.clientToGraph(viewX.pinchStartData[1], gphname)

		pinchScale = viewX.distF(oldtouch1, oldtouch2)/viewX.distF(touch1, touch2)
		pinchStartMidpoint = [(oldtouch1[0] + oldtouch2[0])/2, (oldtouch1[1] + oldtouch2[1])/2]

		zoomlocationX = pinchStartMidpoint[0]
		zoomlocationY = pinchStartMidpoint[1]

		gdata = viewX.graphData[gphname]

		scale = gdata.ymax - gdata.ymin
		expstring = scale.toExponential().toString()
		ordery = (expstring.slice(expstring.indexOf('e') + 1)*(-1))
		// console.log(ordery)

		scale = gdata.xmax - gdata.xmin
		expstring = scale.toExponential().toString()
		orderx = (expstring.slice(expstring.indexOf('e') + 1)*(-1))
		// console.log(orderx)

		currentvalues = viewX.graphData[gphname]

		scaleFactorForTouch = 1
		if (pinchScale <= 1) {
			scaleFactorForTouch = viewX.linearValue(0, 1, 0.9, 1, pinchScale)
		}
		else {
			scaleFactorForTouch = viewX.linearValue(1, 5, 1, 1.1, pinchScale)
		}

		leftX = (zoomlocationX - currentvalues.xmin)*scaleFactorForTouch
		newZXmin = zoomlocationX - leftX
		rightX = (currentvalues.xmax - zoomlocationX)*scaleFactorForTouch
		newZXmax = zoomlocationX + rightX
		leftY = (zoomlocationY - currentvalues.ymin)*scaleFactorForTouch
		newZYmin = zoomlocationY - leftY
		rightY = (currentvalues.ymax - zoomlocationY)*scaleFactorForTouch
		newZYmax = zoomlocationY + rightY

		options = {}
		options.xmin = newZXmin
		options.xmax = newZXmax
		options.ymin = newZYmin
		options.ymax = newZYmax
		
		viewX.updateGraphZoom(gphname, options)
		
		// console.log(pinchStartMidpoint)
	}
}

viewX.graphPinchEndEvent = function(event) {
	viewX.pinchZoom = false
	window.removeEventListener('touchmove', viewX.graphPinchMoveEvent)
	window.removeEventListener('touchend', viewX.graphPinchEndEvent)
}

viewX.pinchZoom = false
viewX.pinchStartData = []

viewX.graphDragMoveEvent = function(event) {
	event.preventDefault()
	gphname = viewX.currentMovingGraph.id
	var rect = document.getElementById(gphname).getBoundingClientRect();
	posx = event.clientX - rect.left;
	posy = event.clientY - rect.top;
	viewX.svgPTVariable[gphname].x = event.clientX;
	viewX.svgPTVariable[gphname].y = event.clientY;

	touchEventDetect = 0

	if (event.clientX == undefined) {
		posx = event.changedTouches[0].clientX - rect.left;
		posy = event.changedTouches[0].clientY - rect.top;
		viewX.svgPTVariable[gphname].x = event.changedTouches[0].clientX;
		viewX.svgPTVariable[gphname].y = event.changedTouches[0].clientY;
		
		if (event.changedTouches.length == 2) {
			oldtouch1 = [event.changedTouches[0].clientX, event.changedTouches[0].clientY]
			oldtouch2 = [event.changedTouches[1].clientX, event.changedTouches[1].clientY]
			viewX.pinchStartData = [oldtouch1, oldtouch2]
			dummyEve = {}
			viewX.pinchZoom = true
			viewX.graphDragUpEvent(dummyEve)
			window.addEventListener('touchmove', viewX.graphPinchMoveEvent)
			window.addEventListener('touchend', viewX.graphPinchEndEvent)
		}

		touchEventDetect = event.changedTouches[0].identifier
		
	}

	if (viewX.pinchZoom == false && touchEventDetect == 0) {
		var cursorpt =  viewX.svgPTVariable[gphname].matrixTransform(document.getElementById(gphname).getScreenCTM().inverse());

		moveX = viewX.svgToGraphX(cursorpt.x, viewX.graphData[gphname].xmin,viewX.graphData[gphname].xmax, viewX.graphData[gphname].aspectratio)
		moveY = viewX.svgToGraphY(cursorpt.y, viewX.graphData[gphname].ymin,viewX.graphData[gphname].ymax, viewX.graphData[gphname].aspectratio)

		deltaVecX = moveX - viewX.currentMovingGraphStartLocation[0]
		deltaVecY = moveY - viewX.currentMovingGraphStartLocation[1]
		currentvalues = viewX.graphData[gphname]

		newZXmin = currentvalues.xmin - deltaVecX
		newZXmax =currentvalues.xmax - deltaVecX
		newZYmin = currentvalues.ymin - deltaVecY
		newZYmax = currentvalues.ymax - deltaVecY
		
		if (typeof eval(viewX.graphData[gphname].dragIfCondition) != undefined) {
			if (eval(viewX.graphData[gphname].dragIfCondition) == true) {
				if (viewX.graphData[gphname].dragDirection == 'bothXY') {
					options = {}
					options.xmin = newZXmin
					options.xmax = newZXmax
					options.ymin = newZYmin
					options.ymax = newZYmax
					viewX.updateGraphZoom(gphname, options)
					eval(viewX.graphData[gphname].runFunctionDuringDrag)
				}
				else if (viewX.graphData[gphname].dragDirection == 'onlyY') {
					options = {}
					options.ymin = newZYmin
					options.ymax = newZYmax
					viewX.updateGraphZoom(gphname, options)
					eval(viewX.graphData[gphname].runFunctionDuringDrag)
				}
				else if (viewX.graphData[gphname].dragDirection == 'onlyX') {
					options = {}
					options.xmin = newZXmin
					options.xmax = newZXmax
					viewX.updateGraphZoom(gphname, options)
					eval(viewX.graphData[gphname].runFunctionDuringDrag)
				}
			}
		}
	}

		
}

viewX.graphDragUpEvent = function(event) {
	gphname = viewX.currentMovingGraph.id

	viewX.currentMovingGraph.addEventListener('mousedown', viewX.graphDragHandle(gphname))
	viewX.currentMovingGraph.addEventListener('touchstart', viewX.graphDragHandle(gphname))
	window.removeEventListener('mousemove', viewX.graphDragMoveEvent)
	window.removeEventListener('mouseup', viewX.graphDragUpEvent)
	window.removeEventListener('touchmove', viewX.graphDragMoveEvent)
	window.removeEventListener('touchend', viewX.graphDragUpEvent)

	// window.removeEventListener('mouseout', viewX.pointUpEvent)
	eval(viewX.graphData[gphname].runFunctionOnDragEnd)

	viewX.currentMovingGraph.style.cursor = 'auto'
}

viewX.graphTouchDisable = function(event) {
	event.preventDefault()
}

// other code
dmode = 'square'

if (1.25*window.innerWidth < window.innerHeight && window.innerWidth < window.innerHeight) {
	dmode = 'portrait'
}
else if (window.innerWidth > 1.3*window.innerHeight && window.innerWidth > window.innerHeight) {
	dmode = 'landscape'
}


viewX.setFont = function(divCollection, fontval) {
	for (divN = 0; divN < divCollection.length; divN++) {
		document.getElementById(divCollection[divN]).style.fontSize = fontval
	}
}

viewX.distF = function(pt1, pt2) {
	return Math.pow(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2), 0.5)
}

viewX.addVec = function(pt1, pt2) {
	if (typeof(pt2[0]) == 'number') {
		return [pt1[0] + pt2[0], pt1[1] + pt2[1]]
	}
	else if (typeof(pt2[0]) == 'object') {
		pts = []
		for (var i = 0; i < pt2.length; i++) {
			pts.push(viewX.addVec(pt1, pt2[i]))
		}
		return pts

	} 
}

viewX.scalarMultiplyVec = function(c, pt1) {
	return [c*pt1[0], c*pt1[1]]
}

viewX.subtractVec = function(pt1, pt2) {
	return [pt1[0] - pt2[0], pt1[1] - pt2[1]]
}

viewX.directionVec = function(pt1, pt2) {
	diff = [pt2[0] - pt1[0], pt2[1] - pt1[1]]
	difflen = viewX.distF(diff, [0,0])
	return [diff[0]/difflen, diff[1]/difflen]
}

viewX.rotatedVec = function(ofVector, angle) {
	angle = angle*Math.PI/180;
	rotatedXV = ofVector[0]*Math.cos(angle) - ofVector[1]*Math.sin(angle);
	rotatedYV = ofVector[0]*Math.sin(angle) + ofVector[1]*Math.cos(angle);
	return [rotatedXV, rotatedYV]
}

viewX.mod = function(ofVector) {
	return viewX.distF(ofVector, [0,0])
}

viewX.shuffle = function(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}




// Animations
viewX.animationData = {}

viewX.addAnimation = function(animname, animoptions) {
	animdata = {}
	animoptions = animoptions || {}
	animoptions.name = animname
	animoptions.duration = animoptions.duration || 1
	// in seconds

	animoptions.delay = animoptions.delay || 0
	// in seconds

	animoptions.repeat = animoptions.repeat || "no"
	// "yes" or "no"

	animoptions.repeatdelay = animoptions.repeatdelay || 0
	// in seconds

	// animoptions.easing = animoptions.easing || "linear"
	// "linear", "easeIn", "easeOut", "easeInOut", "easeInQuad", "easeOutQuad", "easeInOutQuad", "easeInCubic", "easeOutCubic", "easeInOutCubic", "easeInQuart", "easeOutQuart", "easeInOutQuart", "easeInQuint", "easeOutQuint", "easeInOutQuint"

	animoptions.defaultGraph = animoptions.defaultGraph || ""
	// name of graph

	animoptions.keyframes = animoptions.keyframes || {
		0 : {}
	}

	// 0 : {
	// 	"0" : {
	// 		'graph': graphName,
	//		'object': objectName, 
	// 		'options': options,
	// 	}
	// }

	animdata.objects = {}

	for (var key in animoptions.keyframes) {
		for (var objectIndex in animoptions.keyframes[key]) {
			for (var propertyName in animoptions.keyframes[key][objectIndex].options) {
				forProperty = animoptions.keyframes[key][objectIndex].graph + "-" + animoptions.keyframes[key][objectIndex].object + "-" + propertyName


				objectFullName = animoptions.keyframes[key][objectIndex].object + "-FROM-" + animoptions.keyframes[key][objectIndex].graph
				if (animdata.objects[objectFullName] == undefined) {
					animdata.objects[objectFullName] = {
						'keys' : [],
						'graphName': animoptions.keyframes[key][objectIndex].graph,
						'objectName': animoptions.keyframes[key][objectIndex].object,
						'objectType': viewX.graphData.objectType[animoptions.keyframes[key][objectIndex].object],
						'propertiesToBeAnimated': {},
						'propertySetCalculatedAtKeys': {}
					}
				}
				if (!animdata.objects[objectFullName]['keys'].includes(key)) {
					animdata.objects[objectFullName]['keys'].push(key)
				}
				

				if (animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName] == undefined) {
					animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName] = {}
				}

				animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName][key] = animoptions.keyframes[key][objectIndex].options[propertyName]

			}
		}
	}
	
	
	for (var objectFullName in animdata.objects) {
		for (propertyName in animdata.objects[objectFullName]['propertiesToBeAnimated']) {
			for (var key in animoptions.keyframes) {
				if (animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName][key] == undefined) {
					totalKeys = Object.keys(animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName]).length

					if (totalKeys == 0) {
						console.log("Something is wrong, this animation has no keyframes for this property")
					}
					else if (totalKeys == 1) {
						theOnlyKey = Object.keys(animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName])[0]
						animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName][key] = animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName][theOnlyKey]
					}
					else if (totalKeys > 1) {
						animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName][key]
						
						valuesOfInterest = viewX.libraryFunctions.findClosestRightAndLeftNumbersInArray(Object.keys(animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName]), key)


						if (valuesOfInterest[0] == null && valuesOfInterest[1] != null) {
							assignPropertyAtKey = valuesOfInterest[1]
							animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName][key] = animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName][assignPropertyAtKey]
						}
						else if (valuesOfInterest[1] == null && valuesOfInterest[0] != null) {
							assignPropertyAtKey = valuesOfInterest[0]
							animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName][key] = animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName][assignPropertyAtKey]
						}
						else if (valuesOfInterest[0] == null && valuesOfInterest[1] == null) {
							console.log("Something is wrong with given keyframe values", Object.keys(animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName]))
						}
						else if (valuesOfInterest[0] != null && valuesOfInterest[1] != null) {
							propValueAtLeft = animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName][valuesOfInterest[0]]

							if (typeof propValueAtLeft === 'number') {
								propValueAtRight = animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName][valuesOfInterest[1]]
								animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName][key] = viewX.linearValue(valuesOfInterest[0], valuesOfInterest[1], propValueAtLeft, propValueAtRight, key)
							}
							else {
								animdata.objects[objectFullName]['propertiesToBeAnimated'][propertyName][key] = propValueAtLeft
							}
							
						}

					}
				}
			}
		}
		
	}


	animoptions.animationAt = animoptions.animationAt || 0
	animoptions.playing = animoptions.playing || 'no'

	viewX.animationData[animname] = [animdata, animoptions]

}

viewX.setAnimationFrame = function(animname, atKey) {
	animoptions = viewX.animationData[animname][1]
	animdata = viewX.animationData[animname][0]

	atKey = atKey || 0

	for (var animObject in animdata.objects) {
		
		propertyValuesToSet = animdata.objects[animObject]['propertySetCalculatedAtKeys'][atKey]
		if (propertyValuesToSet == undefined) {
			propertyValuesToSet = {}
		}
		if (animdata.objects[animObject]['propertySetCalculatedAtKeys'][atKey] === undefined) {
			for (var propertyName in animdata.objects[animObject]['propertiesToBeAnimated']) {
				keyStonesAvailableForProp = Object.keys(animdata.objects[animObject]['propertiesToBeAnimated'][propertyName])
				if (keyStonesAvailableForProp.includes(atKey.toString())) {
					propertyValuesToSet[propertyName] = animdata.objects[animObject]['propertiesToBeAnimated'][propertyName][atKey]
				}
				else {
					valuesOfInterest = viewX.libraryFunctions.findClosestRightAndLeftNumbersInArray(keyStonesAvailableForProp, atKey)
					if (valuesOfInterest[0] == null && valuesOfInterest[1] != null) {
						assignPropertyAtKey = valuesOfInterest[1]
						propertyValuesToSet[propertyName] = animdata.objects[animObject]['propertiesToBeAnimated'][propertyName][assignPropertyAtKey]
					}
					else if (valuesOfInterest[1] == null && valuesOfInterest[0] != null) {
						assignPropertyAtKey = valuesOfInterest[0]
						propertyValuesToSet[propertyName] = animdata.objects[animObject]['propertiesToBeAnimated'][propertyName][assignPropertyAtKey]
					}
					else if (valuesOfInterest[0] == null && valuesOfInterest[1] == null) {
						console.log("Something is wrong with given keyframe values", Object.keys(animdata.objects[animObject]['propertiesToBeAnimated'][propertyName]))
					}
					else if (valuesOfInterest[0] != null && valuesOfInterest[1] != null) {
						propValueAtLeft = animdata.objects[animObject]['propertiesToBeAnimated'][propertyName][valuesOfInterest[0]]
						if (typeof propValueAtLeft === 'number') {
							propValueAtRight = animdata.objects[animObject]['propertiesToBeAnimated'][propertyName][valuesOfInterest[1]]
							propertyValuesToSet[propertyName] = viewX.linearValue(valuesOfInterest[0], valuesOfInterest[1], propValueAtLeft, propValueAtRight, atKey)
						}
						else {
							propertyValuesToSet[propertyName] = propValueAtLeft
						}
						
					}
				}
			}

		}

		graphOfObject = animdata.objects[animObject]['graphName']
		theObjectName = animdata.objects[animObject]['objectName']
		if (animdata.objects[animObject]['objectType'] == 'line') {
			viewX.updateLine(graphOfObject, theObjectName, propertyValuesToSet)
		}
		else if (animdata.objects[animObject]['objectType'] == 'rectangle') {
			viewX.updateRectangle(graphOfObject, theObjectName, propertyValuesToSet)
		}
		else if (animdata.objects[animObject]['objectType'] == 'circle') {
			viewX.updateCircle(graphOfObject, theObjectName, propertyValuesToSet)
		}
		else if (animdata.objects[animObject]['objectType'] == 'point') {
			viewX.updatePoint(graphOfObject, theObjectName, propertyValuesToSet)
		}
		else if (animdata.objects[animObject]['objectType'] == 'text') {
			viewX.updateText(graphOfObject, theObjectName, propertyValuesToSet)
		}
		else if (animdata.objects[animObject]['objectType'] == 'path') {
			viewX.updatePath(graphOfObject, theObjectName, propertyValuesToSet)
		}
		else if (animdata.objects[animObject]['objectType'] == 'arrow') {
			viewX.updateArrow(graphOfObject, theObjectName, propertyValuesToSet)
		}

		animdata.objects[animObject]['propertySetCalculatedAtKeys'][atKey] = propertyValuesToSet

	}

	animoptions.animationAt = atKey

	viewX.animationData[animname][0] = Object.assign({}, animdata)
	viewX.animationData[animname][1] = Object.assign({}, animoptions)

}


viewX.playAnimation = function(animname, startKey, endKey, animDuration, frameRate) {
	animoptions = viewX.animationData[animname][1]
	animdata = viewX.animationData[animname][0]

	if (startKey === undefined) {
		startKey = 0
	}

	if (endKey === undefined) {
		endKey = Object.keys(animoptions.keyframes).length - 1
	}

	if (endKey != startKey) {
		animoptions.duration = animDuration || animoptions.duration

		if (frameRate != undefined) {
			animoptions.frameRate = frameRate
		}
		else {
			animoptions.frameRate = 30
		}
		

		animoptions.startKey = startKey
		animoptions.endKey = endKey

		animoptions.animationDelta =  ((endKey - startKey)/(animoptions.duration*animoptions.frameRate))

		animoptions.playing = 'yes'
		animoptions.animationAt = startKey

		
		viewX.animationData[animname][1] = Object.assign({}, animoptions)

		viewX.animationIntervals[animname] = setInterval(function() {
			animoptions = viewX.animationData[animname][1]
			animoptions.animationAt = animoptions.animationAt + animoptions.animationDelta
			if (animoptions.endKey > animoptions.startKey) {
				if (animoptions.endKey - animoptions.animationDelta <= animoptions.animationAt) {
					viewX.stopAnimation(animname)
				}
				else {
					viewX.setAnimationFrame(animname, animoptions.animationAt)
				}
			}
			else {
				if (animoptions.endKey >= animoptions.animationAt - animoptions.animationDelta) {
					viewX.stopAnimation(animname)
				}
				else {
					viewX.setAnimationFrame(animname, animoptions.animationAt)
				}
			}
			
		}, 1000/animoptions.frameRate);
	}
	else {
		console.log("Error with given start and end keys. They are equal")
	}

}


viewX.stopAnimation = function(animname) {
	clearInterval(viewX.animationIntervals[animname])
}

viewX.playAnimationToFrame = function(animname, atKey, animDuration, frameRate) {
	viewX.stopAnimation(animname);
	viewX.playAnimation(animname, viewX.animationData[animname][1].animationAt, atKey, animDuration, frameRate)
}



viewX.libraryFunctions = {}
viewX.libraryFunctions.findClosestRightAndLeftNumbersInArray = function(theArray, toTheNumber) {
	theArray = theArray.slice()
	for (let i = 0; i < theArray.length; i++) {
		theArray[i] = parseFloat(theArray[i])
	}
	let valueLeft = null;
	let valueRight = null;

	for (let i = 0; i < theArray.length; i++) {
		if (theArray[i] <= toTheNumber && (valueLeft === null || theArray[i] > valueLeft)) {
			valueLeft = theArray[i];
		}
		if (theArray[i] > toTheNumber && (valueRight === null || theArray[i] < valueRight)) {
			valueRight = theArray[i];
		}
	}

	return [valueLeft, valueRight];

}

viewX.uid = 0
viewX.graphData = {}
viewX.graphData.objectType = {}

viewX.animationIntervals = {}

viewX.reverseGraphElementMap = {}

viewX.darkmode = false;