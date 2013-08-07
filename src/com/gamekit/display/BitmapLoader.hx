package com.gamekit.display;

import com.gamekit.core.IDestroyable;
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.Loader;
import flash.events.Event;

/**
 * Dynamic BitmapData loading. Internal cache included.
 * @author Guillaume CHAU
 */
class BitmapLoader implements IDestroyable
{
	static private var _cache:Map<String, BitmapData>;
	
	private var _url:String;
	private var _callback:BitmapData->Void;
	
	private var _bitmapData:BitmapData;
	
	private var _loader:Loader;

	public function new(url:String, callback:BitmapData->Void) 
	{
		_url = url;
		_callback = callback;
		
		if (_cache == null)
		{
			_cache = new Map();
		}
		
		if (_cache.exists(_url))
		{
			_bitmapData = _cache.get(_url);
			_applyCallback();
		}
		
		_load();
	}
	
	/* INTERFACE com.gamekit.core.IDestroyable */
	
	public function destroy():Void 
	{
		if (_loader != null)
		{
			_loader.loaderInfo.removeEventListener(Event.COMPLETE, _onLoadComplete);
			
			//_loader.close();
			//_loader.unloadAndStop();
		}
		
		_loader = null;
		_callback = null;
		_bitmapData = null;
	}
	
	static public function clearCache():Void
	{
		_cache = null;
	}
	
	/* PRIVATE */
	
	private function _load():Void
	{
		_loader = new Loader();
		_loader.loaderInfo.addEventListener(Event.COMPLETE, _onLoadComplete);
	}
	
	private function _applyCallback():Void
	{
		if (_callback != null)
		{
			Reflect.callMethod(this, _callback, [_bitmapData]);
		}
	}
	
	/* EVENTS */
	
	private function _onLoadComplete(e:Event):Void
	{
		// BitmapData
		var bitmap:Bitmap = cast _loader.content;
		
		if (bitmap != null)
		{
			_bitmapData = bitmap.bitmapData;
		}
		
		_cache.set(_url, _bitmapData);
		
		// Callback
		_applyCallback();
	}
	
	/* GETTERS */
	
	function get_url():String 
	{
		return _url;
	}
	
	public var url(get_url, null):String;
	
	function get_callback():BitmapData -> Void 
	{
		return _callback;
	}
	
	public var callback(get_callback, null):BitmapData -> Void;
	
	function get_bitmapData():BitmapData 
	{
		return _bitmapData;
	}
	
	public var bitmapData(get_bitmapData, null):BitmapData;
	
}