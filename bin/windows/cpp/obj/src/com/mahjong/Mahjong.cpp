#include <hxcpp.h>

#ifndef INCLUDED_StringTools
#include <StringTools.h>
#endif
#ifndef INCLUDED_com_gamekit_core_IDestroyable
#include <com/gamekit/core/IDestroyable.h>
#endif
#ifndef INCLUDED_com_gamekit_core_IJsonParsable
#include <com/gamekit/core/IJsonParsable.h>
#endif
#ifndef INCLUDED_com_gamekit_mvc_model_Model
#include <com/gamekit/mvc/model/Model.h>
#endif
#ifndef INCLUDED_com_gamekit_mvc_view_View
#include <com/gamekit/mvc/view/View.h>
#endif
#ifndef INCLUDED_com_mahjong_Mahjong
#include <com/mahjong/Mahjong.h>
#endif
#ifndef INCLUDED_com_mahjong_model_MapModel
#include <com/mahjong/model/MapModel.h>
#endif
#ifndef INCLUDED_com_mahjong_model_ModModel
#include <com/mahjong/model/ModModel.h>
#endif
#ifndef INCLUDED_com_mahjong_model_TileModel
#include <com/mahjong/model/TileModel.h>
#endif
#ifndef INCLUDED_com_mahjong_view_MapView
#include <com/mahjong/view/MapView.h>
#endif
#ifndef INCLUDED_flash_display_DisplayObject
#include <flash/display/DisplayObject.h>
#endif
#ifndef INCLUDED_flash_display_DisplayObjectContainer
#include <flash/display/DisplayObjectContainer.h>
#endif
#ifndef INCLUDED_flash_display_IBitmapDrawable
#include <flash/display/IBitmapDrawable.h>
#endif
#ifndef INCLUDED_flash_display_InteractiveObject
#include <flash/display/InteractiveObject.h>
#endif
#ifndef INCLUDED_flash_display_Sprite
#include <flash/display/Sprite.h>
#endif
#ifndef INCLUDED_flash_events_Event
#include <flash/events/Event.h>
#endif
#ifndef INCLUDED_flash_events_EventDispatcher
#include <flash/events/EventDispatcher.h>
#endif
#ifndef INCLUDED_flash_events_IEventDispatcher
#include <flash/events/IEventDispatcher.h>
#endif
#ifndef INCLUDED_flash_net_URLLoader
#include <flash/net/URLLoader.h>
#endif
#ifndef INCLUDED_flash_net_URLRequest
#include <flash/net/URLRequest.h>
#endif
#ifndef INCLUDED_haxe_Log
#include <haxe/Log.h>
#endif
#ifndef INCLUDED_tjson_TJSON
#include <tjson/TJSON.h>
#endif
namespace com{
namespace mahjong{

Void Mahjong_obj::__construct()
{
HX_STACK_PUSH("Mahjong::new","com/mahjong/Mahjong.hx",32);
{
	HX_STACK_LINE(33)
	super::__construct();
	HX_STACK_LINE(35)
	this->_map = ::com::mahjong::view::MapView_obj::__new();
	HX_STACK_LINE(36)
	this->addChild(this->_map);
	HX_STACK_LINE(39)
	this->loadMod(HX_CSTRING("data/mods/elements.json"));
	HX_STACK_LINE(40)
	this->loadMap(HX_CSTRING("data/maps/turtle"));
}
;
	return null();
}

Mahjong_obj::~Mahjong_obj() { }

Dynamic Mahjong_obj::__CreateEmpty() { return  new Mahjong_obj; }
hx::ObjectPtr< Mahjong_obj > Mahjong_obj::__new()
{  hx::ObjectPtr< Mahjong_obj > result = new Mahjong_obj();
	result->__construct();
	return result;}

Dynamic Mahjong_obj::__Create(hx::DynamicArray inArgs)
{  hx::ObjectPtr< Mahjong_obj > result = new Mahjong_obj();
	result->__construct();
	return result;}

Void Mahjong_obj::_onMapLoaded( ::flash::events::Event e){
{
		HX_STACK_PUSH("Mahjong::_onMapLoaded","com/mahjong/Mahjong.hx",128);
		HX_STACK_THIS(this);
		HX_STACK_ARG(e,"e");
		HX_STACK_LINE(129)
		::String mapFile = this->_mapLoader->data;		HX_STACK_VAR(mapFile,"mapFile");
		HX_STACK_LINE(130)
		::com::mahjong::model::MapModel map = ::com::mahjong::model::MapModel_obj::__new();		HX_STACK_VAR(map,"map");
		HX_STACK_LINE(131)
		map->parseString(mapFile);
		HX_STACK_LINE(133)
		this->_activeMap = map;
		HX_STACK_LINE(136)
		if (((this->_activeMod != null()))){
			HX_STACK_LINE(137)
			this->_buildMap();
		}
		HX_STACK_LINE(142)
		this->_mapLoader->removeEventListener(::flash::events::Event_obj::COMPLETE,this->_onMapLoaded_dyn(),null());
		HX_STACK_LINE(143)
		this->_mapLoader = null();
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC1(Mahjong_obj,_onMapLoaded,(void))

Void Mahjong_obj::_onModLoaded( ::flash::events::Event e){
{
		HX_STACK_PUSH("Mahjong::_onModLoaded","com/mahjong/Mahjong.hx",102);
		HX_STACK_THIS(this);
		HX_STACK_ARG(e,"e");
		HX_STACK_LINE(103)
		::String modFile = this->_modLoader->data;		HX_STACK_VAR(modFile,"modFile");
		HX_STACK_LINE(106)
		modFile = ::StringTools_obj::replace(modFile,HX_CSTRING("\\\\"),HX_CSTRING("#SL#"));
		HX_STACK_LINE(107)
		modFile = ::StringTools_obj::replace(modFile,HX_CSTRING("\\"),HX_CSTRING("\\\\"));
		HX_STACK_LINE(108)
		modFile = ::StringTools_obj::replace(modFile,HX_CSTRING("#SL#"),HX_CSTRING("\\\\"));
		HX_STACK_LINE(110)
		::com::mahjong::model::ModModel mod = ::com::mahjong::model::ModModel_obj::__new();		HX_STACK_VAR(mod,"mod");
		HX_STACK_LINE(111)
		mod->parseJson(::tjson::TJSON_obj::parse(modFile,null()));
		HX_STACK_LINE(112)
		::haxe::Log_obj::trace((((((((((HX_CSTRING("mod: ") + mod->get_name()) + HX_CSTRING(" by: ")) + mod->get_author()) + HX_CSTRING(" rules: ")) + mod->get_rules()) + HX_CSTRING(" tiles: ")) + mod->get_tiles()->length) + HX_CSTRING(" associations: ")) + mod->get_associations()->length),hx::SourceInfo(HX_CSTRING("Mahjong.hx"),112,HX_CSTRING("com.mahjong.Mahjong"),HX_CSTRING("_onModLoaded")));
		HX_STACK_LINE(114)
		this->_activeMod = mod;
		HX_STACK_LINE(117)
		if (((this->_activeMap != null()))){
			HX_STACK_LINE(118)
			this->_buildMap();
		}
		HX_STACK_LINE(123)
		this->_modLoader->removeEventListener(::flash::events::Event_obj::COMPLETE,this->_onModLoaded_dyn(),null());
		HX_STACK_LINE(124)
		this->_modLoader = null();
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC1(Mahjong_obj,_onModLoaded,(void))

Void Mahjong_obj::_buildMap( ){
{
		HX_STACK_PUSH("Mahjong::_buildMap","com/mahjong/Mahjong.hx",94);
		HX_STACK_THIS(this);
		HX_STACK_LINE(95)
		this->_map->set_modModel(this->_activeMod);
		HX_STACK_LINE(96)
		this->_map->set_model(this->_activeMap);
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(Mahjong_obj,_buildMap,(void))

Void Mahjong_obj::loadMap( ::String url){
{
		HX_STACK_PUSH("Mahjong::loadMap","com/mahjong/Mahjong.hx",68);
		HX_STACK_THIS(this);
		HX_STACK_ARG(url,"url");
		HX_STACK_LINE(70)
		if (((this->_mapLoader != null()))){
			HX_STACK_LINE(71)
			this->_mapLoader->close();
		}
		HX_STACK_LINE(80)
		if (((this->_activeMap != null()))){
			HX_STACK_LINE(81)
			this->_activeMap->destroy();
		}
		HX_STACK_LINE(86)
		this->_mapLoader = ::flash::net::URLLoader_obj::__new(null());
		HX_STACK_LINE(87)
		this->_mapLoader->addEventListener(::flash::events::Event_obj::COMPLETE,this->_onMapLoaded_dyn(),null(),null(),null());
		HX_STACK_LINE(88)
		this->_mapLoader->load(::flash::net::URLRequest_obj::__new(url));
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC1(Mahjong_obj,loadMap,(void))

Void Mahjong_obj::loadMod( ::String url){
{
		HX_STACK_PUSH("Mahjong::loadMod","com/mahjong/Mahjong.hx",44);
		HX_STACK_THIS(this);
		HX_STACK_ARG(url,"url");
		HX_STACK_LINE(46)
		if (((this->_modLoader != null()))){
			HX_STACK_LINE(47)
			this->_modLoader->close();
		}
		HX_STACK_LINE(56)
		if (((this->_activeMod != null()))){
			HX_STACK_LINE(57)
			this->_activeMod->destroy();
		}
		HX_STACK_LINE(62)
		this->_modLoader = ::flash::net::URLLoader_obj::__new(null());
		HX_STACK_LINE(63)
		this->_modLoader->addEventListener(::flash::events::Event_obj::COMPLETE,this->_onModLoaded_dyn(),null(),null(),null());
		HX_STACK_LINE(64)
		this->_modLoader->load(::flash::net::URLRequest_obj::__new(url));
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC1(Mahjong_obj,loadMod,(void))


Mahjong_obj::Mahjong_obj()
{
}

void Mahjong_obj::__Mark(HX_MARK_PARAMS)
{
	HX_MARK_BEGIN_CLASS(Mahjong);
	HX_MARK_MEMBER_NAME(_map,"_map");
	HX_MARK_MEMBER_NAME(_activeMap,"_activeMap");
	HX_MARK_MEMBER_NAME(_mapLoader,"_mapLoader");
	HX_MARK_MEMBER_NAME(_activeMod,"_activeMod");
	HX_MARK_MEMBER_NAME(_modLoader,"_modLoader");
	super::__Mark(HX_MARK_ARG);
	HX_MARK_END_CLASS();
}

void Mahjong_obj::__Visit(HX_VISIT_PARAMS)
{
	HX_VISIT_MEMBER_NAME(_map,"_map");
	HX_VISIT_MEMBER_NAME(_activeMap,"_activeMap");
	HX_VISIT_MEMBER_NAME(_mapLoader,"_mapLoader");
	HX_VISIT_MEMBER_NAME(_activeMod,"_activeMod");
	HX_VISIT_MEMBER_NAME(_modLoader,"_modLoader");
	super::__Visit(HX_VISIT_ARG);
}

Dynamic Mahjong_obj::__Field(const ::String &inName,bool inCallProp)
{
	switch(inName.length) {
	case 4:
		if (HX_FIELD_EQ(inName,"_map") ) { return _map; }
		break;
	case 7:
		if (HX_FIELD_EQ(inName,"loadMap") ) { return loadMap_dyn(); }
		if (HX_FIELD_EQ(inName,"loadMod") ) { return loadMod_dyn(); }
		break;
	case 9:
		if (HX_FIELD_EQ(inName,"_buildMap") ) { return _buildMap_dyn(); }
		break;
	case 10:
		if (HX_FIELD_EQ(inName,"_activeMap") ) { return _activeMap; }
		if (HX_FIELD_EQ(inName,"_mapLoader") ) { return _mapLoader; }
		if (HX_FIELD_EQ(inName,"_activeMod") ) { return _activeMod; }
		if (HX_FIELD_EQ(inName,"_modLoader") ) { return _modLoader; }
		break;
	case 12:
		if (HX_FIELD_EQ(inName,"_onMapLoaded") ) { return _onMapLoaded_dyn(); }
		if (HX_FIELD_EQ(inName,"_onModLoaded") ) { return _onModLoaded_dyn(); }
	}
	return super::__Field(inName,inCallProp);
}

Dynamic Mahjong_obj::__SetField(const ::String &inName,const Dynamic &inValue,bool inCallProp)
{
	switch(inName.length) {
	case 4:
		if (HX_FIELD_EQ(inName,"_map") ) { _map=inValue.Cast< ::com::mahjong::view::MapView >(); return inValue; }
		break;
	case 10:
		if (HX_FIELD_EQ(inName,"_activeMap") ) { _activeMap=inValue.Cast< ::com::mahjong::model::MapModel >(); return inValue; }
		if (HX_FIELD_EQ(inName,"_mapLoader") ) { _mapLoader=inValue.Cast< ::flash::net::URLLoader >(); return inValue; }
		if (HX_FIELD_EQ(inName,"_activeMod") ) { _activeMod=inValue.Cast< ::com::mahjong::model::ModModel >(); return inValue; }
		if (HX_FIELD_EQ(inName,"_modLoader") ) { _modLoader=inValue.Cast< ::flash::net::URLLoader >(); return inValue; }
	}
	return super::__SetField(inName,inValue,inCallProp);
}

void Mahjong_obj::__GetFields(Array< ::String> &outFields)
{
	outFields->push(HX_CSTRING("_map"));
	outFields->push(HX_CSTRING("_activeMap"));
	outFields->push(HX_CSTRING("_mapLoader"));
	outFields->push(HX_CSTRING("_activeMod"));
	outFields->push(HX_CSTRING("_modLoader"));
	super::__GetFields(outFields);
};

static ::String sStaticFields[] = {
	String(null()) };

static ::String sMemberFields[] = {
	HX_CSTRING("_onMapLoaded"),
	HX_CSTRING("_onModLoaded"),
	HX_CSTRING("_buildMap"),
	HX_CSTRING("loadMap"),
	HX_CSTRING("loadMod"),
	HX_CSTRING("_map"),
	HX_CSTRING("_activeMap"),
	HX_CSTRING("_mapLoader"),
	HX_CSTRING("_activeMod"),
	HX_CSTRING("_modLoader"),
	String(null()) };

static void sMarkStatics(HX_MARK_PARAMS) {
	HX_MARK_MEMBER_NAME(Mahjong_obj::__mClass,"__mClass");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(Mahjong_obj::__mClass,"__mClass");
};

Class Mahjong_obj::__mClass;

void Mahjong_obj::__register()
{
	hx::Static(__mClass) = hx::RegisterClass(HX_CSTRING("com.mahjong.Mahjong"), hx::TCanCast< Mahjong_obj> ,sStaticFields,sMemberFields,
	&__CreateEmpty, &__Create,
	&super::__SGetClass(), 0, sMarkStatics, sVisitStatics);
}

void Mahjong_obj::__boot()
{
}

} // end namespace com
} // end namespace mahjong
