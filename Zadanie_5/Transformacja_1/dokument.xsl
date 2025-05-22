<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="xml" indent="yes"/>

    <!-- Główna transformacja -->
    <xsl:template match="/">
        <Report>
            <Header>
                <Title>Raport - Podsumowanie danych piłkarzy i klubów</Title>
                <DateGenerated>
                    <xsl:value-of select="current-date()"/>
                </DateGenerated>
            </Header>
            <Details>
                <xsl:apply-templates select="FootballPlayers/Clubs/Club"/>
            </Details>
        </Report>
    </xsl:template>

    <!-- Przetwarzanie klubów -->
    <xsl:template match="Club">
        <Club>
            <Name>
                <xsl:value-of select="ClubName"/>
            </Name>
            <City>
                <xsl:value-of select="City"/>
            </City>
            <Summary>
                <TotalPlayers>
                    <xsl:value-of select="count(//Player[PlayerClubRef/@ref=current()/@id])"/>
                </TotalPlayers>
                <TotalPlayerValue>
                    <xsl:variable name="values" select="//Player[PlayerClubRef/@ref=current()/@id]/MarketValue"/>
                    <xsl:value-of select="sum(for $v in $values return translate($v, '€m', '') * 1)"/>
                </TotalPlayerValue>
                <AveragePlayerAge>
                    <xsl:variable name="totalAge" select="sum(//Player[PlayerClubRef/@ref=current()/@id]/Age)"/>
                    <xsl:variable name="playerCount" select="count(//Player[PlayerClubRef/@ref=current()/@id])"/>
                    <xsl:choose>
                        <xsl:when test="$playerCount > 0">
                            <xsl:value-of select="round($totalAge div $playerCount)"/>
                        </xsl:when>
                        <xsl:otherwise>0</xsl:otherwise>
                    </xsl:choose>
                </AveragePlayerAge>
                <HighestGA>
                    <xsl:for-each select="//Player[PlayerClubRef/@ref=current()/@id]">
                        <xsl:sort select="GA" data-type="number" order="descending"/>
                        <xsl:if test="position()=1">
                            <xsl:value-of select="GA"/>
                        </xsl:if>
                    </xsl:for-each>
                </HighestGA>
            </Summary>
            <Players>
                <xsl:for-each select="//Player[PlayerClubRef/@ref=current()/@id]">
                    <Player>
                        <Name>
                            <xsl:value-of select="PlayerName"/>
                        </Name>
                        <Nationality>
                            <xsl:value-of select="Nationality/*"/>
                        </Nationality>
                        <Age>
                            <xsl:value-of select="Age"/>
                        </Age>
                        <MarketValue>
                            <xsl:value-of select="MarketValue"/>
                        </MarketValue>
                    </Player>
                </xsl:for-each>
            </Players>
            <Coach>
                <xsl:for-each select="//Coach[ClubRef=current()/@id]">
                    <Name>
                        <xsl:value-of select="CoachName"/>
                    </Name>
                    <ExperienceYears>
                        <xsl:value-of select="ExperienceYears"/>
                    </ExperienceYears>
                </xsl:for-each>
            </Coach>
        </Club>
    </xsl:template>
</xsl:stylesheet>
