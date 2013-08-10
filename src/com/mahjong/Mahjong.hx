package com.mahjong;

import com.mahjong.controller.TileController;
import com.mahjong.model.MapModel;
import com.mahjong.model.ModModel;
import com.mahjong.model.TileModel;
import com.mahjong.view.MapView;
import com.mahjong.view.TileView;
import flash.display.Sprite;
import flash.events.Event;
import flash.Lib;
import flash.net.URLLoader;
import flash.net.URLRequest;
import haxe.Timer;
import tjson.TJSON;

/**
 * ...
 * @author Guillaume CHAU
 */
class Mahjong extends Sprite
{
	// Data
	private var _modLoader:URLLoader;
	private var _activeMod:ModModel;
	
	private var _mapLoader:URLLoader;
	private var _activeMap:MapModel;
	
	// Display
	private var _map:MapView;
	private var _mapContainer:Sprite;
	
	// Logic
	private var _tileController:TileController;

	public function new() 
	{
		super();
		
		_mapContainer = new Sprite();
		addChild(_mapContainer);
		
		_map = new MapView();
		_mapContainer.addChild(_map);
		
		_tileController = new TileController();
		
		Lib.current.stage.addEventListener(Event.RESIZE, _onStageResize);
		_onStageResize(null);
		
		// TESTS
		loadMod('data/mods/elements.json');
		loadMap('data/maps/turtle');
	}
	
	public function loadMod(url:String):Void
	{
		// Cancel current loading operation if any
		if (_modLoader != null)
		{
			#if html5
			
			#else
			_modLoader.close();
			#end
		}
		
		// Clear the active mod
		if (_activeMod != null)
		{
			_activeMod.destroy();
			_activeMod = null;
		}
		
		// Loader
		_modLoader = new URLLoader();
		_modLoader.addEventListener(Event.COMPLETE, _onModLoaded);
		_modLoader.load(new URLRequest(url));
	}
	
	public function loadMap(url:String):Void
	{
		// Cancel current loading operation if any
		if (_mapLoader != null)
		{
			#if html5
			
			#else
			_mapLoader.close();
			#end
		}
		
		// Clear the active map data
		if (_activeMap != null)
		{
			_activeMap.destroy();
			_activeMap = null;
		}
		
		// Loader
		_mapLoader = new URLLoader();
		_mapLoader.addEventListener(Event.COMPLETE, _onMapLoaded);
		_mapLoader.load(new URLRequest(url));
	}
	
	/* PRIVATE */
	
	private function _buildMap():Void
	{
		// Map
		_map.modModel = _activeMod;
		_map.model = _activeMap;
		
		// Tile controller
		_tileController.activeMod = _activeMod;
		_tileController.activeMap = _activeMap;
		_tileController.tiles = _activeMap.tiles;
		
		// Center map
		_map.x = -_map.width * 0.5;
		_map.y = -_map.height * 0.5;
	}
	
	/* EVENTS */
	
	public function _onStageResize(e:Event):Void
	{
		_mapContainer.x = Lib.current.stage.stageWidth * 0.5 + 30;
		_mapContainer.y = Lib.current.stage.stageHeight * 0.5 + 100;
	}
	
	public function _onModLoaded(e:Event):Void
	{
		var modFile:String = _modLoader.data;
		
		// Correction: "\" -> "\\"
		modFile = StringTools.replace(modFile, "\\\\", "#SL#");
		modFile = StringTools.replace(modFile, "\\", "\\\\");
		modFile = StringTools.replace(modFile, "#SL#", "\\\\");
		
		var mod:ModModel = new ModModel();
		mod.parseJson(TJSON.parse(modFile));
		trace("mod: " + mod.name + " by: " + mod.author + " rules: " + mod.rules + " tiles: " + mod.tiles.length + " associations: " + mod.associations.length);
		
		_activeMod = mod;
		
		// Checks if the map is already loaded
		if (_activeMap != null)
		{
			_buildMap();
		}
		
		// Cleaning the loader
		_modLoader.removeEventListener(Event.COMPLETE, _onModLoaded);
		_modLoader = null;
	}
	
	public function _onMapLoaded(e:Event):Void
	{
		var mapFile:String = _mapLoader.data;
		var map:MapModel = new MapModel();
		map.parseString(mapFile);
		
		_activeMap = map;
		
		// Checks if the map is already loaded
		if (_activeMod != null)
		{
			_buildMap();
		}
		
		// Cleaning the loader
		_mapLoader.removeEventListener(Event.COMPLETE, _onMapLoaded);
		_mapLoader = null;
	}
	
}