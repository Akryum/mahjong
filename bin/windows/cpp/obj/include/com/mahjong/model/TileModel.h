#ifndef INCLUDED_com_mahjong_model_TileModel
#define INCLUDED_com_mahjong_model_TileModel

#ifndef HXCPP_H
#include <hxcpp.h>
#endif

#include <com/gamekit/mvc/model/Model.h>
HX_DECLARE_CLASS3(com,gamekit,core,IDestroyable)
HX_DECLARE_CLASS3(com,gamekit,core,IJsonParsable)
HX_DECLARE_CLASS4(com,gamekit,mvc,model,Model)
HX_DECLARE_CLASS3(com,mahjong,model,TileModel)
HX_DECLARE_CLASS2(flash,events,EventDispatcher)
HX_DECLARE_CLASS2(flash,events,IEventDispatcher)
namespace com{
namespace mahjong{
namespace model{


class HXCPP_CLASS_ATTRIBUTES  TileModel_obj : public ::com::gamekit::mvc::model::Model_obj{
	public:
		typedef ::com::gamekit::mvc::model::Model_obj super;
		typedef TileModel_obj OBJ_;
		TileModel_obj();
		Void __construct();

	public:
		static hx::ObjectPtr< TileModel_obj > __new();
		static Dynamic __CreateEmpty();
		static Dynamic __Create(hx::DynamicArray inArgs);
		~TileModel_obj();

		HX_DO_RTTI;
		static void __boot();
		static void __register();
		void __Mark(HX_MARK_PARAMS);
		void __Visit(HX_VISIT_PARAMS);
		::String __ToString() const { return HX_CSTRING("TileModel"); }

		virtual ::String set_context( ::String value);
		Dynamic set_context_dyn();

		virtual ::String get_context( );
		Dynamic get_context_dyn();

		virtual ::String set_information( ::String value);
		Dynamic set_information_dyn();

		virtual ::String get_information( );
		Dynamic get_information_dyn();

		virtual bool set_rotated( bool value);
		Dynamic set_rotated_dyn();

		virtual bool get_rotated( );
		Dynamic get_rotated_dyn();

		virtual ::String set_value( ::String value);
		Dynamic set_value_dyn();

		virtual ::String get_value( );
		Dynamic get_value_dyn();

		virtual ::String set_type( ::String value);
		Dynamic set_type_dyn();

		virtual ::String get_type( );
		Dynamic get_type_dyn();

		virtual Void _parseJson( Dynamic data);

		::String _context;
		::String _information;
		bool _rotated;
		::String _value;
		::String _type;
};

} // end namespace com
} // end namespace mahjong
} // end namespace model

#endif /* INCLUDED_com_mahjong_model_TileModel */ 
