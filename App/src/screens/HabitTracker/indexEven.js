{
  /* Header component */
}
{
  /* LEFT CURVE  INDEX EVEN*/
}
<View
  style={{
    borderColor: "red",
    borderWidth: 1,
    height: screenHeight * 0.259,
    // width: screenWidth * 0.56,
    width: 300,
    marginTop: -30,
    //padding: 3,
    // marginRight: 80,
  }}
>
  <Svg
    style={{ borderWidth: 2 }}
    height={200}
    width={300}
    //  viewBox="0 0 10 10"
    // xmlns="http://www.w3.org/2000/svg"
  >
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M0 20 H300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M0 40 H300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M0 60 H300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M0 80 H300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M0 100 H300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M0 120 H300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M0 140 H300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M0 160 H300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M0 180 H300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M0 200 H300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M30 0 V300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M60 0 V300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M90 0 V300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M120 0 V300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M150 0 V300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M180 0 V300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M210 0 V300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M240 0 V300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M270 0 V300" />
    <Path stroke="black" fill="transparent" strokeWidth="1" d="M300 0 V300" />
    <Defs>
      {/* <View style={styles.outerCircle}> */}
      <Marker
        id="m1"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="9"
        markerHeight="9"
      >
        <G>
          <Circle
            cx="5"
            cy="5"
            r="2.7"
            strokeWidth={0.3}
            stroke={colors.gray}
          />
          <Circle cx="5" cy="5" r="2.3" fill={colors.gray} />
        </G>
      </Marker>
      {/* </View> */}
    </Defs>
    <Path
      d="M 100 30 Q -60 140 130 200"
      stroke={colors.secondary}
      fill="transparent"
      strokeWidth="10"
      strokeDasharray="15"
      markerStart="url(#m1)"
    />
    <Text
      stroke="none"
      fill={colors.secondary}
      fontSize="20"
      fontWeight="bold"
      x="140"
      y="50"
      textAnchor="middle"
      textAlign="center"
    >
      Hello
    </Text>
  </Svg>
</View>;
