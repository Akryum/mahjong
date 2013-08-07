#include <hxcpp.h>

#ifndef INCLUDED_IMap
#include <IMap.h>
#endif
#ifndef INCLUDED_com_App
#include <com/App.h>
#endif
#ifndef INCLUDED_com_DefaultFont
#include <com/DefaultFont.h>
#endif
#ifndef INCLUDED_com_gamekit_text_LatexParser
#include <com/gamekit/text/LatexParser.h>
#endif
#ifndef INCLUDED_com_mahjong_Mahjong
#include <com/mahjong/Mahjong.h>
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
#ifndef INCLUDED_flash_events_EventDispatcher
#include <flash/events/EventDispatcher.h>
#endif
#ifndef INCLUDED_flash_events_IEventDispatcher
#include <flash/events/IEventDispatcher.h>
#endif
#ifndef INCLUDED_flash_text_Font
#include <flash/text/Font.h>
#endif
#ifndef INCLUDED_haxe_ds_StringMap
#include <haxe/ds/StringMap.h>
#endif
namespace com{

Void App_obj::__construct()
{
HX_STACK_PUSH("App::new","com/App.hx",19);
{
	HX_STACK_LINE(20)
	super::__construct();
	HX_STACK_LINE(23)
	::flash::text::Font_obj::registerFont(hx::ClassOf< ::com::DefaultFont >());
	HX_STACK_LINE(26)
	::com::gamekit::text::LatexParser_obj::standardColors = ::haxe::ds::StringMap_obj::__new();
	HX_STACK_LINE(27)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("apricot"),HX_CSTRING("#fbb982"));
	HX_STACK_LINE(28)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("aquamarine"),HX_CSTRING("#fbb982"));
	HX_STACK_LINE(29)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("bittersweet"),HX_CSTRING("#c04f16"));
	HX_STACK_LINE(30)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("black"),HX_CSTRING("#000000"));
	HX_STACK_LINE(31)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("blue"),HX_CSTRING("#2c2f92"));
	HX_STACK_LINE(32)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("bluegreen"),HX_CSTRING("#00b3b8"));
	HX_STACK_LINE(33)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("blueviolet"),HX_CSTRING("#463892"));
	HX_STACK_LINE(34)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("brickred"),HX_CSTRING("#b6311b"));
	HX_STACK_LINE(35)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("brown"),HX_CSTRING("#792400"));
	HX_STACK_LINE(36)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("burntorange"),HX_CSTRING("#f7921d"));
	HX_STACK_LINE(37)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("cadetblue"),HX_CSTRING("#74729a"));
	HX_STACK_LINE(38)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("carnationpink"),HX_CSTRING("#f282b3"));
	HX_STACK_LINE(39)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("cerulean"),HX_CSTRING("#00a1e3"));
	HX_STACK_LINE(40)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("cornflowerblue"),HX_CSTRING("#40b0e4"));
	HX_STACK_LINE(41)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("cyan"),HX_CSTRING("#00adef"));
	HX_STACK_LINE(42)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("dandelion"),HX_CSTRING("#fdbb41"));
	HX_STACK_LINE(43)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("darkorchid"),HX_CSTRING("#a4528a"));
	HX_STACK_LINE(44)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("emerald"),HX_CSTRING("#00a99d"));
	HX_STACK_LINE(45)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("forestgreen"),HX_CSTRING("#009b55"));
	HX_STACK_LINE(46)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("fuchsia"),HX_CSTRING("#8c358c"));
	HX_STACK_LINE(47)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("goldenrod"),HX_CSTRING("#ffde41"));
	HX_STACK_LINE(48)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("gray"),HX_CSTRING("#949698"));
	HX_STACK_LINE(49)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("green"),HX_CSTRING("#00a64e"));
	HX_STACK_LINE(50)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("greenyellow"),HX_CSTRING("#dfe674"));
	HX_STACK_LINE(51)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("junlegreen"),HX_CSTRING("#00a99a"));
	HX_STACK_LINE(52)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("lavender"),HX_CSTRING("#f49ec4"));
	HX_STACK_LINE(53)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("limegreen"),HX_CSTRING("#8dc73d"));
	HX_STACK_LINE(54)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("magenta"),HX_CSTRING("#ec008c"));
	HX_STACK_LINE(55)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("mahogany"),HX_CSTRING("#a9341e"));
	HX_STACK_LINE(56)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("maroon"),HX_CSTRING("#af3135"));
	HX_STACK_LINE(57)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("melon"),HX_CSTRING("#f89d7a"));
	HX_STACK_LINE(58)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("midnightblue"),HX_CSTRING("#006695"));
	HX_STACK_LINE(59)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("mulberry"),HX_CSTRING("#a93b92"));
	HX_STACK_LINE(60)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("navyblue"),HX_CSTRING("#006eb8"));
	HX_STACK_LINE(61)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("olivegreen"),HX_CSTRING("#3c8030"));
	HX_STACK_LINE(62)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("orange"),HX_CSTRING("#f58137"));
	HX_STACK_LINE(63)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("orangered"),HX_CSTRING("#ed135a"));
	HX_STACK_LINE(64)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("orchid"),HX_CSTRING("#af72b0"));
	HX_STACK_LINE(65)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("peach"),HX_CSTRING("#f79659"));
	HX_STACK_LINE(66)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("periwinkle"),HX_CSTRING("#7976b8"));
	HX_STACK_LINE(67)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("pinegreen"),HX_CSTRING("#008b72"));
	HX_STACK_LINE(68)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("plum"),HX_CSTRING("#92258e"));
	HX_STACK_LINE(69)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("processblue"),HX_CSTRING("#00b0f0"));
	HX_STACK_LINE(70)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("purple"),HX_CSTRING("#99479b"));
	HX_STACK_LINE(71)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("rawsienna"),HX_CSTRING("#974005"));
	HX_STACK_LINE(72)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("red"),HX_CSTRING("#ed1b22"));
	HX_STACK_LINE(73)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("redorange"),HX_CSTRING("#f26034"));
	HX_STACK_LINE(74)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("redviolet"),HX_CSTRING("#a1236a"));
	HX_STACK_LINE(75)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("rhodamine"),HX_CSTRING("#ef559f"));
	HX_STACK_LINE(76)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("royalblue"),HX_CSTRING("#0070bc"));
	HX_STACK_LINE(77)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("royalpurple"),HX_CSTRING("#603e99"));
	HX_STACK_LINE(78)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("rubinered"),HX_CSTRING("#ed007c"));
	HX_STACK_LINE(79)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("salmon"),HX_CSTRING("#f69188"));
	HX_STACK_LINE(80)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("seagreen"),HX_CSTRING("#3ebc9c"));
	HX_STACK_LINE(81)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("sepia"),HX_CSTRING("#671700"));
	HX_STACK_LINE(82)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("skyblue"),HX_CSTRING("#45c5dd"));
	HX_STACK_LINE(83)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("springgreen"),HX_CSTRING("#c6dc66"));
	HX_STACK_LINE(84)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("tan"),HX_CSTRING("#da9d76"));
	HX_STACK_LINE(85)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("tealblue"),HX_CSTRING("#00aeb3"));
	HX_STACK_LINE(86)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("thistle"),HX_CSTRING("#d882b6"));
	HX_STACK_LINE(87)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("turquoise"),HX_CSTRING("#00b4ce"));
	HX_STACK_LINE(88)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("violet"),HX_CSTRING("#57419b"));
	HX_STACK_LINE(89)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("violetred"),HX_CSTRING("#ef57a0"));
	HX_STACK_LINE(90)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("white"),HX_CSTRING("#ffffff"));
	HX_STACK_LINE(91)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("wildstrawberry"),HX_CSTRING("#ee2866"));
	HX_STACK_LINE(92)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("yellow"),HX_CSTRING("#fff200"));
	HX_STACK_LINE(93)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("yellowgreen"),HX_CSTRING("#98cc70"));
	HX_STACK_LINE(94)
	::com::gamekit::text::LatexParser_obj::standardColors->set(HX_CSTRING("yelloworange"),HX_CSTRING("#faa21a"));
	HX_STACK_LINE(96)
	::com::mahjong::Mahjong mahjong = ::com::mahjong::Mahjong_obj::__new();		HX_STACK_VAR(mahjong,"mahjong");
	HX_STACK_LINE(97)
	this->addChild(mahjong);
}
;
	return null();
}

App_obj::~App_obj() { }

Dynamic App_obj::__CreateEmpty() { return  new App_obj; }
hx::ObjectPtr< App_obj > App_obj::__new()
{  hx::ObjectPtr< App_obj > result = new App_obj();
	result->__construct();
	return result;}

Dynamic App_obj::__Create(hx::DynamicArray inArgs)
{  hx::ObjectPtr< App_obj > result = new App_obj();
	result->__construct();
	return result;}


App_obj::App_obj()
{
}

void App_obj::__Mark(HX_MARK_PARAMS)
{
	HX_MARK_BEGIN_CLASS(App);
	super::__Mark(HX_MARK_ARG);
	HX_MARK_END_CLASS();
}

void App_obj::__Visit(HX_VISIT_PARAMS)
{
	super::__Visit(HX_VISIT_ARG);
}

Dynamic App_obj::__Field(const ::String &inName,bool inCallProp)
{
	return super::__Field(inName,inCallProp);
}

Dynamic App_obj::__SetField(const ::String &inName,const Dynamic &inValue,bool inCallProp)
{
	return super::__SetField(inName,inValue,inCallProp);
}

void App_obj::__GetFields(Array< ::String> &outFields)
{
	super::__GetFields(outFields);
};

static ::String sStaticFields[] = {
	String(null()) };

static ::String sMemberFields[] = {
	String(null()) };

static void sMarkStatics(HX_MARK_PARAMS) {
	HX_MARK_MEMBER_NAME(App_obj::__mClass,"__mClass");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(App_obj::__mClass,"__mClass");
};

Class App_obj::__mClass;

void App_obj::__register()
{
	hx::Static(__mClass) = hx::RegisterClass(HX_CSTRING("com.App"), hx::TCanCast< App_obj> ,sStaticFields,sMemberFields,
	&__CreateEmpty, &__Create,
	&super::__SGetClass(), 0, sMarkStatics, sVisitStatics);
}

void App_obj::__boot()
{
}

} // end namespace com
