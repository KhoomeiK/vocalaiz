from html.entities import codepoint2name
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup

links = open("links.txt", "r")
for link in links:
	uClient = uReq(link) # opens stream and grabs webpage
	page_html = uClient.read() # stores into variable
	uClient.close() # closes stream

	page = soup(page_html, "html.parser") # parses HTML file
	# for i in books
	# load book page
	# download mp3 of all sections read by current link-reader