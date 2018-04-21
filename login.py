# -*- coding: utf-8 -*-
from scrapy.http import FormRequest
from scrapy.http.request import Request
from scrapy.selector import HtmlXPathSelector
from scrapy.selector import Selector
from scrapy.spiders import CrawlSpider
from scrapy.utils.response import open_in_browser

class FandromedaCSpider(CrawlSpider):
    name = 'fandromeda_c'
    allowed_domains = ['fandromeda.com']

    def start_requests(self):

        form_data = {"username":"mani619cash@gmail.com","password":"mani619cash@gmail.com"}
        yield FormRequest('https://fandromeda.com/user/logreg/login', callback=self.parse_login_response, formdata=form_data)

    def parse_login_response(self,response):
        open_in_browser(response)