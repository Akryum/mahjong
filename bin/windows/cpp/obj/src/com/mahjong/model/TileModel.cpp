#include <hxcpp.h>

#ifndef INCLUDED_com_gamekit_core_IDestroyable
#include <com/gamekit/core/IDestroyable.h>
#endif
#ifndef INCLUDED_com_gamekit_core_IJsonParsable
#include <com/gamekit/core/IJsonParsable.h>
#endif
#ifndef INCLUDED_com_gamekit_mvc_model_Model
#include <com/gamekit/mvc/model/Model.h>
#endif
#ifndef INCLUDED_com_gamekit_text_LatexParser
#include <com/gamekit/text/LatexParser.h>
#endif
#ifndef INCLUDED_com_mahjong_model_TileModel
#include <com/mahjong/model/TileModel.h>
#endif
#ifndef INCLUDED_flash_events_EventDispatcher
#include <flash/events/EventDispatcher.h>
#endif
#ifndef INCLUDED_flash_events_IEventDispatcher
#include <flash/events/IEventDispatcher.h>
#endif
namespace com{
namespace mahjong{
namespace model{

Void TileModel_obj::__construct()
{
HX_STACK_PUSH("TileModel::new","com/mahjong/model/TileModel.hx",10);
{
	HX_STACK_LINE(16)
	this->_context = null();
	HX_STACK_LINE(15)
	this->_information = HX_CSTRING("");
	HX_STACK_LINE(14)
	this->_rotated = false;
	HX_STACK_LINE(13)
	this->_value = HX_CSTRING("");
	HX_STACK_LINE(12)
	this->_type = HX_CSTRING("text");
	HX_STACK_LINE(19)
	super::__construct();
}
;
	return null();
}

TileModel_obj::~TileModel_obj() { }

Dynamic TileModel_obj::__CreateEmpty() { return  new TileModel_obj; }
hx::ObjectPtr< TileModel_obj > TileModel_obj::__new()
{  hx::ObjectPtr< TileModel_obj > result = new TileModel_obj();
	result->__construct();
	return result;}

Dynamic TileModel_obj::__Create(hx::DynamicArray inArgs)
{  hx::ObjectPtr< TileModel_obj > result = new TileModel_obj();
	result->__construct();
	return result;}

::String TileModel_obj::set_context( ::String value){
	HX_STACK_PUSH("TileModel::set_context","com/mahjong/model/TileModel.hx",126);
	HX_STACK_THIS(this);
	HX_STACK_ARG(value,"value");
	HX_STACK_LINE(126)
	return this->_context = value;
}


HX_DEFINE_DYNAMIC_FUNC1(TileModel_obj,set_context,return )

::String TileModel_obj::get_context( ){
	HX_STACK_PUSH("TileModel::get_context","com/mahjong/model/TileModel.hx",121);
	HX_STACK_THIS(this);
	HX_STACK_LINE(121)
	return this->_context;
}


HX_DEFINE_DYNAMIC_FUNC0(TileModel_obj,get_context,return )

::String TileModel_obj::set_information( ::String value){
	HX_STACK_PUSH("TileModel::set_information","com/mahjong/model/TileModel.hx",111);
	HX_STACK_THIS(this);
	HX_STACK_ARG(value,"value");
	HX_STACK_LINE(111)
	return this->_information = value;
}


HX_DEFINE_DYNAMIC_FUNC1(TileModel_obj,set_information,return )

::String TileModel_obj::get_information( ){
	HX_STACK_PUSH("TileModel::get_information","com/mahjong/model/TileModel.hx",106);
	HX_STACK_THIS(this);
	HX_STACK_LINE(106)
	return this->_information;
}


HX_DEFINE_DYNAMIC_FUNC0(TileModel_obj,get_information,return )

bool TileModel_obj::set_rotated( bool value){
	HX_STACK_PUSH("TileModel::set_rotated","com/mahjong/model/TileModel.hx",95);
	HX_STACK_THIS(this);
	HX_STACK_ARG(value,"value");
	HX_STACK_LINE(95)
	return this->_rotated = value;
}


HX_DEFINE_DYNAMIC_FUNC1(TileModel_obj,set_rotated,return )

bool TileModel_obj::get_rotated( ){
	HX_STACK_PUSH("TileModel::get_rotated","com/mahjong/model/TileModel.hx",90);
	HX_STACK_THIS(this);
	HX_STACK_LINE(90)
	return this->_rotated;
}


HX_DEFINE_DYNAMIC_FUNC0(TileModel_obj,get_rotated,return )

::String TileModel_obj::set_value( ::String value){
	HX_STACK_PUSH("TileModel::set_value","com/mahjong/model/TileModel.hx",80);
	HX_STACK_THIS(this);
	HX_STACK_ARG(value,"value");
	HX_STACK_LINE(80)
	return this->_value = value;
}


HX_DEFINE_DYNAMIC_FUNC1(TileModel_obj,set_value,return )

::String TileModel_obj::get_value( ){
	HX_STACK_PUSH("TileModel::get_value","com/mahjong/model/TileModel.hx",75);
	HX_STACK_THIS(this);
	HX_STACK_LINE(75)
	return this->_value;
}


HX_DEFINE_DYNAMIC_FUNC0(TileModel_obj,get_value,return )

::String TileModel_obj::set_type( ::String value){
	HX_STACK_PUSH("TileModel::set_type","com/mahjong/model/TileModel.hx",64);
	HX_STACK_THIS(this);
	HX_STACK_ARG(value,"value");
	HX_STACK_LINE(64)
	return this->_type = value;
}


HX_DEFINE_DYNAMIC_FUNC1(TileModel_obj,set_type,return )

::String TileModel_obj::get_type( ){
	HX_STACK_PUSH("TileModel::get_type","com/mahjong/model/TileModel.hx",59);
	HX_STACK_THIS(this);
	HX_STACK_LINE(59)
	return this->_type;
}


HX_DEFINE_DYNAMIC_FUNC0(TileModel_obj,get_type,return )

Void TileModel_obj::_parseJson( Dynamic data){
{
		HX_STACK_PUSH("TileModel::_parseJson","com/mahjong/model/TileModel.hx",27);
		HX_STACK_THIS(this);
		HX_STACK_ARG(data,"data");
		HX_STACK_LINE(28)
		this->super::_parseJson(data);
		HX_STACK_LINE(31)
		if (((bool((data->__Field(HX_CSTRING("type"),true) == HX_CSTRING("text"))) || bool((data->__Field(HX_CSTRING("type"),true) == HX_CSTRING("image")))))){
			HX_STACK_LINE(32)
			this->_type = data->__Field(HX_CSTRING("type"),true);
		}
		HX_STACK_LINE(36)
		if (((this->_type == HX_CSTRING("text")))){
			HX_STACK_LINE(37)
			this->_value = ::com::gamekit::text::LatexParser_obj::toHtml(data->__Field(HX_CSTRING("value"),true));
		}
		HX_STACK_LINE(42)
		this->_rotated = (data->__Field(HX_CSTRING("rotated"),true) == true);
		HX_STACK_LINE(44)
		if (((data->__Field(HX_CSTRING("information"),true) != null()))){
			HX_STACK_LINE(45)
			this->_information = data->__Field(HX_CSTRING("information"),true);
		}
		else{
			HX_STACK_LINE(49)
			this->_information = HX_CSTRING("");
		}
		HX_STACK_LINE(53)
		this->_context = data->__Field(HX_CSTRING("context"),true);
	}
return null();
}



TileModel_obj::TileModel_obj()
{
}

void TileModel_obj::__Mark(HX_MARK_PARAMS)
{
	HX_MARK_BEGIN_CLASS(TileModel);
	HX_MARK_MEMBER_NAME(_context,"_context");
	HX_MARK_MEMBER_NAME(_information,"_information");
	HX_MARK_MEMBER_NAME(_rotated,"_rotated");
	HX_MARK_MEMBER_NAME(_value,"_value");
	HX_MARK_MEMBER_NAME(_type,"_type");
	super::__Mark(HX_MARK_ARG);
	HX_MARK_END_CLASS();
}

void TileModel_obj::__Visit(HX_VISIT_PARAMS)
{
	HX_VISIT_MEMBER_NAME(_context,"_context");
	HX_VISIT_MEMBER_NAME(_information,"_information");
	HX_VISIT_MEMBER_NAME(_rotated,"_rotated");
	HX_VISIT_MEMBER_NAME(_value,"_value");
	HX_VISIT_MEMBER_NAME(_type,"_type");
	super::__Visit(HX_VISIT_ARG);
}

Dynamic TileModel_obj::__Field(const ::String &inName,bool inCallProp)
{
	switch(inName.length) {
	case 4:
		if (HX_FIELD_EQ(inName,"type") ) { return get_type(); }
		break;
	case 5:
		if (HX_FIELD_EQ(inName,"value") ) { return get_value(); }
		if (HX_FIELD_EQ(inName,"_type") ) { return _type; }
		break;
	case 6:
		if (HX_FIELD_EQ(inName,"_value") ) { return _value; }
		break;
	case 7:
		if (HX_FIELD_EQ(inName,"context") ) { return get_context(); }
		if (HX_FIELD_EQ(inName,"rotated") ) { return get_rotated(); }
		break;
	case 8:
		if (HX_FIELD_EQ(inName,"set_type") ) { return set_type_dyn(); }
		if (HX_FIELD_EQ(inName,"get_type") ) { return get_type_dyn(); }
		if (HX_FIELD_EQ(inName,"_context") ) { return _context; }
		if (HX_FIELD_EQ(inName,"_rotated") ) { return _rotated; }
		break;
	case 9:
		if (HX_FIELD_EQ(inName,"set_value") ) { return set_value_dyn(); }
		if (HX_FIELD_EQ(inName,"get_value") ) { return get_value_dyn(); }
		break;
	case 10:
		if (HX_FIELD_EQ(inName,"_parseJson") ) { return _parseJson_dyn(); }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"set_context") ) { return set_context_dyn(); }
		if (HX_FIELD_EQ(inName,"get_context") ) { return get_context_dyn(); }
		if (HX_FIELD_EQ(inName,"information") ) { return get_information(); }
		if (HX_FIELD_EQ(inName,"set_rotated") ) { return set_rotated_dyn(); }
		if (HX_FIELD_EQ(inName,"get_rotated") ) { return get_rotated_dyn(); }
		break;
	case 12:
		if (HX_FIELD_EQ(inName,"_information") ) { return _information; }
		break;
	case 15:
		if (HX_FIELD_EQ(inName,"set_information") ) { return set_information_dyn(); }
		if (HX_FIELD_EQ(inName,"get_information") ) { return get_information_dyn(); }
	}
	return super::__Field(inName,inCallProp);
}

Dynamic TileModel_obj::__SetField(const ::String &inName,const Dynamic &inValue,bool inCallProp)
{
	switch(inName.length) {
	case 4:
		if (HX_FIELD_EQ(inName,"type") ) { return set_type(inValue); }
		break;
	case 5:
		if (HX_FIELD_EQ(inName,"value") ) { return set_value(inValue); }
		if (HX_FIELD_EQ(inName,"_type") ) { _type=inValue.Cast< ::String >(); return inValue; }
		break;
	case 6:
		if (HX_FIELD_EQ(inName,"_value") ) { _value=inValue.Cast< ::String >(); return inValue; }
		break;
	case 7:
		if (HX_FIELD_EQ(inName,"context") ) { return set_context(inValue); }
		if (HX_FIELD_EQ(inName,"rotated") ) { return set_rotated(inValue); }
		break;
	case 8:
		if (HX_FIELD_EQ(inName,"_context") ) { _context=inValue.Cast< ::String >(); return inValue; }
		if (HX_FIELD_EQ(inName,"_rotated") ) { _rotated=inValue.Cast< bool >(); return inValue; }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"information") ) { return set_information(inValue); }
		break;
	case 12:
		if (HX_FIELD_EQ(inName,"_information") ) { _information=inValue.Cast< ::String >(); return inValue; }
	}
	return super::__SetField(inName,inValue,inCallProp);
}

void TileModel_obj::__GetFields(Array< ::String> &outFields)
{
	outFields->push(HX_CSTRING("context"));
	outFields->push(HX_CSTRING("information"));
	outFields->push(HX_CSTRING("rotated"));
	outFields->push(HX_CSTRING("value"));
	outFields->push(HX_CSTRING("type"));
	outFields->push(HX_CSTRING("_context"));
	outFields->push(HX_CSTRING("_information"));
	outFields->push(HX_CSTRING("_rotated"));
	outFields->push(HX_CSTRING("_value"));
	outFields->push(HX_CSTRING("_type"));
	super::__GetFields(outFields);
};

static ::String sStaticFields[] = {
	String(null()) };

static ::String sMemberFields[] = {
	HX_CSTRING("set_context"),
	HX_CSTRING("get_context"),
	HX_CSTRING("set_information"),
	HX_CSTRING("get_information"),
	HX_CSTRING("set_rotated"),
	HX_CSTRING("get_rotated"),
	HX_CSTRING("set_value"),
	HX_CSTRING("get_value"),
	HX_CSTRING("set_type"),
	HX_CSTRING("get_type"),
	HX_CSTRING("_parseJson"),
	HX_CSTRING("_context"),
	HX_CSTRING("_information"),
	HX_CSTRING("_rotated"),
	HX_CSTRING("_value"),
	HX_CSTRING("_type"),
	String(null()) };

static void sMarkStatics(HX_MARK_PARAMS) {
	HX_MARK_MEMBER_NAME(TileModel_obj::__mClass,"__mClass");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(TileModel_obj::__mClass,"__mClass");
};

Class TileModel_obj::__mClass;

void TileModel_obj::__register()
{
	hx::Static(__mClass) = hx::RegisterClass(HX_CSTRING("com.mahjong.model.TileModel"), hx::TCanCast< TileModel_obj> ,sStaticFields,sMemberFields,
	&__CreateEmpty, &__Create,
	&super::__SGetClass(), 0, sMarkStatics, sVisitStatics);
}

void TileModel_obj::__boot()
{
}

} // end namespace com
} // end namespace mahjong
} // end namespace model
