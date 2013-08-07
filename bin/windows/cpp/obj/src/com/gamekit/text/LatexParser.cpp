#include <hxcpp.h>

#ifndef INCLUDED_EReg
#include <EReg.h>
#endif
#ifndef INCLUDED_IMap
#include <IMap.h>
#endif
#ifndef INCLUDED_Std
#include <Std.h>
#endif
#ifndef INCLUDED_StringTools
#include <StringTools.h>
#endif
#ifndef INCLUDED_com_gamekit_text_LatexParser
#include <com/gamekit/text/LatexParser.h>
#endif
#ifndef INCLUDED_haxe_ds_StringMap
#include <haxe/ds/StringMap.h>
#endif
#ifndef INCLUDED_hxMath
#include <hxMath.h>
#endif
namespace com{
namespace gamekit{
namespace text{

Void LatexParser_obj::__construct()
{
	return null();
}

LatexParser_obj::~LatexParser_obj() { }

Dynamic LatexParser_obj::__CreateEmpty() { return  new LatexParser_obj; }
hx::ObjectPtr< LatexParser_obj > LatexParser_obj::__new()
{  hx::ObjectPtr< LatexParser_obj > result = new LatexParser_obj();
	result->__construct();
	return result;}

Dynamic LatexParser_obj::__Create(hx::DynamicArray inArgs)
{  hx::ObjectPtr< LatexParser_obj > result = new LatexParser_obj();
	result->__construct();
	return result;}

int LatexParser_obj::baseFontSize;

::haxe::ds::StringMap LatexParser_obj::standardColors;

::String LatexParser_obj::toHtml( ::String latex){
	HX_STACK_PUSH("LatexParser::toHtml","com/gamekit/text/LatexParser.hx",14);
	HX_STACK_ARG(latex,"latex");
	HX_STACK_LINE(15)
	::EReg reg;		HX_STACK_VAR(reg,"reg");
	HX_STACK_LINE(18)
	reg = ::EReg_obj::__new(HX_CSTRING("\\\\size\\(([0-9]+)\\)\\{(.*)\\}"),HX_CSTRING("i"));
	HX_STACK_LINE(19)
	reg->match(latex);
	HX_STACK_LINE(20)
	latex = reg->map(latex,::com::gamekit::text::LatexParser_obj::_replaceSize_dyn());
	HX_STACK_LINE(23)
	reg = ::EReg_obj::__new(HX_CSTRING("\\\\color\\((#[0-9a-f]{6}|[a-z]+)\\)\\{(.*)\\}"),HX_CSTRING("i"));
	HX_STACK_LINE(24)
	reg->match(latex);
	HX_STACK_LINE(25)
	latex = reg->map(latex,::com::gamekit::text::LatexParser_obj::_replaceColor_dyn());
	HX_STACK_LINE(28)
	reg = ::EReg_obj::__new(HX_CSTRING("_\\((#[0-9a-f]{6}|[a-z]+)\\)\\{(.*)\\}"),HX_CSTRING("i"));
	HX_STACK_LINE(29)
	reg->match(latex);
	HX_STACK_LINE(30)
	latex = reg->map(latex,::com::gamekit::text::LatexParser_obj::_replaceSub_dyn());
	HX_STACK_LINE(33)
	reg = ::EReg_obj::__new(HX_CSTRING("\\^\\((#[0-9a-f]{6}|[a-z]+)\\)\\{(.*)\\}"),HX_CSTRING("i"));
	HX_STACK_LINE(34)
	reg->match(latex);
	HX_STACK_LINE(35)
	latex = reg->map(latex,::com::gamekit::text::LatexParser_obj::_replaceSup_dyn());
	HX_STACK_LINE(38)
	latex = ::StringTools_obj::replace(latex,HX_CSTRING("\n"),HX_CSTRING("<br/>"));
	HX_STACK_LINE(40)
	return latex;
}


STATIC_HX_DEFINE_DYNAMIC_FUNC1(LatexParser_obj,toHtml,return )

::String LatexParser_obj::_replaceSize( ::EReg reg){
	HX_STACK_PUSH("LatexParser::_replaceSize","com/gamekit/text/LatexParser.hx",44);
	HX_STACK_ARG(reg,"reg");
	HX_STACK_LINE(44)
	return ((((HX_CSTRING("<font size=\"") + ::Math_obj::round((Float((::com::gamekit::text::LatexParser_obj::baseFontSize * ::Std_obj::parseInt(reg->matched((int)1)))) / Float((int)100)))) + HX_CSTRING("\">")) + reg->matched((int)2)) + HX_CSTRING("</font>"));
}


STATIC_HX_DEFINE_DYNAMIC_FUNC1(LatexParser_obj,_replaceSize,return )

::String LatexParser_obj::_replaceColor( ::EReg reg){
	HX_STACK_PUSH("LatexParser::_replaceColor","com/gamekit/text/LatexParser.hx",49);
	HX_STACK_ARG(reg,"reg");
	HX_STACK_LINE(50)
	::String color = reg->matched((int)1).toLowerCase();		HX_STACK_VAR(color,"color");
	HX_STACK_LINE(52)
	if (((bool((::com::gamekit::text::LatexParser_obj::standardColors != null())) && bool(::com::gamekit::text::LatexParser_obj::standardColors->exists(color))))){
		HX_STACK_LINE(53)
		color = ::com::gamekit::text::LatexParser_obj::standardColors->get(color);
	}
	else{
		HX_STACK_LINE(58)
		::EReg reg2 = ::EReg_obj::__new(HX_CSTRING("#[0-9a-f]{6}"),HX_CSTRING("i"));		HX_STACK_VAR(reg2,"reg2");
		HX_STACK_LINE(59)
		if ((!(reg2->match(color)))){
			HX_STACK_LINE(60)
			return reg->matched((int)2);
		}
	}
	HX_STACK_LINE(65)
	return ((((HX_CSTRING("<font color=\"") + color) + HX_CSTRING("\">")) + reg->matched((int)2)) + HX_CSTRING("</font>"));
}


STATIC_HX_DEFINE_DYNAMIC_FUNC1(LatexParser_obj,_replaceColor,return )

::String LatexParser_obj::_replaceSub( ::EReg reg){
	HX_STACK_PUSH("LatexParser::_replaceSub","com/gamekit/text/LatexParser.hx",69);
	HX_STACK_ARG(reg,"reg");
	HX_STACK_LINE(69)
	return reg->matched((int)2);
}


STATIC_HX_DEFINE_DYNAMIC_FUNC1(LatexParser_obj,_replaceSub,return )

::String LatexParser_obj::_replaceSup( ::EReg reg){
	HX_STACK_PUSH("LatexParser::_replaceSup","com/gamekit/text/LatexParser.hx",74);
	HX_STACK_ARG(reg,"reg");
	HX_STACK_LINE(74)
	return reg->matched((int)2);
}


STATIC_HX_DEFINE_DYNAMIC_FUNC1(LatexParser_obj,_replaceSup,return )


LatexParser_obj::LatexParser_obj()
{
}

void LatexParser_obj::__Mark(HX_MARK_PARAMS)
{
	HX_MARK_BEGIN_CLASS(LatexParser);
	HX_MARK_END_CLASS();
}

void LatexParser_obj::__Visit(HX_VISIT_PARAMS)
{
}

Dynamic LatexParser_obj::__Field(const ::String &inName,bool inCallProp)
{
	switch(inName.length) {
	case 6:
		if (HX_FIELD_EQ(inName,"toHtml") ) { return toHtml_dyn(); }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"_replaceSub") ) { return _replaceSub_dyn(); }
		if (HX_FIELD_EQ(inName,"_replaceSup") ) { return _replaceSup_dyn(); }
		break;
	case 12:
		if (HX_FIELD_EQ(inName,"baseFontSize") ) { return baseFontSize; }
		if (HX_FIELD_EQ(inName,"_replaceSize") ) { return _replaceSize_dyn(); }
		break;
	case 13:
		if (HX_FIELD_EQ(inName,"_replaceColor") ) { return _replaceColor_dyn(); }
		break;
	case 14:
		if (HX_FIELD_EQ(inName,"standardColors") ) { return standardColors; }
	}
	return super::__Field(inName,inCallProp);
}

Dynamic LatexParser_obj::__SetField(const ::String &inName,const Dynamic &inValue,bool inCallProp)
{
	switch(inName.length) {
	case 12:
		if (HX_FIELD_EQ(inName,"baseFontSize") ) { baseFontSize=inValue.Cast< int >(); return inValue; }
		break;
	case 14:
		if (HX_FIELD_EQ(inName,"standardColors") ) { standardColors=inValue.Cast< ::haxe::ds::StringMap >(); return inValue; }
	}
	return super::__SetField(inName,inValue,inCallProp);
}

void LatexParser_obj::__GetFields(Array< ::String> &outFields)
{
	super::__GetFields(outFields);
};

static ::String sStaticFields[] = {
	HX_CSTRING("baseFontSize"),
	HX_CSTRING("standardColors"),
	HX_CSTRING("toHtml"),
	HX_CSTRING("_replaceSize"),
	HX_CSTRING("_replaceColor"),
	HX_CSTRING("_replaceSub"),
	HX_CSTRING("_replaceSup"),
	String(null()) };

static ::String sMemberFields[] = {
	String(null()) };

static void sMarkStatics(HX_MARK_PARAMS) {
	HX_MARK_MEMBER_NAME(LatexParser_obj::__mClass,"__mClass");
	HX_MARK_MEMBER_NAME(LatexParser_obj::baseFontSize,"baseFontSize");
	HX_MARK_MEMBER_NAME(LatexParser_obj::standardColors,"standardColors");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(LatexParser_obj::__mClass,"__mClass");
	HX_VISIT_MEMBER_NAME(LatexParser_obj::baseFontSize,"baseFontSize");
	HX_VISIT_MEMBER_NAME(LatexParser_obj::standardColors,"standardColors");
};

Class LatexParser_obj::__mClass;

void LatexParser_obj::__register()
{
	hx::Static(__mClass) = hx::RegisterClass(HX_CSTRING("com.gamekit.text.LatexParser"), hx::TCanCast< LatexParser_obj> ,sStaticFields,sMemberFields,
	&__CreateEmpty, &__Create,
	&super::__SGetClass(), 0, sMarkStatics, sVisitStatics);
}

void LatexParser_obj::__boot()
{
	baseFontSize= (int)14;
}

} // end namespace com
} // end namespace gamekit
} // end namespace text
