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