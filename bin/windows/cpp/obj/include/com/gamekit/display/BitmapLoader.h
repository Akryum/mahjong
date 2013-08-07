#ifndef INCLUDED_com_gamekit_display_BitmapLoader
#define INCLUDED_com_gamekit_display_BitmapLoader

#ifndef HXCPP_H
#include <hxcpp.h>
#endif

#include <com/gamekit/core/IDestroyable.h>
HX_DECLARE_CLASS0(IMap)
HX_DECLARE_CLASS3(com,gamekit,core,IDestroyable)
HX_DECLARE_CLASS3(com,gamekit,display,BitmapLoader)
HX_DECLARE_CLASS2(flash,display,BitmapData)
HX_DECLARE_CLASS2(flash,display,DisplayObject)
HX_DECLARE_CLASS2(flash,display,DisplayObjectContainer)
HX_DECLARE_CLASS2(flash,display,IBitmapDrawable)
HX_DECLARE_CLASS2(flash,display,InteractiveObject)
HX_DECLARE_CLASS2(flash,display,Loader)
HX_DECLARE_CLASS2(flash,display,Sprite)
HX_DECLARE_CLASS2(flash,events,Event)
HX_DECLARE_CLASS2(flash,events,EventDispatcher)
HX_DECLARE_CLASS2(flash,events,IEventDispatcher)
HX_DECLARE_CLASS2(haxe,ds,StringMap)
namespace com{
namespace gamekit{
namespace display{


class HXCPP_CLASS_ATTRIBUTES  BitmapLoader_obj : public hx::Object{
	public:
		typedef hx::Object super;
		typedef BitmapLoader_obj OBJ_;
		BitmapLoader_obj();
		Void __construct(::String url,Dynamic callback);

	public:
		static hx::ObjectPtr< BitmapLoader_obj > __new(::String url,Dynamic callback);
		static Dynamic __CreateEmpty();
		static Dynamic __Create(hx::DynamicArray inArgs);
		~BitmapLoader_obj();

		HX_DO_RTTI;
		static void __boot();
		static void __register();
		void __Mark(HX_MARK_PARAMS);
		void __Visit(HX_VISIT_PARAMS);
		inline operator ::com::gamekit::core::IDestroyable_obj *()
			{ return new ::com::gamekit::core::IDestroyable_delegate_< BitmapLoader_obj >(this); }
		hx::Object *__ToInterface(const hx::type_info &inType);
		::String __ToString() const { return HX_CSTRING("BitmapLoader"); }

		::flash::display::BitmapData bitmapData;
		virtual ::flash::display::BitmapData get_bitmapData( );
		Dynamic get_bitmapData_dyn();

		Dynamic callback;
		Dynamic &callback_dyn() { return callback;}
		virtual Dynamic get_callback( );
		Dynamic get_callback_dyn();

		::String url;
		virtual ::String get_url( );
		Dynamic get_url_dyn();

		virtual Void _onLoadComplete( ::flash::events::Event e);
		Dynamic _onLoadComplete_dyn();

		virtual Void _applyCallback( );
		Dynamic _applyCallback_dyn();

		virtual Void _load( );
		Dynamic _load_dyn();

		virtual Void destroy( );
		Dynamic destroy_dyn();

		::flash::display::Loader _loader;
		::flash::display::BitmapData _bitmapData;
		Dynamic _callback;
		Dynamic &_callback_dyn() { return _callback;}
		::String _url;
		static ::haxe::ds::StringMap _cache;
		static Void clearCache( );
		static Dynamic clearCache_dyn();

};

} // end namespace com
} // end namespace gamekit
} // end namespace display

#endif /* INCLUDED_com_gamekit_display_BitmapLoader */ 
