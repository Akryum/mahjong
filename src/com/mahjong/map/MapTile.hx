package com.mahjong.map;

/**
 * ...
 * @author Guillaume CHAU
 */
class MapTile
{
	private var _x:Float;
	private var _y:Float;
	private var _layer:Int;

	public function new() 
	{
		
	}
	
	/* GETTERS */
	
	function get_x():Float 
	{
		return _x;
	}
	
	function set_x(value:Float):Float 
	{
		return _x = value;
	}
	
	public var x(get_x, set_x):Float;
	
	function get_y():Float 
	{
		return _y;
	}
	
	function set_y(value:Float):Float 
	{
		return _y = value;
	}
	
	public var y(get_y, set_y):Float;
	
	function get_layer():Int 
	{
		return _layer;
	}
	
	function set_layer(value:Int):Int 
	{
		return _layer = value;
	}
	
	public var layer(get_layer, set_layer):Int;
	
}