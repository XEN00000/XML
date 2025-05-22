<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="xml" indent="yes" encoding="UTF-8"/>

    <xsl:template match="/">
        <!-- Znajdź maksymalną wartość rynkową -->
        <xsl:variable name="maxMarketValue" select="max(FootballPlayers/Players/Player/translate(MarketValue, '€m', ''))"/>
        <!-- Ustal skalę wykresu (maksymalna wysokość słupka to 150 pikseli) -->
        <xsl:variable name="scaleFactor" select="150 div $maxMarketValue"/>

        <!-- Dynamiczna szerokość SVG na podstawie liczby zawodników -->
        <xsl:variable name="playerCount" select="count(FootballPlayers/Players/Player)"/>
        <xsl:variable name="barWidth" select="50"/>
        <xsl:variable name="barSpacing" select="40"/>
        <xsl:variable name="svgWidth" select="$playerCount * ($barWidth + $barSpacing) + 100"/>

        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 0 {$svgWidth} 600" width="{$svgWidth}" height="600">
            <!-- Dodanie JavaScript -->
            <script type="text/ecmascript">
                <![CDATA[
                function onHover(rect) {
                    rect.setAttribute("fill", "orange");
                }
                function onLeave(rect) {
                    rect.setAttribute("fill", "steelblue");
                }
                ]]>
            </script>

            <!-- Tytuł wykresu -->
            <text x="{$svgWidth div 2}" y="30" text-anchor="middle" font-size="20" font-family="Arial" fill="black">
                Wartość rynkowa zawodników (€)
            </text>

            <!-- Oś X -->
            <line x1="70" y1="500" x2="{$svgWidth - 30}" y2="500" stroke="black" stroke-width="2">
                <animate attributeName="stroke-width" from="2" to="4" dur="1s" repeatCount="indefinite" />
            </line>
            <!-- Oś Y -->
            <line x1="70" y1="500" x2="70" y2="100" stroke="black" stroke-width="2">
                <animate attributeName="stroke-width" from="2" to="4" dur="1s" repeatCount="indefinite" />
            </line>

            <!-- Tytuły osi -->
            <text x="{$svgWidth div 2}" y="550" text-anchor="middle" font-size="14" font-family="Arial" fill="black">
                Zawodnicy
            </text>
            <text x="30" y="300" text-anchor="middle" font-size="14" font-family="Arial" fill="black" transform="rotate(-90, 30, 300)">
                Wartość rynkowa (€)
            </text>

            <!-- Dane -->
            <xsl:for-each select="FootballPlayers/Players/Player">
                <xsl:variable name="index" select="position() - 1"/>
                <!-- Wyciągamy liczbę z wartości rynkowej i skalujemy wysokość -->
                <xsl:variable name="marketValue" select="translate(MarketValue, '€m', '') * $scaleFactor"/>
                <!-- Pozycja X słupka -->
                <xsl:variable name="xPos" select="$index * ($barWidth + $barSpacing) + 80"/>
                <!-- Wysokość słupka -->
                <xsl:variable name="barHeight" select="$marketValue"/>

                <!-- Słupki -->
                <rect x="{$xPos}" y="{500 - $barHeight}" width="{$barWidth}" height="{$barHeight}" fill="steelblue"
                      onmouseover="onHover(this)" onmouseout="onLeave(this)">
                    <animate attributeName="height" from="0" to="{$barHeight}" dur="1s" fill="freeze" />
                </rect>

                <!-- Wartości rynkowe nad słupkami -->
                <text x="{$xPos + $barWidth div 2}" y="{490 - $barHeight}" text-anchor="middle" font-size="10" font-family="Arial" fill="black">
                    <xsl:value-of select="MarketValue"/>
                </text>

                <!-- Poziome nazwiska zawodników -->
                <text x="{$xPos + $barWidth div 2}" y="515" text-anchor="middle" font-size="10" font-family="Arial" fill="black">
                    <xsl:value-of select="PlayerName"/>
                    <animate attributeName="fill" from="black" to="red" dur="1s" repeatCount="indefinite" />
                </text>
            </xsl:for-each>
        </svg>
    </xsl:template>
</xsl:stylesheet>
