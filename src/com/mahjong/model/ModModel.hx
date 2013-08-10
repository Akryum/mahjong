package com.mahjong.model;
import com.gamekit.mvc.model.Model;

/**
 * ...
 * @author Guillaume CHAU
 */
class ModModel extends Model
{
	private var _author:String = "";
	private var _rules:String = "";
	
	private var _tiles:Array<TileModel>;
	private var _associations:Array<Array<String>>;

	public function new() 
	{
		super();
		
		_tiles = new Array();
		_associations = new Array();
	}
	
	override public function destroy():Void 
	{
		super.destroy();
		
		for (tile in _tiles)
		{
			tile.destroy();
		}
		
		_tiles = null;
		_associations = null;
	}
	
	override public function parseJson(data:Dynamic):Void 
	{
		super.parseJson(data);
		
		// Mod details
		_author = data.author;
		_rules = data.rules;
		
		// Tile models
		if (data.pieces != null)
		{
			var tileModel:TileModel;
			for (tile in cast(data.pieces, Array<Dynamic>))
			{
				tileModel = new TileModel();
				tileModel.parseJson(tile);
				_tiles.push(tileModel);
			}
		}
		
		// Associations
		if (data.associations != null)
		{
			for (association in cast(data.associations, Array<Dynamic>))
			{
				_associations.push([association[0], association[1]]);
			}
		}
	}
	
	/**
	 * Returns the tile with the given name. If not found, returns null.
	 * @param	name	Searched tile name
	 * @return	Tile with the given name or null
	 */
	public function getTileByName(name:String):TileModel
	{
		for (tile in _tiles)
		{
			if (tile.name == name)
			{
				return tile;
			}
		}
		return null;
	}
	
	/**
	 * Indicates if two tiles are associated.
	 * @param	tile1
	 * @param	tile2
	 * @return	Boolean
	 */
	public function areAssociated(tile1:TileModel, tile2:TileModel):Bool
	{
		for (asso in _associations)
		{
			if ((asso[0] == tile1.name && asso[1] == tile2.name) || (asso[1] == tile1.name && asso[0] == tile2.name))
			{
				return true;
			}
		}
		return false;
	}
	
	/* GETTERS */
	
	function get_author():String 
	{
		return _author;
	}
	
	function set_author(value:String):String 
	{
		return _author = value;
	}
	
	/**
	 * Mod author name.
	 */
	public var author(get_author, set_author):String;
	
	function get_rules():String 
	{
		return _rules;
	}
	
	function set_rules(value:String):String 
	{
		return _rules = value;
	}
	
	/**
	 * Text description of the mod rules.
	 */
	public var rules(get_rules, set_rules):String;
	
	function get_tiles():Array<TileModel> 
	{
		return _tiles;
	}
	
	function set_tiles(value:Array<TileModel>):Array<TileModel> 
	{
		return _tiles = value;
	}
	
	/**
	 * List of the tile models provided by the mod.
	 */
	public var tiles(get_tiles, set_tiles):Array<TileModel>;
	
	function get_associations():Array<Array<String>> 
	{
		return _associations;
	}
	
	function set_associations(value:Array<Array<String>>):Array<Array<String>> 
	{
		return _associations = value;
	}
	
	/**
	 * Associations of tile models.
	 */
	public var associations(get_associations, set_associations):Array<Array<String>>;
}