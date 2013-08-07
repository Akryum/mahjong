#ifndef INCLUDED_tjson_SimpleStyle
#define INCLUDED_tjson_SimpleStyle

#ifndef HXCPP_H
#include <hxcpp.h>
#endif

#include <tjson/EncodeStyle.h>
HX_DECLARE_CLASS1(tjson,EncodeStyle)
HX_DECLARE_CLASS1(tjson,SimpleStyle)
namespace tjson{


class HXCPP_CLASS_ATTRIBUTES  SimpleStyle_obj : public hx::Object{
	public:
		typedef hx::Object super;
		typedef SimpleStyle_obj OBJ_;
		SimpleStyle_obj();
		Void __construct();

	public:
		static hx::ObjectPtr< SimpleStyle_obj > __new();
		static Dynamic __CreateEmpty();
		static Dynamic __Create(hx::DynamicArray inArgs);
		~SimpleStyle_obj();

		HX_DO_RTTI;
		static void __boot();
		static void __register();
		void __Mark(HX_MARK_PARAMS);
		void __Visit(HX_VISIT_PARAMS);
		inline operator ::tjson::EncodeStyle_obj *()
			{ return new ::tjson::EncodeStyle_delegate_< SimpleStyle_obj >(this); }
		hx::Object *__ToInterface(const hx::type_info &inType);
		::String __ToString() const { return HX_CSTRING("SimpleStyle"); }

		virtual ::String keyValueSeperator( int depth);
		Dynamic keyValueSeperator_dyn();

		virtual ::String entrySeperator( int depth);
		Dynamic entrySeperator_dyn();

		virtual ::String firstEntry( int depth);
		Dynamic firstEntry_dyn();

		virtual ::String endArray( int depth);
		Dynamic endArray_dyn();

		virtual ::String beginArray( int depth);
		Dynamic beginArray_dyn();

		virtual ::String endObject( int depth);
		Dynamic endObject_dyn();

		virtual ::String beginObject( int depth);
		Dynamic beginObject_dyn();

};

} // end namespace tjson

#endif /* INCLUDED_tjson_SimpleStyle */ 
