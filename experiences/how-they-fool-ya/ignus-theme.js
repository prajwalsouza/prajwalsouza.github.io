ignusTheme = {}

ignusTheme.baseHue = 260;
ignusTheme.baseLightness = 50;
ignusTheme.backgroundDarkness = 0;

ignusTheme.designType = 'simple shadow' // flat, neumorphic, simple shadow, custom

ignusTheme.generateRSS = function () {
    ignusTextWhiteDuringColored = (ignusTheme.baseHue >=0 && ignusTheme.baseHue <=34) || (ignusTheme.baseHue >=195 && ignusTheme.baseHue <=360)
    if (ignusTextWhiteDuringColored) {
        ignusTextColorDuringColoredBackground = 'white';
        ignusReadingTextColor = 'hsla(var(--base-hue), 100%, 50%, 1)';
    }
    else {
        ignusTextColorDuringColoredBackground = 'black';
        ignusReadingTextColor = 'hsla(var(--base-hue), 100%, 35%, 1)';
    }

    ignusTextColorDuringColoredBackgroundOnHover = 'white';

    if (ignusTheme.designType == 'neumorphic') {
        ignusTheme.largeShadows = '-12px -12px 8px -2px hsla(198, 100%, 100%, 1), 4px 4px 20px -10px hsla(198, 100%, 0%, 0.5)';
        ignusTheme.smallShadows = '-2px -2px 10px 2px hsla(198, 100%, 100%, 1), 2px 2px 10px -3px hsla(198, 100%, 0%, 0.5)';
    }
    else if (ignusTheme.designType == 'flat') {
        ignusTheme.largeShadows = '0px 0px 0px 0px hsla(198, 100%, 0%, 0)';
        ignusTheme.smallShadows = '0px 0px 0px 0px hsla(198, 100%, 0%, 0)';
    }
    else if (ignusTheme.designType == 'simple shadow') {
        ignusTheme.largeShadows = '4px 4px 8px -6px hsla(0, 0%, 80%, 1)';
        ignusTheme.smallShadows = '4px 4px 10px -7px hsla(0, 0%, 70%, 1)';
    }

    ignusRSS = "<style id='ignus-style-root'>:root {"

    ignusRSS = ignusRSS + "--generalBackground: hsla(0, 0%, " + ignusTheme.backgroundDarkness + "%, 1); "
    ignusRSS = ignusRSS + "--textcolor-for-reading: " + ignusReadingTextColor + ";"
    ignusRSS = ignusRSS + "--textcolor-for-colored-background: " + ignusTextColorDuringColoredBackground + ";"
    ignusRSS = ignusRSS + "--textcolor-for-colored-background-on-hover: " + ignusTextColorDuringColoredBackgroundOnHover + ";"
    ignusRSS = ignusRSS + "--base-hue: " + ignusTheme.baseHue + ";"
    ignusRSS = ignusRSS + "--base-lightness: " + ignusTheme.baseLightness + "%;"
    ignusRSS = ignusRSS + "--base-hue-in-deg: " + ignusTheme.baseHue + "deg;"
    ignusRSS = ignusRSS + "--large-shadows: " + ignusTheme.largeShadows + ";"
    ignusRSS = ignusRSS + "--small-shadows: " + ignusTheme.smallShadows + ";"
    ignusRSS = ignusRSS + "--secondary-hue: " + (ignusTheme.baseHue + 80) + ";"
    ignusRSS = ignusRSS + "}</style>"

    return ignusRSS
}

ignusTheme.rss = ignusTheme.generateRSS();
$('head').append(ignusTheme.rss)

ignusTheme.setRSS = function (theRSS) {
    $('#ignus-style-root').html(theRSS)
}

ignusTheme.setUp = function () {
    ignusTheme.rss = ignusTheme.generateRSS();
    ignusTheme.setRSS(ignusTheme.rss)
}


ignusTheme.hsMoveLeft = function(carousalElement, scrollPercentAmount) {
    $(carousalElement).finish();
    var leftPos = $(carousalElement).scrollLeft();
    elementWidth = $(carousalElement).width()
    $(carousalElement).animate({scrollLeft: leftPos - elementWidth*0.01*scrollPercentAmount}, 300);
}

ignusTheme.hsMoveRight = function(carousalElement, scrollPercentAmount) {
    $(carousalElement).finish();
    var leftPos = $(carousalElement).scrollLeft();
    elementWidth = $(carousalElement).width()
    $(carousalElement).animate({scrollLeft: leftPos + elementWidth*0.01*scrollPercentAmount}, 300);
}

ignusTheme.overlayToggle = function(overlayID) {
    if (!document.getElementById(overlayID).classList.contains('overlay-ignus-visible')) {
        isDirectional = (document.getElementById(overlayID).classList.contains('directional-overlay-outer-ignus'))
        if (isDirectional) {
            theContainer = $('#' + overlayID).find('.bottom-overlay-padding-ignus')[0]
            if (theContainer) {
                $(theContainer).css('bottom', '-' + theContainer.clientHeight + 'px')
                $(theContainer).animate({'bottom': '0px'}, 300)
            }
            theContainer = $('#' + overlayID).find('.left-overlay-padding-ignus')[0]
            if (theContainer) {
                $(theContainer).css('left', '-' + theContainer.clientWidth + 'px')
                $(theContainer).animate({'left': '0px'}, 300)
            }
            theContainer = $('#' + overlayID).find('.top-overlay-padding-ignus')[0]
            if (theContainer) {
                $(theContainer).css('top', '-' + theContainer.clientHeight + 'px')
                $(theContainer).animate({'top': '0px'}, 300)
            }
            theContainer = $('#' + overlayID).find('.right-overlay-padding-ignus')[0]
            if (theContainer) {
                $(theContainer).css('right', '-' + theContainer.clientWidth + 'px')
                $(theContainer).animate({'right': '0px'}, 300)
            }
        }
    }
    if (document.getElementById(overlayID).classList.contains('overlay-ignus-visible')) {
        isDirectional = (document.getElementById(overlayID).classList.contains('directional-overlay-outer-ignus'))
        if (isDirectional) {
            theContainer = $('#' + overlayID).find('.bottom-overlay-padding-ignus')[0]
            if (theContainer) {
                $(theContainer).css('bottom', '0px')
                $(theContainer).animate({'bottom': '-' + theContainer.clientHeight + 'px'}, 300)
                $(theContainer).css('bottom', '0px')
            }
            theContainer = $('#' + overlayID).find('.left-overlay-padding-ignus')[0]
            if (theContainer) {
                $(theContainer).css('left', '0px')
                $(theContainer).animate({'left': '-' + theContainer.clientWidth + 'px'}, 300)
                $(theContainer).css('left', '0px')
            }
            theContainer = $('#' + overlayID).find('.top-overlay-padding-ignus')[0]
            if (theContainer) {
                $(theContainer).css('top', '0px')
                $(theContainer).animate({'top': '-' + theContainer.clientHeight + 'px'}, 300)
                $(theContainer).css('top', '0px')
            }
            theContainer = $('#' + overlayID).find('.right-overlay-padding-ignus')[0]
            if (theContainer) {
                $(theContainer).css('right', '0px')
                $(theContainer).animate({'right': '-' + theContainer.clientWidth + 'px'}, 300)
                $(theContainer).css('right', '0px')
            }
        }
    }
    
    document.getElementById(overlayID).classList.toggle('overlay-ignus-visible')
    
}

ignusTheme.escape = function(event) {
    if (event.key == 'Escape') {
        visibleOverlays = document.getElementsByClassName('overlay-ignus-visible')
        for (k = 0; k < visibleOverlays.length; k++) {
            visibleOverlays[k].classList.toggle('overlay-ignus-visible')
        }
    }
}

window.addEventListener('keyup', ignusTheme.escape)

ignusTheme.hsControlRequirement = function () {
    hsElements = document.getElementsByClassName('hs-container-inner-ignus');
    for (k = 0; k < hsElements.length; k++) {
        hsElement = hsElements[k];
        hsLeft = hsElement.parentNode.getElementsByClassName('hs-container-left-button-ignus')[0]
        hsRight = hsElement.parentNode.getElementsByClassName('hs-container-right-button-ignus')[0]

        
        if (hsElement.scrollWidth == hsElement.clientWidth) {  
            hsElement.style.paddingLeft = '0px';
            hsElement.style.paddingRight = '0px';
            if (hsLeft.classList.contains('d-sm-flex')) {
                hsLeft.classList.remove('d-sm-flex')
            }
            if (hsRight.classList.contains('d-sm-flex')) {
                hsRight.classList.remove('d-sm-flex')
            }
        }
        else {
            if (window.innerWidth >= 576) {
                hsElement.style.paddingLeft = '50px';
                hsElement.style.paddingRight = '50px';
            }
            else {
                hsElement.style.paddingLeft = '0px';
                hsElement.style.paddingRight = '0px';
            }

           
            if (!hsLeft.classList.contains('d-sm-flex')) {
                hsLeft.classList.add('d-sm-flex')
            }
            if (!hsRight.classList.contains('d-sm-flex')) {
                hsRight.classList.add('d-sm-flex')
            }

            if (hsLeft.classList.contains('d-sm-flex') && hsElement.scrollLeft == 0) {
                hsLeft.classList.remove('d-sm-flex')
            }

            if (hsRight.classList.contains('d-sm-flex') && Math.ceil(hsElement.scrollLeft) == hsElement.scrollWidth - hsElement.clientWidth) {
                hsRight.classList.remove('d-sm-flex')
            }


        }
    }
}

$(document).ready(function() {
    setInterval(ignusTheme.hsControlRequirement, 300);
});