'use strict';
console.log( 'init.js was loaded' );

var doc =
    {
        id : function( name )
        {
            return document.getElementById( name );
        },

        tag : function( name )
        {
            return document.getElementsByTagName( name );
        },

        class : function( name )
        {
            return document.getElementsByClassName( name );
        },

        name : function( name )
        {
            return document.getElementsByName( name );
        },

    };
