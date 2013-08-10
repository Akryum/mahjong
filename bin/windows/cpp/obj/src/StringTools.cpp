#include <hxcpp.h>

#ifndef INCLUDED_StringTools
#include <StringTools.h>
#endif

Void StringTools_obj::__construct()
{
	return null();
}

StringTools_obj::~StringTools_obj() { }

Dynamic StringTools_obj::__CreateEmpty() { return  new StringTools_obj; }
hx::ObjectPtr< StringTools_obj > StringTools_obj::__new()
{  hx::ObjectPtr< StringTools_obj > result = new StringTools_obj();
	result->__construct();
	return result;}

Dynamic StringTools_obj::__Create(hx::DynamicArray inArgs)
{  hx::ObjectPtr< StringTools_obj > result = new StringTools_obj();
	result->__construct();
	return result;}

::String StringTools_obj::urlEncode( ::String s){
	HX_STACK_PUSH("StringTools::urlEncode","C:\\HaxeToolkit\\haxe/std/StringTools.hx",37);
	HX_STACK_ARG(s,"s");
	HX_STACK_LINE(37)
	return s.__URLEncode();
}


STATIC_HX_DEFINE_DYNAMIC_FUNC1(StringTools_obj,urlEncode,return )

::String StringTools_obj::urlDecode( ::String s){
	HX_STACK_PUSH("StringTools::urlDecode","C:\\HaxeToolkit\\haxe/std/StringTools.hx",62);
	HX_STACK_ARG(s,"s");
	HX_STACK_LINE(62)
	return s.__URLDecode();
}


STATIC_HX_DEFINE_DYNAMIC_FUNC1(StringTools_obj,urlDecode,return )

bool StringTools_obj::isSpace( ::String s,int pos){
	HX_STACK_PUSH("StringTools::isSpace","C:\\HaxeToolkit\\haxe/std/StringTools.hx",162);
	HX_STACK_ARG(s,"s");
	HX_STACK_ARG(pos,"pos");
	HX_STACK_LINE(163)
	Dynamic c = s.charCodeAt(pos);		HX_STACK_VAR(c,"c");
	HX_STACK_LINE(164)
	return (bool((bool((c > (int)8)) && bool((c < (int)14)))) || bool((c == (int)32)));
}


STATIC_HX_DEFINE_DYNAMIC_FUNC2(StringTools_obj,isSpace,return )

::String StringTools_obj::rtrim( ::String s){
	HX_STACK_PUSH("StringTools::rtrim","C:\\HaxeToolkit\\haxe/std/StringTools.hx",201);
	HX_STACK_ARG(s,"s");
	HX_STACK_LINE(205)
	int l = s.length;		HX_STACK_VAR(l,"l");
	HX_STACK_LINE(206)
	int r = (int)0;		HX_STACK_VAR(r,"r");
	HX_STACK_LINE(207)
	while(((bool((r < l)) && bool(::StringTools_obj::isSpace(s,((l - r) - (int)1)))))){
		HX_STACK_LINE(207)
		(r)++;
	}
	HX_STACK_LINE(210)
	if (((r > (int)0))){
		HX_STACK_LINE(210)
		return s.substr((int)0,(l - r));
	}
	else{
		HX_STACK_LINE(212)
		return s;
	}
	HX_STACK_LINE(210)
	return null();
}


STATIC_HX_DEFINE_DYNAMIC_FUNC1(StringTools_obj,rtrim,return )

::String StringTools_obj::replace( ::String s,::String sub,::String by){
	HX_STACK_PUSH("StringTools::replace","C:\\HaxeToolkit\\haxe/std/StringTools.hx",288);
	HX_STACK_ARG(s,"s");
	HX_STACK_ARG(sub,"sub");
	HX_STACK_ARG(by,"by");
	HX_STACK_LINE(288)
	return s.split(sub)->join(by);
}


STATIC_HX_DEFINE_DYNAMIC_FUNC3(StringTools_obj,replace,return )


StringTools_obj::StringTools_obj()
{
}

void StringTools_obj::__Mark(HX_MARK_PARAMS)
{
	HX_MARK_BEGIN_CLASS(StringTools);
	HX_MARK_END_CLASS();
}

void StringTools_obj::__Visit(HX_VISIT_PARAMS)
{
}

Dynamic StringTools_obj::__Field(const ::String &inName,bool inCallProp)
{
	switch(inName.length) {
	case 5:
		if (HX_FIELD_EQ(inName,"rtrim") ) { return rtrim_dyn(); }
		break;
	case 7:
		if (HX_FIELD_EQ(inName,"isSpace") ) { return isSpace_dyn(); }
		if (HX_FIELD_EQ(inName,"replace") ) { return replace_dyn(); }
		break;
	case 9:
		if (HX_FIELD_EQ(inName,"urlEncode") ) { return urlEncode_dyn(); }
		if (HX_FIELD_EQ(inName,"urlDecode") ) { return urlDecode_dyn(); }
	}
	return super::__Field(inName,inCallProp);
}

Dynamic StringTools_obj::__SetField(const ::String &inName,const Dynamic &inValue,bool inCallProp)
{
	return super::__SetField(inName,inValue,inCallProp);
}

void StringTools_obj::__GetFields(Array< ::String> &outFields)
{
	super::__GetFields(outFields);
};

static ::String sStaticFields[] = {
	HX_CSTRING("urlEncode"),
	HX_CSTRING("urlDecode"),
	HX_CSTRING("isSpace"),
	HX_CSTRING("rtrim"),
	HX_CSTRING("replace"),
	String(null()) };

static ::String sMemberFields[] = {
	String(null()) };

static void sMarkStatics(HX_MARK_PARAMS) {
	HX_MARK_MEMBER_NAME(StringTools_obj::__mClass,"__mClass");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(StringTools_obj::__mClass,"__mClass");
};

Class StringTools_obj::__mClass;

void StringTools_obj::__register()
{
	hx::Static(__mClass) = hx::RegisterClass(HX_CSTRING("StringTools"), hx::TCanCast< StringTools_obj> ,sStaticFields,sMemberFields,
	&__CreateEmpty, &__Create,
	&super::__SGetClass(), 0, sMarkStatics, sVisitStatics);
}

void StringTools_obj::__boot()
{
}

