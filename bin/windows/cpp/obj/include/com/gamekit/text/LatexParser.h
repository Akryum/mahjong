#ifndef INCLUDED_com_gamekit_text_LatexParser
#define INCLUDED_com_gamekit_text_LatexParser

#ifndef HXCPP_H
#include <hxcpp.h>
#endif

HX_DECLARE_CLASS0(EReg)
HX_DECLARE_CLASS0(IMap)
HX_DECLARE_CLASS3(com,gamekit,text,LatexParser)
HX_DECLARE_CLASS2(haxe,ds,StringMap)
namespace com{
namespace gamekit{
namespace text{


class HXCPP_CLASS_ATTRIBUTES  LatexParser_obj : public hx::Object{
	public:
		typedef hx::Object super;
		typedef LatexParser_obj OBJ_;
		LatexParser_obj();
		Void __construct();

	public:
		static hx::ObjectPtr< LatexParser_obj > __new();
		static Dynamic __CreateEmpty();
		static Dynamic __Create(hx::DynamicArray inArgs);
		~LatexParser_obj();

		HX_DO_RTTI;
		static void __boot();
		static void __register();
		void __Mark(HX_MARK_PARAMS);
		void __Visit(HX_VISIT_PARAMS);
		::String __ToString() const { return HX_CSTRING("LatexParser"); }

		static int baseFontSize;
		static ::haxe::ds::StringMap standardColors;
		static ::String toHtml( ::String latex);
		static Dynamic toHtml_dyn();

		static ::String _replaceSize( ::EReg reg);
		static Dynamic _replaceSize_dyn();

		static ::String _replaceColor( ::EReg reg);
		static Dynamic _replaceColor_dyn();

		static ::String _replaceSub( ::EReg reg);
		static Dynamic _replaceSub_dyn();

		static ::String _replaceSup( ::EReg reg);
		static Dynamic _replaceSup_dyn();

};

} // end namespace com
} // end namespace gamekit
} // end namespace text

#endif /* INCLUDED_com_gamekit_text_LatexParser */ 
