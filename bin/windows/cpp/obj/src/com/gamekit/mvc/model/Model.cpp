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
#ifndef INCLUDED_flash_events_Event
#include <flash/events/Event.h>
#endif
#ifndef INCLUDED_flash_events_EventDispatcher
#include <flash/events/EventDispatcher.h>
#endif
#ifndef INCLUDED_flash_events_IEventDispatcher
#include <flash/events/IEventDispatcher.h>
#endif
namespace com{
namespace gamekit{
namespace mvc{
namespace model{

Void Model_obj::__construct()
{
HX_STACK_PUSH("Model::new","com/gamekit/mvc/model/Model.hx",12);
{
	HX_STACK_LINE(14)
	this->_name = HX_CSTRING("unnamed");
	HX_STACK_LINE(17)
	super::__construct(null());
}
;
	return null();
}

Model_obj::~Model_obj() { }

Dynamic Model_obj::__CreateEmpty() { return  new Model_obj; }
hx::ObjectPtr< Model_obj > Model_obj::__new()
{  hx::ObjectPtr< Model_obj > result = new Model_obj();
	result->__construct();
	return result;}

Dynamic Model_obj::__Create(hx::DynamicArray inArgs)
{  hx::ObjectPtr< Model_obj > result = new Model_obj();
	result->__construct();
	return result;}

hx::Object *Model_obj::__ToInterface(const hx::type_info &inType) {
	if (inType==typeid( ::com::gamekit::core::IJsonParsable_obj)) return operator ::com::gamekit::core::IJsonParsable_obj *();
	if (inType==typeid( ::com::gamekit::core::IDestroyable_obj)) return operator ::com::gamekit::core::IDestroyable_obj *();
	return super::__ToInterface(inType);
}

::String Model_obj::set_name( ::String value){
	HX_STACK_PUSH("Model::set_name","com/gamekit/mvc/model/Model.hx",71);
	HX_STACK_THIS(this);
	HX_STACK_ARG(value,"value");
	HX_STACK_LINE(71)
	return this->_name = value;
}


HX_DEFINE_DYNAMIC_FUNC1(Model_obj,set_name,return )

::String Model_obj::get_name( ){
	HX_STACK_PUSH("Model::get_name","com/gamekit/mvc/model/Model.hx",66);
	HX_STACK_THIS(this);
	HX_STACK_LINE(66)
	return this->_name;
}


HX_DEFINE_DYNAMIC_FUNC0(Model_obj,get_name,return )

Void Model_obj::_parseJson( Dynamic data){
{
		HX_STACK_PUSH("Model::_parseJson","com/gamekit/mvc/model/Model.hx",59);
		HX_STACK_THIS(this);
		HX_STACK_ARG(data,"data");
		HX_STACK_LINE(59)
		this->_name = data->__Field(HX_CSTRING("name"),true);
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC1(Model_obj,_parseJson,(void))

Void Model_obj::_update( ){
{
		HX_STACK_PUSH("Model::_update","com/gamekit/mvc/model/Model.hx",50);
		HX_STACK_THIS(this);
		HX_STACK_LINE(50)
		this->dispatchEvent(::flash::events::Event_obj::__new(::flash::events::Event_obj::CHANGE,null(),null()));
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(Model_obj,_update,(void))

Void Model_obj::update( ){
{
		HX_STACK_PUSH("Model::update","com/gamekit/mvc/model/Model.hx",40);
		HX_STACK_THIS(this);
		HX_STACK_LINE(40)
		this->_update();
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(Model_obj,update,(void))

Void Model_obj::parseJson( Dynamic data){
{
		HX_STACK_PUSH("Model::parseJson","com/gamekit/mvc/model/Model.hx",31);
		HX_STACK_THIS(this);
		HX_STACK_ARG(data,"data");
		HX_STACK_LINE(32)
		this->_parseJson(data);
		HX_STACK_LINE(33)
		this->_update();
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC1(Model_obj,parseJson,(void))

Void Model_obj::destroy( ){
{
		HX_STACK_PUSH("Model::destroy","com/gamekit/mvc/model/Model.hx",24);
		HX_STACK_THIS(this);
	}
return null();
}


HX_DEFINE_DYNAMIC_FUNC0(Model_obj,destroy,(void))


Model_obj::Model_obj()
{
}

void Model_obj::__Mark(HX_MARK_PARAMS)
{
	HX_MARK_BEGIN_CLASS(Model);
	HX_MARK_MEMBER_NAME(_name,"_name");
	super::__Mark(HX_MARK_ARG);
	HX_MARK_END_CLASS();
}

void Model_obj::__Visit(HX_VISIT_PARAMS)
{
	HX_VISIT_MEMBER_NAME(_name,"_name");
	super::__Visit(HX_VISIT_ARG);
}

Dynamic Model_obj::__Field(const ::String &inName,bool inCallProp)
{
	switch(inName.length) {
	case 4:
		if (HX_FIELD_EQ(inName,"name") ) { return get_name(); }
		break;
	case 5:
		if (HX_FIELD_EQ(inName,"_name") ) { return _name; }
		break;
	case 6:
		if (HX_FIELD_EQ(inName,"update") ) { return update_dyn(); }
		break;
	case 7:
		if (HX_FIELD_EQ(inName,"_update") ) { return _update_dyn(); }
		if (HX_FIELD_EQ(inName,"destroy") ) { return destroy_dyn(); }
		break;
	case 8:
		if (HX_FIELD_EQ(inName,"set_name") ) { return set_name_dyn(); }
		if (HX_FIELD_EQ(inName,"get_name") ) { return get_name_dyn(); }
		break;
	case 9:
		if (HX_FIELD_EQ(inName,"parseJson") ) { return parseJson_dyn(); }
		break;
	case 10:
		if (HX_FIELD_EQ(inName,"_parseJson") ) { return _parseJson_dyn(); }
	}
	return super::__Field(inName,inCallProp);
}

Dynamic Model_obj::__SetField(const ::String &inName,const Dynamic &inValue,bool inCallProp)
{
	switch(inName.length) {
	case 4:
		if (HX_FIELD_EQ(inName,"name") ) { return set_name(inValue); }
		break;
	case 5:
		if (HX_FIELD_EQ(inName,"_name") ) { _name=inValue.Cast< ::String >(); return inValue; }
	}
	return super::__SetField(inName,inValue,inCallProp);
}

void Model_obj::__GetFields(Array< ::String> &outFields)
{
	outFields->push(HX_CSTRING("name"));
	outFields->push(HX_CSTRING("_name"));
	super::__GetFields(outFields);
};

static ::String sStaticFields[] = {
	String(null()) };

static ::String sMemberFields[] = {
	HX_CSTRING("set_name"),
	HX_CSTRING("get_name"),
	HX_CSTRING("_parseJson"),
	HX_CSTRING("_update"),
	HX_CSTRING("update"),
	HX_CSTRING("parseJson"),
	HX_CSTRING("destroy"),
	HX_CSTRING("_name"),
	String(null()) };

static void sMarkStatics(HX_MARK_PARAMS) {
	HX_MARK_MEMBER_NAME(Model_obj::__mClass,"__mClass");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(Model_obj::__mClass,"__mClass");
};

Class Model_obj::__mClass;

void Model_obj::__register()
{
	hx::Static(__mClass) = hx::RegisterClass(HX_CSTRING("com.gamekit.mvc.model.Model"), hx::TCanCast< Model_obj> ,sStaticFields,sMemberFields,
	&__CreateEmpty, &__Create,
	&super::__SGetClass(), 0, sMarkStatics, sVisitStatics);
}

void Model_obj::__boot()
{
}

} // end namespace com
} // end namespace gamekit
} // end namespace mvc
} // end namespace model
