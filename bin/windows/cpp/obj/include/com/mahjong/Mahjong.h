#ifndef INCLUDED_com_mahjong_Mahjong
#define INCLUDED_com_mahjong_Mahjong

#ifndef HXCPP_H
#include <hxcpp.h>
#endif

#include <flash/display/Sprite.h>
HX_DECLARE_CLASS3(com,gamekit,core,IDestroyable)
HX_DECLARE_CLASS3(com,gamekit,core,IJsonParsable)
HX_DECLARE_CLASS4(com,gamekit,mvc,model,Model)
HX_DECLARE_CLASS4(com,gamekit,mvc,view,View)
HX_DECLARE_CLASS2(com,mahjong,Mahjong)
HX_DECLARE_CLASS3(com,mahjong,model,TileModel)
HX_DECLARE_CLASS3(com,mahjong,view,TileView)
HX_DECLARE_CLASS2(flash,display,DisplayObject)
HX_DECLARE_CLASS2(flash,display,DisplayObjectContainer)
HX_DECLARE_CLASS2(flash,display,IBitmapDrawable)
HX_DECLARE_CLASS2(flash,display,InteractiveObject)
HX_DECLARE_CLASS2(flash,display,Sprite)
HX_DECLARE_CLASS2(flash,events,EventDispatcher)
HX_DECLARE_CLASS2(flash,events,IEventDispatcher)
namespace com{
namespace mahjong{


class HXCPP_CLASS_ATTRIBUTES  Mahjong_obj : public ::flash::display::Sprite_obj{
	public:
		typedef ::flash::display::Sprite_obj super;
		typedef Mahjong_obj OBJ_;
		Mahjong_obj();
		Void __construct();

	public:
		static hx::ObjectPtr< Mahjong_obj > __new();
		static Dynamic __CreateEmpty();
		static Dynamic __Create(hx::DynamicArray inArgs);
		~Mahjong_obj();

		HX_DO_RTTI;
		static void __boot();
		static void __register();
		void __Mark(HX_MARK_PARAMS);
		void __Visit(HX_VISIT_PARAMS);
		::String __ToString() const { return HX_CSTRING("Mahjong"); }

		Array< ::Dynamic > _tileViews;
		Array< ::Dynamic > _tileModels;
};

} // end namespace com
} // end namespace mahjong

#endif /* INCLUDED_com_mahjong_Mahjong */ 
