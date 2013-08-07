#ifndef INCLUDED_com_DefaultFont
#define INCLUDED_com_DefaultFont

#ifndef HXCPP_H
#include <hxcpp.h>
#endif

#include <flash/text/Font.h>
HX_DECLARE_CLASS1(com,DefaultFont)
HX_DECLARE_CLASS2(flash,text,Font)
HX_DECLARE_CLASS2(flash,text,FontStyle)
HX_DECLARE_CLASS2(flash,text,FontType)
namespace com{


class HXCPP_CLASS_ATTRIBUTES  DefaultFont_obj : public ::flash::text::Font_obj{
	public:
		typedef ::flash::text::Font_obj super;
		typedef DefaultFont_obj OBJ_;
		DefaultFont_obj();
		Void __construct(::String __o_filename,::flash::text::FontStyle style,::flash::text::FontType type);

	public:
		static hx::ObjectPtr< DefaultFont_obj > __new(::String __o_filename,::flash::text::FontStyle style,::flash::text::FontType type);
		static Dynamic __CreateEmpty();
		static Dynamic __Create(hx::DynamicArray inArgs);
		~DefaultFont_obj();

		HX_DO_RTTI;
		static void __boot();
		static void __register();
		void __Mark(HX_MARK_PARAMS);
		void __Visit(HX_VISIT_PARAMS);
		::String __ToString() const { return HX_CSTRING("DefaultFont"); }

		static ::String resourceName;
};

} // end namespace com

#endif /* INCLUDED_com_DefaultFont */ 
