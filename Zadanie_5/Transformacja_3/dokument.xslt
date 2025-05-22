<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="text" encoding="UTF-8"/>

    <xsl:template match="/">
        <!-- Nagłówek tabeli -->
        <xsl:text>+---------------------------+----------------------+-------+-------------------+&#10;</xsl:text>
        <xsl:text>| Nazwisko                  | Pozycja              | Wiek  | Wartość rynkowa   |&#10;</xsl:text>
        <xsl:text>+---------------------------+----------------------+-------+-------------------+&#10;</xsl:text>

        <!-- Dane zawodników -->
        <xsl:for-each select="FootballPlayers/Players/Player">
            <xsl:text>| </xsl:text>
            <xsl:value-of select="substring(concat(PlayerName, '                            '), 1, 25)" />
            <xsl:text> | </xsl:text>
            <xsl:value-of select="substring(concat(Position, '                            '), 1, 20)" />
            <xsl:text> | </xsl:text>
            <xsl:value-of select="substring(concat(Age, '     '), 1, 5)" />
            <xsl:text> | </xsl:text>
            <xsl:value-of select="substring(concat(MarketValue, '                     '), 1, 17)" />
            <xsl:text> |&#10;</xsl:text>
        </xsl:for-each>
        
        <xsl:text>+---------------------------+----------------------+-------+-------------------+&#10;&#10;</xsl:text>

        <!-- Trenerzy -->
        <xsl:text>+---------------------------+---------------------------+-------------------+&#10;</xsl:text>
        <xsl:text>| Nazwisko                  | Klub                      | Doświadczenie     |&#10;</xsl:text>
        <xsl:text>+---------------------------+---------------------------+-------------------+&#10;</xsl:text>
        <xsl:for-each select="FootballPlayers/Coaches/Coach">
            <xsl:text>| </xsl:text>
            <xsl:value-of select="substring(concat(CoachName, '                          '), 1, 25)" />
            <xsl:text> | </xsl:text>
            <xsl:value-of select="substring(concat(/FootballPlayers/Clubs/Club[@id=current()/ClubRef]/ClubName, '                          '), 1, 25)" />
            <xsl:text> | </xsl:text>
            <xsl:value-of select="concat(ExperienceYears, ' lat')" />
            <xsl:if test="string-length(ExperienceYears) = 1">
                <xsl:text>         </xsl:text>
            </xsl:if>
            <xsl:if test="string-length(ExperienceYears) = 2">
                <xsl:text>        </xsl:text>
            </xsl:if>
            <xsl:text>    |&#10;</xsl:text>
        </xsl:for-each>
        <xsl:text>+---------------------------+---------------------------+-------------------+</xsl:text>
    </xsl:template>
</xsl:stylesheet>
