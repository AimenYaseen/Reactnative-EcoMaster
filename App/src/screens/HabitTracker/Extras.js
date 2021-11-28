<View
  style={{
    borderColor: "red",
    // borderWidth: 1,
    height: screenHeight * 0.259,
    width: screenWidth * 0.56,
    marginTop: -100,
    //padding: 3,
    // marginRight: 80,
  }}
>
  <Svg
    //style={{ borderWidth: 2 }}
    height={200}
    width={200}
    //  viewBox="0 0 10 10"
    // xmlns="http://www.w3.org/2000/svg"
  >
    {/* <Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M0 20 H200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M0 40 H200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M0 60 H200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M0 80 H200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M0 100 H200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M0 120 H200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M0 140 H200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M0 160 H200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M0 180 H200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M0 200 H200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M20 0 V200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M40 0 V200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M60 0 V200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M80 0 V200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M100 0 V200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M120 0 V200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M140 0 V200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M160 0 V200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M180 0 V200"
/>
<Path
  stroke="black"
  fill="transparent"
  strokeWidth="1"
  d="M200 0 V200"
/> */}
    <Defs>
      <Marker
        id="m1"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="9"
        markerHeight="9"
      >
        <G>
          <Circle cx="5" cy="5" r="5" strokeWidth={0.5} stroke={colors.gray} />
          <Circle cx="5" cy="5" r="4.3" fill={colors.gray} />
        </G>
      </Marker>
      {/* </View> */}
    </Defs>
    <Path
      d="M 120 30 Q 240 160 80 200"
      stroke={colors.secondary}
      fill="transparent"
      strokeWidth="6"
      strokeDasharray="15"
      markerStart="url(#m1)"
    />
    <Text
      stroke="none"
      fill={colors.secondary}
      fontSize="20"
      fontWeight="bold"
      x="60"
      y="50"
      textAnchor="middle"
      textAlign="center"
    >
      Hello
    </Text>
  </Svg>
</View>;

<View>
  <Defs>
    <Marker
      id="m1"
      viewBox="0 0 10 10"
      refX="5"
      refY="5"
      markerWidth="9"
      markerHeight="9"
    >
      <G>
        <Circle cx="5" cy="5" r="2.7" strokeWidth={0.3} stroke={colors.gray} />
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
</View>;
