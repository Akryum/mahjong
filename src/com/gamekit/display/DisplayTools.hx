package com.gamekit.display;
import flash.display.DisplayObject;

/**
 * ...
 * @author Guillaume CHAU
 */
class DisplayTools
{
	static public function bringToFront(obj:DisplayObject):Void
	{
		if (obj.parent != null)
		{
			obj.parent.setChildIndex(obj, obj.parent.numChildren - 1);
		}
	}
}