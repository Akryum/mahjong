package com.mahjong.model;

import com.gamekit.mvc.model.Model;
import com.mahjong.map.MapTile;

/**
 * ...
 * @author Guillaume CHAU
 */
class MapModel extends Model
{
	private var _width:Int;
	private var _height:Int;
	
	private var _layers:Array<Array<Array<MapTile>>>;
	private var _tiles:Array<MapTile>;

	public function new() 
	{
		super();
		
		_layers = new Array();
		_tiles = new Array();
	}
	
	override public function destroy():Void 
	{
		super.destroy();
		
		_layers = null;
		_tiles = null;
	}
	
	public function parseString(data:String):Void
	{
		// Remove trailling spaces
		data = StringTools.rtrim(data);
		// Remove returns
		data = StringTools.replace(data, "\n", "");
		
		// Lines
		if (data.charAt(data.length - 1) == ";")
		{
			data = data.substr(0, data.length - 1);
		}
		var lines:Array<String> = data.split(";");
		
		// Details
		var details:Array<String> = lines.shift().split(",");
		_name = details[0];
		_width = Std.parseInt(details[1]);
		_height = Std.parseInt(details[2]);
		
		// Data
		// Conversion from a 1D array of chars to a 2D array, for each layer (separated with ";").
		_layers = new Array();
		_tiles = new Array();
		var tiles:Array<String>;
		var tile:MapTile;
		var layer:Array<Array<MapTile>>;
		var x:Int = 0;
		var y:Int = 0;
		var layerIndex:Int = 0;
		// For each layer
		for (layerData in lines)
		{
			// Resets the position
			x = 0;
			y = 0;
			// New layer
			layer = new Array();
			// Makes an array containing the chars of the layer
			tiles = layerData.split("");
			// For each char in the layer
			for (tileChar in tiles)
			{
				if (layer[y] == null)
				{
					layer[y] = new Array();
				}
				
				if (tileChar == ".")
				{
					tile = null;
				}
				else
				{
					tile = new MapTile();
					tile.x = x;
					tile.y = y;
					tile.layer = layerIndex;
					
					if (tileChar == "%" || tileChar == "#")
					{
						tile.y -= 0.5;
					}
					if (tileChar == "&" || tileChar == "#")
					{
						tile.x -= 0.5;
					}
					
					_tiles.push(tile);
				}
				
				layer[y][x] = tile;
				// Updates the tile position in the 2D array of the layer
				x ++;
				if (x == _width)
				{
					x = 0;
					y ++;
				}
			}
			_layers.push(layer);
			
			layerIndex ++;
		}
	}
	
	/* GETTERS */
	
	function get_width():Int 
	{
		return _width;
	}
	
	function set_width(value:Int):Int 
	{
		return _width = value;
	}
	
	/**
	 * Horizontal size of the map (unit: tile).
	 */
	public var width(get_width, set_width):Int;
	
	function get_height():Int 
	{
		return _height;
	}
	
	function set_height(value:Int):Int 
	{
		return _height = value;
	}
	
	/**
	 * Vertical size of the map (unit: tile).
	 */
	public var height(get_height, set_height):Int;
	
	function get_layers():Array<Array<Array<MapTile>>> 
	{
		return _layers;
	}
	
	/**
	 * Map data.
	 */
	public var layers(get_layers, null):Array<Array<Array<MapTile>>>;
	
	function get_tiles():Array<MapTile> 
	{
		return _tiles;
	}
	
	/**
	 * Plain tile list.
	 */
	public var tiles(get_tiles, null):Array<MapTile>;
	
}