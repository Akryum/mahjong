package com.gamekit.core;

/**
 * ...
 * @author Guillaume CHAU
 */
interface IDestroyable
{
	/**
	 * Make most of the work to make the objet applicant for garbage collection.
	 */
	function destroy():Void;
}