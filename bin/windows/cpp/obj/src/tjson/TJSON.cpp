#include <hxcpp.h>

#ifndef INCLUDED_EReg
#include <EReg.h>
#endif
#ifndef INCLUDED_Reflect
#include <Reflect.h>
#endif
#ifndef INCLUDED_Std
#include <Std.h>
#endif
#ifndef INCLUDED_StringTools
#include <StringTools.h>
#endif
#ifndef INCLUDED_tjson_EncodeStyle
#include <tjson/EncodeStyle.h>
#endif
#ifndef INCLUDED_tjson_FancyStyle
#include <tjson/FancyStyle.h>
#endif
#ifndef INCLUDED_tjson_SimpleStyle
#include <tjson/SimpleStyle.h>
#endif
#ifndef INCLUDED_tjson_TJSON
#include <tjson/TJSON.h>
#endif
namespace tjson{

Void TJSON_obj::__construct()
{
	return null();
}

TJSON_obj::~TJSON_obj() { }

Dynamic TJSON_obj::__CreateEmpty() { return  new TJSON_obj; }
hx::ObjectPtr< TJSON_obj > TJSON_obj::__new()
{  hx::ObjectPtr< TJSON_obj > result = new TJSON_obj();
	result->__construct();
	return result;}

Dynamic TJSON_obj::__Create(hx::DynamicArray inArgs)
{  hx::ObjectPtr< TJSON_obj > result = new TJSON_obj();
	result->__construct();
	return result;}

int TJSON_obj::pos;

::String TJSON_obj::json;

bool TJSON_obj::lastSymbolQuoted;

::String TJSON_obj::fileName;

int TJSON_obj::currentLine;

::EReg TJSON_obj::floatRegex;

::EReg TJSON_obj::intRegex;

Dynamic TJSON_obj::parse( ::String json,::String __o_fileName){
::String fileName = __o_fileName.Default(HX_CSTRING("JSON Data"));
	HX_STACK_PUSH("TJSON::parse","tjson/TJSON.hx",20);
	HX_STACK_ARG(json,"json");
	HX_STACK_ARG(fileName,"fileName");
{
		HX_STACK_LINE(21)
		::tjson::TJSON_obj::floatRegex = ::EReg_obj::__new(HX_CSTRING("^-?[0-9]*\\.[0-9]+$"),HX_CSTRING(""));
		HX_STACK_LINE(22)
		::tjson::TJSON_obj::intRegex = ::EReg_obj::__new(HX_CSTRING("^-?[0-9]+$"),HX_CSTRING(""));
		HX_STACK_LINE(23)
		::tjson::TJSON_obj::json = json;
		HX_STACK_LINE(24)
		::tjson::TJSON_obj::fileName = fileName;
		HX_STACK_LINE(25)
		::tjson::TJSON_obj::currentLine = (int)1;
		HX_STACK_LINE(26)
		::tjson::TJSON_obj::pos = (int)0;
		HX_STACK_LINE(28)
		try{
			HX_STACK_LINE(28)
			return ::tjson::TJSON_obj::doParse();
		}
		catch(Dynamic __e){
			if (__e.IsClass< ::String >() ){
				HX_STACK_BEGIN_CATCH
				::String e = __e;{
					HX_STACK_LINE(30)
					hx::Throw (((((fileName + HX_CSTRING(" on line ")) + ::tjson::TJSON_obj::currentLine) + HX_CSTRING(": ")) + e));
				}
			}
			else throw(__e);
		}
		HX_STACK_LINE(33)
		return null();
	}
}


STATIC_HX_DEFINE_DYNAMIC_FUNC2(TJSON_obj,parse,return )

::String TJSON_obj::encode( Dynamic obj,Dynamic style){
	HX_STACK_PUSH("TJSON::encode","tjson/TJSON.hx",41);
	HX_STACK_ARG(obj,"obj");
	HX_STACK_ARG(style,"style");
	HX_STACK_LINE(42)
	if ((!(::Reflect_obj::isObject(obj)))){
		HX_STACK_LINE(42)
		hx::Throw (HX_CSTRING("Provided object is not an object."));
	}
	HX_STACK_LINE(45)
	::tjson::EncodeStyle st;		HX_STACK_VAR(st,"st");
	HX_STACK_LINE(46)
	if ((::Std_obj::is(style,hx::ClassOf< ::tjson::EncodeStyle >()))){
		HX_STACK_LINE(46)
		st = style;
	}
	else{
		HX_STACK_LINE(49)
		if (((style == HX_CSTRING("fancy")))){
			HX_STACK_LINE(49)
			st = ::tjson::FancyStyle_obj::__new();
		}
		else{
			HX_STACK_LINE(52)
			st = ::tjson::SimpleStyle_obj::__new();
		}
	}
	HX_STACK_LINE(53)
	if ((::Std_obj::is(obj,hx::ClassOf< Array<int> >()))){
		HX_STACK_LINE(53)
		return ::tjson::TJSON_obj::encodeArray(obj,st,(int)0);
	}
	HX_STACK_LINE(54)
	return ::tjson::TJSON_obj::encodeAnonymousObject(obj,st,(int)0);
}


STATIC_HX_DEFINE_DYNAMIC_FUNC2(TJSON_obj,encode,return )

Dynamic TJSON_obj::doParse( ){
	HX_STACK_PUSH("TJSON::doParse","tjson/TJSON.hx",59);
	HX_STACK_LINE(61)
	::String s = ::tjson::TJSON_obj::getNextSymbol();		HX_STACK_VAR(s,"s");
	HX_STACK_LINE(62)
	if (((s == HX_CSTRING("{")))){
		HX_STACK_LINE(62)
		return ::tjson::TJSON_obj::doObject();
	}
	HX_STACK_LINE(66)
	if (((s == HX_CSTRING("[")))){
		HX_STACK_LINE(66)
		return ::tjson::TJSON_obj::doArray();
	}
	HX_STACK_LINE(69)
	return null();
}


STATIC_HX_DEFINE_DYNAMIC_FUNC0(TJSON_obj,doParse,return )

Dynamic TJSON_obj::doObject( ){
	HX_STACK_PUSH("TJSON::doObject","tjson/TJSON.hx",72);
	struct _Function_1_1{
		inline static Dynamic Block( ){
			HX_STACK_PUSH("*::closure","tjson/TJSON.hx",73);
			{
				hx::Anon __result = hx::Anon_obj::Create();
				return __result;
			}
			return null();
		}
	};
	HX_STACK_LINE(73)
	Dynamic o = _Function_1_1::Block();		HX_STACK_VAR(o,"o");
	HX_STACK_LINE(74)
	Dynamic val = HX_CSTRING("");		HX_STACK_VAR(val,"val");
	HX_STACK_LINE(75)
	::String key;		HX_STACK_VAR(key,"key");
	HX_STACK_LINE(76)
	while((((key = ::tjson::TJSON_obj::getNextSymbol()) != HX_CSTRING("")))){
		HX_STACK_LINE(77)
		if (((key == HX_CSTRING(",")))){
			HX_STACK_LINE(77)
			continue;
		}
		HX_STACK_LINE(78)
		if (((key == HX_CSTRING("}")))){
			HX_STACK_LINE(78)
			return o;
		}
		HX_STACK_LINE(82)
		::String seperator = ::tjson::TJSON_obj::getNextSymbol();		HX_STACK_VAR(seperator,"seperator");
		HX_STACK_LINE(83)
		if (((seperator != HX_CSTRING(":")))){
			HX_STACK_LINE(83)
			hx::Throw (((HX_CSTRING("Expected ':' but got '") + seperator) + HX_CSTRING("' instead.")));
		}
		HX_STACK_LINE(87)
		::String v = ::tjson::TJSON_obj::getNextSymbol();		HX_STACK_VAR(v,"v");
		HX_STACK_LINE(88)
		if (((v == HX_CSTRING("{")))){
			HX_STACK_LINE(88)
			val = ::tjson::TJSON_obj::doObject();
		}
		else{
			HX_STACK_LINE(90)
			if (((v == HX_CSTRING("[")))){
				HX_STACK_LINE(90)
				val = ::tjson::TJSON_obj::doArray();
			}
			else{
				HX_STACK_LINE(92)
				val = ::tjson::TJSON_obj::convertSymbolToProperType(v);
			}
		}
		HX_STACK_LINE(95)
		if (((o != null()))){
			HX_STACK_LINE(95)
			o->__SetField(key,val,false);
		}
	}
	HX_STACK_LINE(97)
	hx::Throw (HX_CSTRING("Unexpected end of file. Expected '}'"));
	HX_STACK_LINE(97)
	return null();
}


STATIC_HX_DEFINE_DYNAMIC_FUNC0(TJSON_obj,doObject,return )

Dynamic TJSON_obj::doArray( ){
	HX_STACK_PUSH("TJSON::doArray","tjson/TJSON.hx",101);
	HX_STACK_LINE(102)
	Dynamic a = Dynamic( Array_obj<Dynamic>::__new() );		HX_STACK_VAR(a,"a");
	HX_STACK_LINE(103)
	Dynamic val;		HX_STACK_VAR(val,"val");
	HX_STACK_LINE(104)
	while((((val = ::tjson::TJSON_obj::getNextSymbol()) != HX_CSTRING("")))){
		HX_STACK_LINE(105)
		if (((val == HX_CSTRING(",")))){
			HX_STACK_LINE(105)
			continue;
		}
		else{
			HX_STACK_LINE(108)
			if (((val == HX_CSTRING("]")))){
				HX_STACK_LINE(108)
				return a;
			}
			else{
				HX_STACK_LINE(111)
				if (((val == HX_CSTRING("{")))){
					HX_STACK_LINE(111)
					val = ::tjson::TJSON_obj::doObject();
				}
				else{
					HX_STACK_LINE(113)
					if (((val == HX_CSTRING("[")))){
						HX_STACK_LINE(113)
						val = ::tjson::TJSON_obj::doArray();
					}
					else{
						HX_STACK_LINE(115)
						val = ::tjson::TJSON_obj::convertSymbolToProperType(val);
					}
				}
			}
		}
		HX_STACK_LINE(118)
		a->__Field(HX_CSTRING("push"),true)(val);
	}
	HX_STACK_LINE(120)
	hx::Throw (HX_CSTRING("Unexpected end of file. Expected ']'"));
	HX_STACK_LINE(120)
	return null();
}


STATIC_HX_DEFINE_DYNAMIC_FUNC0(TJSON_obj,doArray,return )

Dynamic TJSON_obj::convertSymbolToProperType( ::String symbol){
	HX_STACK_PUSH("TJSON::convertSymbolToProperType","tjson/TJSON.hx",123);
	HX_STACK_ARG(symbol,"symbol");
	HX_STACK_LINE(124)
	if ((::tjson::TJSON_obj::lastSymbolQuoted)){
		HX_STACK_LINE(124)
		return symbol;
	}
	HX_STACK_LINE(125)
	if ((::tjson::TJSON_obj::looksLikeFloat(symbol))){
		HX_STACK_LINE(125)
		return ::Std_obj::parseFloat(symbol);
	}
	HX_STACK_LINE(128)
	if ((::tjson::TJSON_obj::looksLikeInt(symbol))){
		HX_STACK_LINE(128)
		return ::Std_obj::parseInt(symbol);
	}
	HX_STACK_LINE(131)
	if (((symbol.toLowerCase() == HX_CSTRING("true")))){
		HX_STACK_LINE(131)
		return true;
	}
	HX_STACK_LINE(134)
	if (((symbol.toLowerCase() == HX_CSTRING("false")))){
		HX_STACK_LINE(134)
		return false;
	}
	HX_STACK_LINE(137)
	return symbol;
}


STATIC_HX_DEFINE_DYNAMIC_FUNC1(TJSON_obj,convertSymbolToProperType,return )

bool TJSON_obj::looksLikeFloat( ::String s){
	HX_STACK_PUSH("TJSON::looksLikeFloat","tjson/TJSON.hx",141);
	HX_STACK_ARG(s,"s");
	HX_STACK_LINE(142)
	if ((::tjson::TJSON_obj::floatRegex->match(s))){
		HX_STACK_LINE(142)
		return true;
	}
	HX_STACK_LINE(145)
	return false;
}


STATIC_HX_DEFINE_DYNAMIC_FUNC1(TJSON_obj,looksLikeFloat,return )

bool TJSON_obj::looksLikeInt( ::String s){
	HX_STACK_PUSH("TJSON::looksLikeInt","tjson/TJSON.hx",148);
	HX_STACK_ARG(s,"s");
	HX_STACK_LINE(150)
	if ((::tjson::TJSON_obj::intRegex->match(s))){
		HX_STACK_LINE(150)
		return true;
	}
	HX_STACK_LINE(153)
	return false;
}


STATIC_HX_DEFINE_DYNAMIC_FUNC1(TJSON_obj,looksLikeInt,return )

::String TJSON_obj::getNextSymbol( ){
	HX_STACK_PUSH("TJSON::getNextSymbol","tjson/TJSON.hx",156);
	HX_STACK_LINE(157)
	::tjson::TJSON_obj::lastSymbolQuoted = false;
	HX_STACK_LINE(158)
	::String c = HX_CSTRING("");		HX_STACK_VAR(c,"c");
	HX_STACK_LINE(159)
	bool inQuote = false;		HX_STACK_VAR(inQuote,"inQuote");
	HX_STACK_LINE(160)
	::String quoteType = HX_CSTRING("");		HX_STACK_VAR(quoteType,"quoteType");
	HX_STACK_LINE(161)
	::String symbol = HX_CSTRING("");		HX_STACK_VAR(symbol,"symbol");
	HX_STACK_LINE(162)
	bool inEscape = false;		HX_STACK_VAR(inEscape,"inEscape");
	HX_STACK_LINE(163)
	bool inSymbol = false;		HX_STACK_VAR(inSymbol,"inSymbol");
	HX_STACK_LINE(164)
	bool inLineComment = false;		HX_STACK_VAR(inLineComment,"inLineComment");
	HX_STACK_LINE(165)
	bool inBlockComment = false;		HX_STACK_VAR(inBlockComment,"inBlockComment");
	HX_STACK_LINE(167)
	while(((::tjson::TJSON_obj::pos < ::tjson::TJSON_obj::json.length))){
		HX_STACK_LINE(168)
		c = ::tjson::TJSON_obj::json.charAt((::tjson::TJSON_obj::pos)++);
		HX_STACK_LINE(169)
		if (((bool((c == HX_CSTRING("\n"))) && bool(!(inSymbol))))){
			HX_STACK_LINE(170)
			(::tjson::TJSON_obj::currentLine)++;
		}
		HX_STACK_LINE(171)
		if ((inLineComment)){
			HX_STACK_LINE(172)
			if (((bool((c == HX_CSTRING("\n"))) || bool((c == HX_CSTRING("\r")))))){
				HX_STACK_LINE(173)
				inLineComment = false;
				HX_STACK_LINE(174)
				(::tjson::TJSON_obj::pos)++;
			}
			HX_STACK_LINE(176)
			continue;
		}
		HX_STACK_LINE(179)
		if ((inBlockComment)){
			HX_STACK_LINE(180)
			if (((bool((c == HX_CSTRING("*"))) && bool((::tjson::TJSON_obj::json.charAt(::tjson::TJSON_obj::pos) == HX_CSTRING("/")))))){
				HX_STACK_LINE(181)
				inBlockComment = false;
				HX_STACK_LINE(182)
				(::tjson::TJSON_obj::pos)++;
			}
			HX_STACK_LINE(184)
			continue;
		}
		HX_STACK_LINE(187)
		if ((inQuote)){
			HX_STACK_LINE(187)
			if ((inEscape)){
				HX_STACK_LINE(189)
				inEscape = false;
				HX_STACK_LINE(190)
				if (((bool((c == HX_CSTRING("'"))) || bool((c == HX_CSTRING("\"")))))){
					HX_STACK_LINE(191)
					hx::AddEq(symbol,c);
					HX_STACK_LINE(192)
					continue;
				}
				HX_STACK_LINE(194)
				if (((c == HX_CSTRING("t")))){
					HX_STACK_LINE(195)
					hx::AddEq(symbol,HX_CSTRING("\t"));
					HX_STACK_LINE(196)
					continue;
				}
				HX_STACK_LINE(198)
				if (((c == HX_CSTRING("n")))){
					HX_STACK_LINE(199)
					hx::AddEq(symbol,HX_CSTRING("\n"));
					HX_STACK_LINE(200)
					continue;
				}
				HX_STACK_LINE(202)
				if (((c == HX_CSTRING("\\")))){
					HX_STACK_LINE(203)
					hx::AddEq(symbol,HX_CSTRING("\\"));
					HX_STACK_LINE(204)
					continue;
				}
				HX_STACK_LINE(206)
				if (((c == HX_CSTRING("r")))){
					HX_STACK_LINE(207)
					hx::AddEq(symbol,HX_CSTRING("\r"));
					HX_STACK_LINE(208)
					continue;
				}
				HX_STACK_LINE(211)
				hx::Throw (((HX_CSTRING("Invalid escape sequence '\\") + c) + HX_CSTRING("'")));
			}
			else{
				HX_STACK_LINE(213)
				if (((c == HX_CSTRING("\\")))){
					HX_STACK_LINE(214)
					inEscape = true;
					HX_STACK_LINE(215)
					continue;
				}
				HX_STACK_LINE(217)
				if (((c == quoteType))){
					HX_STACK_LINE(217)
					return symbol;
				}
				HX_STACK_LINE(220)
				hx::AddEq(symbol,c);
				HX_STACK_LINE(221)
				continue;
			}
		}
		else{
			HX_STACK_LINE(227)
			if (((c == HX_CSTRING("/")))){
				HX_STACK_LINE(228)
				::String c2 = ::tjson::TJSON_obj::json.charAt(::tjson::TJSON_obj::pos);		HX_STACK_VAR(c2,"c2");
				HX_STACK_LINE(231)
				if (((c2 == HX_CSTRING("/")))){
					HX_STACK_LINE(232)
					inLineComment = true;
					HX_STACK_LINE(233)
					(::tjson::TJSON_obj::pos)++;
					HX_STACK_LINE(234)
					continue;
				}
				else{
					HX_STACK_LINE(238)
					if (((c2 == HX_CSTRING("*")))){
						HX_STACK_LINE(239)
						inBlockComment = true;
						HX_STACK_LINE(240)
						(::tjson::TJSON_obj::pos)++;
						HX_STACK_LINE(241)
						continue;
					}
				}
			}
		}
		HX_STACK_LINE(247)
		if ((inSymbol)){
			HX_STACK_LINE(247)
			if (((bool((bool((bool((bool((bool((bool((bool((c == HX_CSTRING(" "))) || bool((c == HX_CSTRING("\n"))))) || bool((c == HX_CSTRING("\r"))))) || bool((c == HX_CSTRING("\t"))))) || bool((c == HX_CSTRING(","))))) || bool((c == HX_CSTRING(":"))))) || bool((c == HX_CSTRING("}"))))) || bool((c == HX_CSTRING("]")))))){
				HX_STACK_LINE(249)
				(::tjson::TJSON_obj::pos)--;
				HX_STACK_LINE(250)
				return symbol;
			}
			else{
				HX_STACK_LINE(252)
				hx::AddEq(symbol,c);
				HX_STACK_LINE(253)
				continue;
			}
		}
		else{
			HX_STACK_LINE(258)
			if (((bool((bool((bool((c == HX_CSTRING(" "))) || bool((c == HX_CSTRING("\t"))))) || bool((c == HX_CSTRING("\n"))))) || bool((c == HX_CSTRING("\r")))))){
				HX_STACK_LINE(258)
				continue;
			}
			HX_STACK_LINE(262)
			if (((bool((bool((bool((bool((bool((c == HX_CSTRING("{"))) || bool((c == HX_CSTRING("}"))))) || bool((c == HX_CSTRING("["))))) || bool((c == HX_CSTRING("]"))))) || bool((c == HX_CSTRING(","))))) || bool((c == HX_CSTRING(":")))))){
				HX_STACK_LINE(262)
				return c;
			}
			HX_STACK_LINE(268)
			if (((bool((c == HX_CSTRING("'"))) || bool((c == HX_CSTRING("\"")))))){
				HX_STACK_LINE(269)
				inQuote = true;
				HX_STACK_LINE(270)
				quoteType = c;
				HX_STACK_LINE(271)
				::tjson::TJSON_obj::lastSymbolQuoted = true;
				HX_STACK_LINE(272)
				continue;
			}
			else{
				HX_STACK_LINE(274)
				inSymbol = true;
				HX_STACK_LINE(275)
				symbol = c;
				HX_STACK_LINE(276)
				continue;
			}
		}
	}
	HX_STACK_LINE(282)
	if ((inQuote)){
		HX_STACK_LINE(282)
		hx::Throw (((HX_CSTRING("Unexpected end of data. Expected ( ") + quoteType) + HX_CSTRING(" )")));
	}
	HX_STACK_LINE(285)
	return symbol;
}


STATIC_HX_DEFINE_DYNAMIC_FUNC0(TJSON_obj,getNextSymbol,return )

::String TJSON_obj::encodeAnonymousObject( Dynamic obj,::tjson::EncodeStyle style,int depth){
	HX_STACK_PUSH("TJSON::encodeAnonymousObject","tjson/TJSON.hx",288);
	HX_STACK_ARG(obj,"obj");
	HX_STACK_ARG(style,"style");
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(289)
	::String buffer = style->beginObject(depth);		HX_STACK_VAR(buffer,"buffer");
	HX_STACK_LINE(290)
	int fieldCount = (int)0;		HX_STACK_VAR(fieldCount,"fieldCount");
	HX_STACK_LINE(291)
	{
		HX_STACK_LINE(291)
		int _g = (int)0;		HX_STACK_VAR(_g,"_g");
		Array< ::String > _g1 = ::Reflect_obj::fields(obj);		HX_STACK_VAR(_g1,"_g1");
		HX_STACK_LINE(291)
		while(((_g < _g1->length))){
			HX_STACK_LINE(291)
			::String field = _g1->__get(_g);		HX_STACK_VAR(field,"field");
			HX_STACK_LINE(291)
			++(_g);
			HX_STACK_LINE(292)
			if ((((fieldCount)++ > (int)0))){
				HX_STACK_LINE(292)
				hx::AddEq(buffer,style->entrySeperator(depth));
			}
			else{
				HX_STACK_LINE(293)
				hx::AddEq(buffer,style->firstEntry(depth));
			}
			HX_STACK_LINE(294)
			Dynamic value = ::Reflect_obj::field(obj,field);		HX_STACK_VAR(value,"value");
			HX_STACK_LINE(295)
			hx::AddEq(buffer,(((HX_CSTRING("\"") + field) + HX_CSTRING("\"")) + style->keyValueSeperator(depth)));
			HX_STACK_LINE(296)
			hx::AddEq(buffer,::tjson::TJSON_obj::encodeValue(value,style,depth));
		}
	}
	HX_STACK_LINE(298)
	hx::AddEq(buffer,style->endObject(depth));
	HX_STACK_LINE(299)
	return buffer;
}


STATIC_HX_DEFINE_DYNAMIC_FUNC3(TJSON_obj,encodeAnonymousObject,return )

::String TJSON_obj::encodeArray( Dynamic obj,::tjson::EncodeStyle style,int depth){
	HX_STACK_PUSH("TJSON::encodeArray","tjson/TJSON.hx",302);
	HX_STACK_ARG(obj,"obj");
	HX_STACK_ARG(style,"style");
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(303)
	::String buffer = style->beginArray(depth);		HX_STACK_VAR(buffer,"buffer");
	HX_STACK_LINE(304)
	int fieldCount = (int)0;		HX_STACK_VAR(fieldCount,"fieldCount");
	HX_STACK_LINE(305)
	{
		HX_STACK_LINE(305)
		int _g = (int)0;		HX_STACK_VAR(_g,"_g");
		Dynamic _g1 = hx::TCastToArray(obj);		HX_STACK_VAR(_g1,"_g1");
		HX_STACK_LINE(305)
		while(((_g < _g1->__Field(HX_CSTRING("length"),true)))){
			HX_STACK_LINE(305)
			Dynamic value = _g1->__GetItem(_g);		HX_STACK_VAR(value,"value");
			HX_STACK_LINE(305)
			++(_g);
			HX_STACK_LINE(306)
			if ((((fieldCount)++ > (int)0))){
				HX_STACK_LINE(306)
				hx::AddEq(buffer,style->entrySeperator(depth));
			}
			else{
				HX_STACK_LINE(307)
				hx::AddEq(buffer,style->firstEntry(depth));
			}
			HX_STACK_LINE(308)
			hx::AddEq(buffer,::tjson::TJSON_obj::encodeValue(value,style,depth));
		}
	}
	HX_STACK_LINE(311)
	hx::AddEq(buffer,style->endArray(depth));
	HX_STACK_LINE(312)
	return buffer;
}


STATIC_HX_DEFINE_DYNAMIC_FUNC3(TJSON_obj,encodeArray,return )

::String TJSON_obj::encodeValue( Dynamic value,::tjson::EncodeStyle style,int depth){
	HX_STACK_PUSH("TJSON::encodeValue","tjson/TJSON.hx",315);
	HX_STACK_ARG(value,"value");
	HX_STACK_ARG(style,"style");
	HX_STACK_ARG(depth,"depth");
	HX_STACK_LINE(316)
	::String buffer = HX_CSTRING("");		HX_STACK_VAR(buffer,"buffer");
	HX_STACK_LINE(317)
	if (((bool(::Std_obj::is(value,hx::ClassOf< ::Int >())) || bool(::Std_obj::is(value,hx::ClassOf< ::Float >()))))){
		HX_STACK_LINE(317)
		hx::AddEq(buffer,::Std_obj::string(value));
	}
	else{
		HX_STACK_LINE(320)
		if ((::Std_obj::is(value,hx::ClassOf< Array<int> >()))){
			HX_STACK_LINE(320)
			hx::AddEq(buffer,::tjson::TJSON_obj::encodeArray(value,style,(depth + (int)1)));
		}
		else{
			HX_STACK_LINE(323)
			if ((::Std_obj::is(value,hx::ClassOf< ::String >()))){
				HX_STACK_LINE(323)
				hx::AddEq(buffer,((HX_CSTRING("\"") + ::StringTools_obj::replace(::StringTools_obj::replace(::StringTools_obj::replace(::StringTools_obj::replace(::Std_obj::string(value),HX_CSTRING("\\"),HX_CSTRING("\\\\")),HX_CSTRING("\n"),HX_CSTRING("\\n")),HX_CSTRING("\r"),HX_CSTRING("\\r")),HX_CSTRING("\""),HX_CSTRING("\\\""))) + HX_CSTRING("\"")));
			}
			else{
				HX_STACK_LINE(326)
				if ((::Reflect_obj::isObject(value))){
					HX_STACK_LINE(326)
					hx::AddEq(buffer,::tjson::TJSON_obj::encodeAnonymousObject(value,style,(depth + (int)1)));
				}
				else{
					HX_STACK_LINE(329)
					hx::Throw ((HX_CSTRING("Unsupported field type: ") + ::Std_obj::string(value)));
				}
			}
		}
	}
	HX_STACK_LINE(332)
	return buffer;
}


STATIC_HX_DEFINE_DYNAMIC_FUNC3(TJSON_obj,encodeValue,return )


TJSON_obj::TJSON_obj()
{
}

void TJSON_obj::__Mark(HX_MARK_PARAMS)
{
	HX_MARK_BEGIN_CLASS(TJSON);
	HX_MARK_END_CLASS();
}

void TJSON_obj::__Visit(HX_VISIT_PARAMS)
{
}

Dynamic TJSON_obj::__Field(const ::String &inName,bool inCallProp)
{
	switch(inName.length) {
	case 3:
		if (HX_FIELD_EQ(inName,"pos") ) { return pos; }
		break;
	case 4:
		if (HX_FIELD_EQ(inName,"json") ) { return json; }
		break;
	case 5:
		if (HX_FIELD_EQ(inName,"parse") ) { return parse_dyn(); }
		break;
	case 6:
		if (HX_FIELD_EQ(inName,"encode") ) { return encode_dyn(); }
		break;
	case 7:
		if (HX_FIELD_EQ(inName,"doParse") ) { return doParse_dyn(); }
		if (HX_FIELD_EQ(inName,"doArray") ) { return doArray_dyn(); }
		break;
	case 8:
		if (HX_FIELD_EQ(inName,"fileName") ) { return fileName; }
		if (HX_FIELD_EQ(inName,"intRegex") ) { return intRegex; }
		if (HX_FIELD_EQ(inName,"doObject") ) { return doObject_dyn(); }
		break;
	case 10:
		if (HX_FIELD_EQ(inName,"floatRegex") ) { return floatRegex; }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"currentLine") ) { return currentLine; }
		if (HX_FIELD_EQ(inName,"encodeArray") ) { return encodeArray_dyn(); }
		if (HX_FIELD_EQ(inName,"encodeValue") ) { return encodeValue_dyn(); }
		break;
	case 12:
		if (HX_FIELD_EQ(inName,"looksLikeInt") ) { return looksLikeInt_dyn(); }
		break;
	case 13:
		if (HX_FIELD_EQ(inName,"getNextSymbol") ) { return getNextSymbol_dyn(); }
		break;
	case 14:
		if (HX_FIELD_EQ(inName,"looksLikeFloat") ) { return looksLikeFloat_dyn(); }
		break;
	case 16:
		if (HX_FIELD_EQ(inName,"lastSymbolQuoted") ) { return lastSymbolQuoted; }
		break;
	case 21:
		if (HX_FIELD_EQ(inName,"encodeAnonymousObject") ) { return encodeAnonymousObject_dyn(); }
		break;
	case 25:
		if (HX_FIELD_EQ(inName,"convertSymbolToProperType") ) { return convertSymbolToProperType_dyn(); }
	}
	return super::__Field(inName,inCallProp);
}

Dynamic TJSON_obj::__SetField(const ::String &inName,const Dynamic &inValue,bool inCallProp)
{
	switch(inName.length) {
	case 3:
		if (HX_FIELD_EQ(inName,"pos") ) { pos=inValue.Cast< int >(); return inValue; }
		break;
	case 4:
		if (HX_FIELD_EQ(inName,"json") ) { json=inValue.Cast< ::String >(); return inValue; }
		break;
	case 8:
		if (HX_FIELD_EQ(inName,"fileName") ) { fileName=inValue.Cast< ::String >(); return inValue; }
		if (HX_FIELD_EQ(inName,"intRegex") ) { intRegex=inValue.Cast< ::EReg >(); return inValue; }
		break;
	case 10:
		if (HX_FIELD_EQ(inName,"floatRegex") ) { floatRegex=inValue.Cast< ::EReg >(); return inValue; }
		break;
	case 11:
		if (HX_FIELD_EQ(inName,"currentLine") ) { currentLine=inValue.Cast< int >(); return inValue; }
		break;
	case 16:
		if (HX_FIELD_EQ(inName,"lastSymbolQuoted") ) { lastSymbolQuoted=inValue.Cast< bool >(); return inValue; }
	}
	return super::__SetField(inName,inValue,inCallProp);
}

void TJSON_obj::__GetFields(Array< ::String> &outFields)
{
	super::__GetFields(outFields);
};

static ::String sStaticFields[] = {
	HX_CSTRING("pos"),
	HX_CSTRING("json"),
	HX_CSTRING("lastSymbolQuoted"),
	HX_CSTRING("fileName"),
	HX_CSTRING("currentLine"),
	HX_CSTRING("floatRegex"),
	HX_CSTRING("intRegex"),
	HX_CSTRING("parse"),
	HX_CSTRING("encode"),
	HX_CSTRING("doParse"),
	HX_CSTRING("doObject"),
	HX_CSTRING("doArray"),
	HX_CSTRING("convertSymbolToProperType"),
	HX_CSTRING("looksLikeFloat"),
	HX_CSTRING("looksLikeInt"),
	HX_CSTRING("getNextSymbol"),
	HX_CSTRING("encodeAnonymousObject"),
	HX_CSTRING("encodeArray"),
	HX_CSTRING("encodeValue"),
	String(null()) };

static ::String sMemberFields[] = {
	String(null()) };

static void sMarkStatics(HX_MARK_PARAMS) {
	HX_MARK_MEMBER_NAME(TJSON_obj::__mClass,"__mClass");
	HX_MARK_MEMBER_NAME(TJSON_obj::pos,"pos");
	HX_MARK_MEMBER_NAME(TJSON_obj::json,"json");
	HX_MARK_MEMBER_NAME(TJSON_obj::lastSymbolQuoted,"lastSymbolQuoted");
	HX_MARK_MEMBER_NAME(TJSON_obj::fileName,"fileName");
	HX_MARK_MEMBER_NAME(TJSON_obj::currentLine,"currentLine");
	HX_MARK_MEMBER_NAME(TJSON_obj::floatRegex,"floatRegex");
	HX_MARK_MEMBER_NAME(TJSON_obj::intRegex,"intRegex");
};

static void sVisitStatics(HX_VISIT_PARAMS) {
	HX_VISIT_MEMBER_NAME(TJSON_obj::__mClass,"__mClass");
	HX_VISIT_MEMBER_NAME(TJSON_obj::pos,"pos");
	HX_VISIT_MEMBER_NAME(TJSON_obj::json,"json");
	HX_VISIT_MEMBER_NAME(TJSON_obj::lastSymbolQuoted,"lastSymbolQuoted");
	HX_VISIT_MEMBER_NAME(TJSON_obj::fileName,"fileName");
	HX_VISIT_MEMBER_NAME(TJSON_obj::currentLine,"currentLine");
	HX_VISIT_MEMBER_NAME(TJSON_obj::floatRegex,"floatRegex");
	HX_VISIT_MEMBER_NAME(TJSON_obj::intRegex,"intRegex");
};

Class TJSON_obj::__mClass;

void TJSON_obj::__register()
{
	hx::Static(__mClass) = hx::RegisterClass(HX_CSTRING("tjson.TJSON"), hx::TCanCast< TJSON_obj> ,sStaticFields,sMemberFields,
	&__CreateEmpty, &__Create,
	&super::__SGetClass(), 0, sMarkStatics, sVisitStatics);
}

void TJSON_obj::__boot()
{
}

} // end namespace tjson
