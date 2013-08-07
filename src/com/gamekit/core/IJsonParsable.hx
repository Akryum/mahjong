package com.gamekit.core;

/**
 * ...
 * @author Guillaume CHAU
 */
interface IJsonParsable
{
	/**
	 * Validates the json data and extracts usefull informations from it.
	 * @param	json
	 */
	function parseJson(json:Dynamic):Void;
}