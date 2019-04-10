/*
	Copyright 2018 [4ddev *see github.com/4ddev]

	Permission is hereby granted, free of charge, to any person obtaining a copy 
	of this software and associated documentation files (the "Software"), 
	to deal in the Software without restriction, including without limitation 
	the rights to use, copy, modify, merge, publish, distribute, sublicense, 
	and/or sell copies of the Software, and to permit persons to whom the Software 
	is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be 
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
	DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
	ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
	OTHER DEALINGS IN THE SOFTWARE.
*/
class Set{
	constructor(){
		this.keys = [];
	}
	// Stores Classes
	put(){
		for( let i = 0; i < arguments.length; i++){
		   if( arguments[i].name != null ) this.keys[arguments[i].name] = arguments[i];
		}
		return this;
	}
	contains( obj ){
		return this.keys[obj]!=null;
	}
	
	remove( obj ){
		this.keys[obj] = null;
		delete this.keys[obj];
	}
	get( key ){
		return this.keys[key];
	}
}

class HandleMessage{
	/* Does not attach function's or their return values just atomic values */
	static wrapMessage( obj ){
		return JSON.stringify( { type: obj.constructor.name, body: Object.assign( {},obj ) } );
	}
	/*
	   @param json Some Object or an String which will be parsed to an Object by json.parse 
	   @param classes Check's incoming Message against this ClassSet if no class with the name was 
	                  found, it will remove null 
       @return null If the class was not found
	           Object The instantianted Object in the Classlist 
	*/			   
	static createInstance(json,classes){
		if ( json.constructor.name == "String" ){ json = JSON.parse(json); }
		
		if (classes.contains(json.type.toString()) ) { 
			return Object.assign(new (classes.get(json.type))(),json.body); 
		}
		return null;
		//throw new Error("Method is not allowed "+json.type.toString());  // Use this if you wanna have an exception 
	}
}

module.exports = {
	HandleMessage: HandleMessage,
	ClassSet: Set,
	createInstance: HandleMessage.createInstance,
	wrapMessage: HandleMessage.wrapMessage,
}