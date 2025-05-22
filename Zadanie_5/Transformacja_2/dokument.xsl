<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
    <xsl:output method="xml" encoding="UTF-8" indent="yes" doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"/>
    <xsl:template match="/">
        <html>
            <head>
                <title>Piłkarze Premier League</title>
                <link rel="stylesheet" href="style.css" type="text/css"/>
            </head>
            <body>
                <h1>Lista Piłkarzy Premier League</h1>
                <table>
                    <tr>
                        <th>Nazwa</th>
                        <th>Pozycja</th>
                        <th>Kraj pochodzenia</th>
                        <th>Wiek</th>
                        <th>Goal/Assist</th>
                        <th>Wartość Rynkowa</th>
                    </tr>
                    <xsl:for-each select="FootballPlayers/Players/Player">
                        <tr>
                            <td><xsl:value-of select="PlayerName"/></td>
                            <td><xsl:value-of select="Position"/></td>
                            <td><xsl:value-of select="Nationality"/></td>
                            <td><xsl:value-of select="Age"/></td>
                            <td><xsl:value-of select="GA"/></td>
                            <td><xsl:value-of select="MarketValue"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>