package com.mahjong.map;
import com.mahjong.model.TileModel;
import com.mahjong.view.TileView;

/**
 * ...
 * @author Guillaume CHAU
 */
class MapTile
{
	private var _x:Float;
	private var _y:Float;
	private var _layer:Int;
	
	private var _tile:TileView;
	private var _model:TileModel;
	
	private var _enabled:Bool = false;

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
	
	function get_tile():TileView 
	{
		return _tile;
	}
	
	function set_tile(value:TileView):TileView 
	{
		return _tile = value;
	}
	
	public var tile(get_tile, set_tile):TileView;
	
	function get_enabled():Bool 
	{
		return _enabled;
	}
	
	function set_enabled(value:Bool):Bool 
	{
		return _enabled = value;
	}
	
	public var enabled(get_enabled, set_enabled):Bool;
	
	function get_model():TileModel 
	{
		return _model;
	}
	
	function set_model(value:TileModel):TileModel 
	{
		return _model = value;
	}
	
	public var model(get_model, set_model):TileModel;
	
}