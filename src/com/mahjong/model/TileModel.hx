package com.mahjong.model;

import com.gamekit.mvc.model.Model;
import com.gamekit.text.LatexParser;

/**
 * ...
 * @author Guillaume CHAU
 */
class TileModel extends Model
{
	private var _type:String = "text";
	private var _value:String = "";
	private var _rotated:Bool = false;
	private var _information:String = "";
	private var _context:String = null;
	
	public function new() 
	{
		super();
		
	}
	
	/* PRIVATE */
	
	override private function _parseJson(data:Dynamic):Void 
	{
		super._parseJson(data);
		
		
		if (data.type == "text" || data.type == "image")
		{
			_type = data.type;
		}
		
		if (_type == "text")
		{
			_value = LatexParser.toHtml(data.value);
		}
		
		_rotated = data.rotate;
		
		if (data.information != null)
		{
			_information = data.information;
		}
		else
		{
			_information = "";
		}
		
		_context = data.context;
	}
	
	/* GETTERS */
	
	function get_type():String 
	{
		return _type;
	}
	
	function set_type(value:String):String 
	{
		return _type = value;
	}
	
	/**
	 * Tile type, either "text" or "image".
	 * @default		"text"
	 */
	public var type(get_type, set_type):String;
	
	function get_value():String 
	{
		return _value;
	}
	
	function set_value(value:String):String 
	{
		return _value = value;
	}
	
	/**
	 * Tile value. If tile type is "text", value is the tile's label to be displayed. Else, if tile type is "image", value is the URL of the image to display inside the tile.
	 */
	public var value(get_value, set_value):String;
	
	function get_rotated():Bool 
	{
		return _rotated;
	}
	
	function set_rotated(value:Bool):Bool 
	{
		return _rotated = value;
	}
	
	/**
	 * Indicates if the label must be rotated.
	 * @default		false
	 */
	public var rotated(get_rotated, set_rotated):Bool;
	
	function get_information():String 
	{
		return _information;
	}
	
	function set_information(value:String):String 
	{
		return _information = value;
	}
	
	/**
	 * Additionnal information/description of the tile.
	 */
	public var information(get_information, set_information):String;
	
	function get_context():String 
	{
		return _context;
	}
	
	function set_context(value:String):String 
	{
		return _context = value;
	}
	
	/**
	 * Tile context. Tiles with the same context can't be paired.
	 * @default		null
	 */
	public var context(get_context, set_context):String;
	
}