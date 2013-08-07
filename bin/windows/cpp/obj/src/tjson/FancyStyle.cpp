#include <hxcpp.h>

#ifndef INCLUDED_tjson_EncodeStyle
#include <tjson/EncodeStyle.h>
#endif
#ifndef INCLUDED_tjson_FancyStyle
#include <tjson/FancyStyle.h>
#endif
namespace tjson{

Void FancyStyle_obj::__construct()
{
HX_STACK_PUSH("FancyStyle::new","tjson/TJSON.hx",385);
{
}
;
	return null();
}

FancyStyle_obj::~FancyStyle_obj() { }

Dynamic FancyStyle_obj::__CreateEmpty() { return  new FancyStyle_obj; }
hx::ObjectPtr< FancyStyle_obj > FancyStyle_obj::__new()
{  hx::ObjectPtr< FancyStyle_obj > result = new FancyStyle_obj();
	result->__construct();
	return result;}

Dynamic FancyStyle_obj::__Create(hx::DynamicArray inArgs)
{  hx::ObjectPtr< FancyStyle_obj > result = new FancyStyle_obj();
	result->__construct();
	return result;}

hx::Object *FancyStyle_obj::__ToInterface(const hx::type_info &inType) {
	if (inType==typeid( ::tjson::EncodeStyle_obj)) return operator ::tjson::EncodeStyle_obj *();
	return super::__ToInterface(inType);
}

::String FancyStyle_obj::charTimesN( ::String str,int n){
	HX_STACK_PUSH("FancyStyle::charTimesN","tjson/TJSON.hx",409);
	HX_STACK_THIS(this);
	HX_STACK_ARG(str,"str");
	HX_STACK_ARG(n,"n");
	HX_STACK_LINE(410)
	::String buffer = HX_CSTRING("");		HX_STACK_VAR(buffer,"buffer");
	HX_STACK_LINE(411)
	{
		HX_STACK_LINE(411)
		int _g = (int)0;		HX_STACK_VAR(_g,"_g");
		HX_STACK_LINE(411)
		while(((_g < n))){
			HX_STACK_LINE(411)
			int x = (_g)++;		HX_STACK_VAR(x,"x");
			HX_STACK_LINE(412)
			hx::AddEq(buffer,str);
		}
	}
	HX_STACK_LINE(414)
	return buffer;
}


HX_DEFINE_DYNAMIC_FUNC2(FancyStyle_obj,charTimesN,return )

::String FancyStyle_obj::keyValueSeperator( int depth){
	HX_STACK_PUSH("FancyStyle::keyValueSeperator","tjson/TJSON.hx",406);
	HX_STACK_THIS(this);
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(406)
	return HX_CSTRING(" : ");
}


HX_DEFINE_DYNAMIC_FUNC1(FancyStyle_obj,keyValueSeperator,return )

::String FancyStyle_obj::entrySeperator( int depth){
	HX_STACK_PUSH("FancyStyle::entrySeperator","tjson/TJSON.hx",403);
	HX_STACK_THIS(this);
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(403)
	return ((HX_CSTRING("\n") + this->charTimesN(HX_CSTRING("    "),(depth + (int)1))) + HX_CSTRING(","));
}


HX_DEFINE_DYNAMIC_FUNC1(FancyStyle_obj,entrySeperator,return )

::String FancyStyle_obj::firstEntry( int depth){
	HX_STACK_PUSH("FancyStyle::firstEntry","tjson/TJSON.hx",400);
	HX_STACK_THIS(this);
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(400)
	return (this->charTimesN(HX_CSTRING("    "),(depth + (int)1)) + HX_CSTRING(" "));
}


HX_DEFINE_DYNAMIC_FUNC1(FancyStyle_obj,firstEntry,return )

::String FancyStyle_obj::endArray( int depth){
	HX_STACK_PUSH("FancyStyle::endArray","tjson/TJSON.hx",397);
	HX_STACK_THIS(this);
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(397)
	return ((HX_CSTRING("\n") + this->charTimesN(HX_CSTRING("    "),depth)) + HX_CSTRING("]"));
}


HX_DEFINE_DYNAMIC_FUNC1(FancyStyle_obj,endArray,return )

::String FancyStyle_obj::beginArray( int depth){
	HX_STACK_PUSH("FancyStyle::beginArray","tjson/TJSON.hx",394);
	HX_STACK_THIS(this);
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(394)
	return HX_CSTRING("[\n");
}


HX_DEFINE_DYNAMIC_FUNC1(FancyStyle_obj,beginArray,return )

::String FancyStyle_obj::endObject( int depth){
	HX_STACK_PUSH("FancyStyle::endObject","tjson/TJSON.hx",391);
	HX_STACK_THIS(this);
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(391)
	return ((HX_CSTRING("\n") + this->charTimesN(HX_CSTRING("    "),depth)) + HX_CSTRING("}"));
}


HX_DEFINE_DYNAMIC_FUNC1(FancyStyle_obj,endObject,return )

::String FancyStyle_obj::beginObject( int depth){
	HX_STACK_PUSH("FancyStyle::beginObject","tjson/TJSON.hx",388);
	HX_STACK_THIS(this);
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(388)
	return HX_CSTRING("{\n");
}


HX_DEFINE_DYNAMIC_FUNC1(FancyStyle_obj,beginObject,return )


FancyStyle_obj::FancyStyle_obj()
{
}

void FancyStyle_obj::__Mark(HX_MARK_PARAMS)
{
	HX_MARK_BEGIN_CLASS(FancyStyle);
	HX_MARK_END_CLASS();
}

void FancyStyle_obj::__Visit(HX_VISIT_PARAMS)
{
}

Dynamic FancyStyle_obj::__Field(const ::String &inName,bool inCallProp)
{
	switch(inName.length) {
	case 8:
		if (HX_FIELD_EQ(inName,"endArray") ) { return endArray_dyn(); }
		break;
	case 9:
		if (HX_FIELD_EQ(inName,"endObject") ) { return endObject_dyn(); }
		break;
	case 10:
		if (HX_FIELD_EQ(inName,"charTimesN") ) { return charTimesN_dyn(); }
		if (HX_FIELD_EQ(inName,"firstEntry") ) { return firstEntry_dyn(); }
		if (HX_FIELD_EQ(inName,"beginArray") ) { return beginArray_dyn(); }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"beginObject") ) { return beginObject_dyn(); }
		break;
	case 14:
		if (HX_FIELD_EQ(inName,"entrySeperator") ) { return entrySeperator_dyn(); }
		break;
	case 17:
		if (HX_FIELD_EQ(inName,"keyValueSeperator") ) { return keyValueSeperator_dyn(); }
	}
	return super::__Field(inName,inCallProp);
}

Dynamic FancyStyle_obj::__SetField(const ::String &inName,const Dynamic &inValue,bool inCallProp)
{
	return super::__SetField(inName,inValue,inCallProp);
}

void FancyStyle_obj::__GetFields(Array< ::String> &outFields)
{
	super::__GetFields(outFields);
};

static ::String sStaticFields[] = {
	String(null()) };

static ::String sMemberFields[] = {
	HX_CSTRING("charTimesN"),
	HX_CSTRING("keyValueSeperator"),
	HX_CSTRING("entrySeperator"),
	HX_CSTRING("firstEntry"),
	HX_CSTRING("endArray"),
	HX_CSTRING("beginArray"),
	HX_CSTRING("endObject"),
	HX_CSTRING("beginObject"),
	String(null()) };

static void sMarkStatics(HX_MARK_PARAMS) {
	HX_MARK_MEMBER_NAME(FancyStyle_obj::__mClass,"__mClass");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(FancyStyle_obj::__mClass,"__mClass");
};

Class FancyStyle_obj::__mClass;

void FancyStyle_obj::__register()
{
	hx::Static(__mClass) = hx::RegisterClass(HX_CSTRING("tjson.FancyStyle"), hx::TCanCast< FancyStyle_obj> ,sStaticFields,sMemberFields,
	&__CreateEmpty, &__Create,
	&super::__SGetClass(), 0, sMarkStatics, sVisitStatics);
}

void FancyStyle_obj::__boot()
{
}

} // end namespace tjson
