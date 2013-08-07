package com.gamekit.mvc.model;
import com.gamekit.core.IDestroyable;
import com.gamekit.core.IJsonParsable;
import flash.events.Event;
import flash.events.EventDispatcher;
import haxe.xml.Fast;

/**
 * ...
 * @author Guillaume CHAU
 */
class Model extends EventDispatcher implements IDestroyable implements IJsonParsable
{
	private var _name:String = "unnamed";

	public function new() 
	{
		super();
	}
	
	/* INTERFACE com.gamekit.core.IDestroyable */
	
	public function destroy():Void 
	{
		
	}
	
	/* INTERFACE com.gamekit.core.IJsonParsable */
	
	public function parseJson(data:Dynamic):Void 
	{
		_parseJson(data);
		_update();
	}
	
	/**
	 * Call this if you made changes to the attributes and want to apply them.
	 */
	public function update():Void
	{
		_update();
	}
	
	/* PRIVATE */
	
	/**
	 * Called when any value is changed.
	 */
	private function _update():Void
	{
		dispatchEvent(new Event(Event.CHANGE));
	}
	
	/**
	 * Extracts data from json object.
	 * @param	json
	 */
	private function _parseJson(data:Dynamic):Void
	{
		_name = data.name;
	}
	
	/* GETTERS */
	
	function get_name():String 
	{
		return _name;
	}
	
	function set_name(value:String):String 
	{
		return _name = value;
	}
	
	public var name(get_name, set_name):String;
	
}