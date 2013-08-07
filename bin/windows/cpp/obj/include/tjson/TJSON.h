#ifndef INCLUDED_tjson_TJSON
#define INCLUDED_tjson_TJSON

#ifndef HXCPP_H
#include <hxcpp.h>
#endif

HX_DECLARE_CLASS0(EReg)
HX_DECLARE_CLASS1(tjson,EncodeStyle)
HX_DECLARE_CLASS1(tjson,TJSON)
namespace tjson{


class HXCPP_CLASS_ATTRIBUTES  TJSON_obj : public hx::Object{
	public:
		typedef hx::Object super;
		typedef TJSON_obj OBJ_;
		TJSON_obj();
		Void __construct();

	public:
		static hx::ObjectPtr< TJSON_obj > __new();
		static Dynamic __CreateEmpty();
		static Dynamic __Create(hx::DynamicArray inArgs);
		~TJSON_obj();

		HX_DO_RTTI;
		static void __boot();
		static void __register();
		void __Mark(HX_MARK_PARAMS);
		void __Visit(HX_VISIT_PARAMS);
		::String __ToString() const { return HX_CSTRING("TJSON"); }

		static int pos;
		static ::String json;
		static bool lastSymbolQuoted;
		static ::String fileName;
		static int currentLine;
		static ::EReg floatRegex;
		static ::EReg intRegex;
		static Dynamic parse( ::String json,::String fileName);
		static Dynamic parse_dyn();

		static ::String encode( Dynamic obj,Dynamic style);
		static Dynamic encode_dyn();

		static Dynamic doParse( );
		static Dynamic doParse_dyn();

		static Dynamic doObject( );
		static Dynamic doObject_dyn();

		static Dynamic doArray( );
		static Dynamic doArray_dyn();

		static Dynamic convertSymbolToProperType( ::String symbol);
		static Dynamic convertSymbolToProperType_dyn();

		static bool looksLikeFloat( ::String s);
		static Dynamic looksLikeFloat_dyn();

		static bool looksLikeInt( ::String s);
		static Dynamic looksLikeInt_dyn();

		static ::String getNextSymbol( );
		static Dynamic getNextSymbol_dyn();

		static ::String encodeAnonymousObject( Dynamic obj,::tjson::EncodeStyle style,int depth);
		static Dynamic encodeAnonymousObject_dyn();

		static ::String encodeArray( Dynamic obj,::tjson::EncodeStyle style,int depth);
		static Dynamic encodeArray_dyn();

		static ::String encodeValue( Dynamic value,::tjson::EncodeStyle style,int depth);
		static Dynamic encodeValue_dyn();

};

} // end namespace tjson

#endif /* INCLUDED_tjson_TJSON */ 
