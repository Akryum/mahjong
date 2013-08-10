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
	
	private var _mod:ModModel;
	
	private var _tiles:Array<MapTile>;
	
	private var _tileLayers:Array<Array<MapTile>>;
	
	// Collision 3D grid (each position is half-tile sized)
	private var _grid:Array<Array<Array<MapTile>>>;
	
	// For map generation
	private var _openTiles:Array<MapTile>;
	private var _generatedTiles:Array<MapTile>;

	public function new() 
	{
		super();
		
		_grid = new Array();
		_tiles = new Array();
		_tileLayers = new Array();
		_openTiles = new Array();
		_generatedTiles = new Array();
	}
	
	override public function destroy():Void 
	{
		super.destroy();
		
		_grid = null;
		_tiles = null;
		_tileLayers = null;
		_openTiles = null;
		_generatedTiles = null;
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
		_grid = new Array();
		// Creates the empty collision grid
		var gridLayer:Array<Array<MapTile>>;
		for (i in 0...lines.length)
		{
			gridLayer = new Array();
			for (y in 0..._height * 2)
			{
				gridLayer[y] = new Array();
				for (x in 0..._width * 2)
				{
					gridLayer[y][x] = null;
				}
			}
			
			_grid.push(gridLayer);
		}
		
		// Plain tile list
		_tiles = new Array();
		// Per layer list
		_tileLayers = new Array();
		
		var tiles:Array<String>;
		var tile:MapTile;
		var x:Int = 0;
		var y:Int = 0;
		var layerIndex:Int = 0;
		// For each layer
		for (layerData in lines)
		{
			// Resets the position
			x = 0;
			y = 0;
			
			_tileLayers[layerIndex] = new Array();
			
			// Makes an array containing the chars of the layer
			tiles = layerData.split("");
			// For each char in the layer
			for (tileChar in tiles)
			{
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
					
					// Fill the collision grid
					for (dY in 0...2)
					{
						for (dX in 0...2)
						{
							_grid[layerIndex][cast tile.y * 2 + dY][cast tile.x * 2 + dX] = tile;
						}
					}
					
					_tiles.push(tile);
					_tileLayers[layerIndex].push(tile);
				}
				
				// Updates the tile position in the 2D array of the layer
				x ++;
				if (x == _width)
				{
					x = 0;
					y ++;
				}
			}
			
			layerIndex ++;
		}
		
		// Grid Check
		/*for (gridLayer in _grid)
		{
			trace("-------------");
			
			for (row in gridLayer)
			{
				var t:String = "";
				
				for (col in row)
				{
					if (col == null)
					{
						t += " ";
					}
					else
					{
						t += "+";
					}
				}
			
				trace(t);
			}
		}*/
	}
	
	/**
	 * Indicates if the tile position is open on the sides (left or right) and on top of it. If true, a tile at this position can be played.
	 * @param	layer
	 * @param	x
	 * @param	y
	 * @return
	 */
	public function isPositionOpen(layer:Int, x:Float, y:Float):Bool
	{
		var mapTile:MapTile;
		
		// Tiles on the left and on the right
		var posX:Array<Int> = [ -1, -1, 2, 2];
		var posY:Array<Int> = [ 0, 1, 0, 1];
		var posScoreIndex:Array<Int> = [0, 0, 1, 1];
		var posScore:Array<Int> = [0, 0];
		for (i in 0...posX.length)
		{
			mapTile = _grid[layer][cast y * 2 + posY[i]][cast x * 2 + posX[i]];
			
			if (mapTile != null && mapTile.enabled)
			{
				posScore[posScoreIndex[i]] ++;
			}
		}
		if (posScore[0] > 0 && posScore[1] > 0)
		{
			return false;
		}
		
		// Tiles on top
		for (layerIndex in layer + 1..._grid.length)
		{
			for (dY in 0...2)
			{
				for (dX in 0...2)
				{
					mapTile = _grid[layerIndex][cast y * 2 + dY][cast x * 2 + dX];
					
					if (mapTile != null && mapTile.enabled)
					{
						return false;
					}
				}
			}
		}
		
		return true;
	}
	
	/**
	 * Places each tiles on the map.
	 */
	public function build():Void
	{
		_openTiles = new Array();
		_generatedTiles = new Array();
		
		// Empties the map
		for (tile in _tiles)
		{
			tile.enabled = false;
			tile.model = null;
			tile.tile = null;
		}
		
		// Association list copy
		var associations:Array<Array<TileModel>> = new Array();
		var tile1:TileModel, tile2:TileModel;
		for (asso in _mod.associations)
		{
			tile1 = _mod.getTileByName(asso[0]);
			tile2 = _mod.getTileByName(asso[1]);
			if (tile1 != null && tile2 != null)
			{
				associations.push([tile1, tile2]);
			}
		}
		
		// TESTS
		for (tile in _tiles)
		{
			_openTiles.push(tile);
		}
		
		// Tiles
		while (associations.length > 0)
		{
			// Chooses randomly an association
			var index:Int = Math.round(Math.random() * (associations.length - 1));
			var asso:Array<TileModel> = associations.splice(index, 1)[0];
			
			// Chooses randomly 2 tile positions among the open positions
			var positions:Array<MapTile> = _getNextGenerationPositions();
			
			// Link the tile model and the tile position (it's ready!)
			for (tileModel in asso)
			{
				var tileMap = positions.pop();
				tileMap.model = tileModel;
				tileMap.enabled = true;
				_generatedTiles.push(tileMap);
			}
		}
		
	}
	
	/* PRIVATE */
	
	/**
	 * Returns a two-sized array with the next randomly choosen free positions.
	 * @return
	 */
	private function _getNextGenerationPositions():Array<MapTile>
	{
		//_updateOpenTiles();
		
		var pos:Array<MapTile> = new Array();
		
		for (i in 0...2)
		{
			var index:Int = Math.round(Math.random() * (_openTiles.length - 1));
			pos.push(_openTiles.splice(index, 1)[0]);
		}
		
		return pos;
	}
	
	private function _updateOpenTiles():Void
	{
		// First tiles
		if (_generatedTiles.length == 0)
		{
			var firstLayerTiles:Array<MapTile> = _tileLayers[0];
			var firstTile:MapTile = firstLayerTiles[Math.round(Math.random() * (firstLayerTiles.length - 1))];
			_openTiles.push(firstTile);
			
			// TODO open tiles updating
		}
		else
		{
			
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
	
	function get_tiles():Array<MapTile> 
	{
		return _tiles;
	}
	
	/**
	 * Plain tile list.
	 */
	public var tiles(get_tiles, null):Array<MapTile>;
	
	function get_grid():Array<Array<Array<MapTile>>> 
	{
		return _grid;
	}
	
	/**
	 * Collision grid.
	 */
	public var grid(get_grid, null):Array<Array<Array<MapTile>>>;
	
	function get_openTiles():Array<MapTile> 
	{
		return _openTiles;
	}
	
	public var openTiles(get_openTiles, null):Array<MapTile>;
	
	function get_generatedTiles():Array<MapTile> 
	{
		return _generatedTiles;
	}
	
	public var generatedTiles(get_generatedTiles, null):Array<MapTile>;
	
	function get_mod():ModModel 
	{
		return _mod;
	}
	
	function set_mod(value:ModModel):ModModel 
	{
		return _mod = value;
	}
	
	public var mod(get_mod, set_mod):ModModel;
	
}