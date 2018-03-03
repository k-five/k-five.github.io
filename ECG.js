"use strict";

function ECG()
{
    this.svgns = 'http://www.w3.org/2000/svg';
    this.begin = 0;
    this.offset = 10;
    this.baseline = 80;
    this.ecg_counter = 0;
    this.total_length = 0;
    this.window_width = 0;
}

ECG.prototype.draw = function()
{
    var result = '';

    while( this.begin <= this.window_width )
    {
        ++this.ecg_counter;

        var L0 = this.begin + ',' + this.baseline;

        result += ' ' + L0;
        if( this.begin >= this.window_width ) break;

        this.begin += this.offset;
        var L1 = this.begin + ',' + this.baseline;

        result += ' ' + L1;
        if( this.begin >= this.window_width ) break;

        this.begin += this.offset;
        this.baseline -= this.offset;
        var L2 = this.begin + ',' + this.baseline;

        result += ' ' + L2;
        if( this.begin >= this.window_width ) break;

        this.baseline += this.offset;
        this.begin += this.offset;
        var L3 = this.begin + ',' + this.baseline;

        result += ' ' + L3;
        if( this.begin >= this.window_width ) break;

        this.begin += this.offset;
        this.baseline = 80;
        var L4 = this.begin + ',' + this.baseline;

        result += ' ' + L4;
        if( this.begin >= this.window_width ) break;

        this.begin += this.offset;
        this.baseline += this.offset;
        var L5 = this.begin + ',' + this.baseline;

        result += ' ' + L5;
        if( this.begin >= this.window_width ) break;

        this.begin += this.offset;
        this.baseline = 0;
        var L6 = this.begin + ',' + this.baseline;

        result += ' ' + L6;
        if( this.begin >= this.window_width ) break;

        this.begin += this.offset;
        this.baseline = 90;
        var L7 = this.begin + ',' + this.baseline;

        result += ' ' + L7;
        if( this.begin >= this.window_width ) break;

        this.begin += this.offset;
        this.baseline = 80;
        var L8 = this.begin + ',' + this.baseline;

        result += ' ' + L8;
        if( this.begin >= this.window_width ) break;

        this.begin += this.offset;
        var L9 = this.begin + ',' + this.baseline;

        result += ' ' + L9;
        if( this.begin >= this.window_width ) break;

        this.begin += this.offset;
        this.baseline = 55;
        var L10 = this.begin + ',' + this.baseline;

        result += ' ' + L10;
        if( this.begin >= this.window_width ) break;

        this.begin += this.offset;
        this.baseline = 80;
        var L11 = this.begin + ',' + this.baseline;

        result += ' ' + L11;
        if( this.begin >= this.window_width ) break;

        this.begin += 20;
    }

    return result;
}

ECG.prototype.svg = function()
{
    this.window_width = window.innerWidth;

    var svg = document.createElementNS( this.svgns, 'svg' );
    svg.setAttribute( 'xmlns', this.svgns );
    svg.setAttribute( 'xmlns:xlink', 'http://www.w3.org/1999/xlink'  );
    svg.setAttribute( 'width', this.window_width + 'px' );
    svg.setAttribute( 'height', 100 + 'px');
    // svg.setAttribute( 'viewBox', '0 0  ' + this.oww + ' ' +  (  100 ) );
    svg.setAttribute( 'preserveAspectRatio', 'xMinYMin meet' );
    svg.setAttribute( 'id', 'svg' );

    document.body.appendChild( svg );
}

// function update_stroke()
// {
//     var line = doc.id( 'path' );
//     line.setAttribute( 'stroke', '#CB0000' );
// }

ECG.prototype.set_total_length = function( size )
{
    var line = doc.id( 'path' );
    this.total_length = Math.floor( line.getTotalLength() );
    line.setAttribute( 'stroke-dasharray', this.total_length );
    line.setAttribute( 'stroke-dashoffset', this.total_length );
    // line.style.animationDuration = this.ecg_counter + 's';
}

ECG.prototype.animate = function()
{
    // drawing ECG
    // <animate attributeType="XML" attributeName="stroke-dashoffset" to="0" dur="13s"  repeatCount="indefinite" />
    var animate = document.createElementNS( this.svgns, 'animate' );
    animate.setAttribute( 'attributeType', 'XML' );
    animate.setAttribute( 'id', 'animate-ECG' );
    animate.setAttribute( 'attributeName', 'stroke-dashoffset' );
    animate.setAttribute( 'to', "0" );
    animate.setAttribute( 'dur', this.ecg_counter + 's' );
    animate.setAttribute( 'repeatCount', 'indefinite' );

    var polyline = doc.id( 'path' );
    polyline.appendChild( animate );

    // for blinking
    // <animate attributeName="stroke" attributreType="XML" to="#EEE" dur="1" repeatCount="indefinite" >

    // animate = document.createElementNS( this.svgns, 'animate' );
    // animate.setAttribute( 'attributeType', 'XML' );
    // animate.setAttribute( 'attributeName', 'stroke' );
    // animate.setAttribute( 'to', "#EEE" );
    // animate.setAttribute( 'dur', '1s' );
    // animate.setAttribute( 'repeatCount', 'indefinite' );

    // polyline.appendChild( animate );

    // <animate attributeName="stroke" attributreType="XML" begin="svg.mousemove" to="#F00" dur="1s" fill="remove">
    animate = document.createElementNS( this.svgns, 'animate' );
    animate.setAttribute( 'attributeType', 'XML' );
    animate.setAttribute( 'attributeName', 'stroke' );
    animate.setAttribute( 'begin', 'svg.mousemove' );
    animate.setAttribute( 'to', "#CB0000" );
    animate.setAttribute( 'dur', '1s' );
    animate.setAttribute( 'fill', 'remove' );

    polyline.appendChild( animate );
}

ECG.prototype.polyline = function( size )
{
    // id="path"
    // stroke-dasharray="500,300"
    // stroke="#F00"
    // stroke-width="3"
    // stroke-dasharray="800"
    // stroke-dashoffset="800"
    // id="stroke"
    // fill="none"

    var line = document.createElementNS( this.svgns, 'polyline' );
    line.setAttribute( 'xmlns', this.svgns );
    line.setAttribute( 'xmlns:xlink', 'http://www.w3.org/1999/xlink'  );
    line.setAttribute( 'width', this.window_width );
    line.setAttribute( 'height', 100 );

    // line.setAttribute( 'onmouseover', 'update_stroke()' );

    line.setAttribute( 'id', 'path' );
    line.setAttribute( 'fill', 'none' );
    line.setAttribute( 'stroke', '#FFF' );
    line.setAttribute( 'stroke-width', 3 );
    line.setAttribute( 'stroke-dasharray', this.total_length );
    line.setAttribute( 'stroke-dashoffset', this.total_length );
    line.setAttribute( 'fill', 'none' );
    line.setAttribute( 'points', this.draw() );
    var svg = doc.id( 'svg' );
    svg.appendChild( line );

    this.set_total_length();

    this.animate();
}

var ecg = new ECG();
ecg.svg();
ecg.polyline();

function update_size()
{
    console.log( 'update-size' );

    ecg.begin = 0;
    ecg.offset = 10;
    ecg.baseline = 80;
    ecg.ecg_counter = 0;
    ecg.total_length = 0;
    ecg.window_width = 0;

    ecg.window_width = window.innerWidth;

    // var ratio = 1600 / this.window_width
    // var svg = doc.id( 'svg' );
    // svg.setAttribute( 'viewBox', '0 0 ' +  this.window_width + ' ' + Math.floor( 100 * ratio  ) );

    doc.id( 'svg' ).innerHTML = '';
    ecg.polyline();

    var svg = doc.id( 'svg' );
    svg.setAttribute( 'width', ecg.window_width );
}

window.addEventListener( 'resize', update_size );
