# coding=utf-8
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

from django.conf import settings
from django.template import Template, Context
import django.template.base
from compressor.filters import CompilerFilter

BABEL_BUILDER = ("browserify %s {infile} -o {outfile} "
                 "-x=react -x=jquery -x=react-dom -x=backbone -x=flux "
                 "-t [ babelify --presets [react es2015 ] "
                 "--plugins [ transform-class-properties transform-decorators ] ]")

BABEL_BUILDER %= "-d" if settings.DEBUG else ""


########################################################################
class BabelFilter(CompilerFilter):
    command = BABEL_BUILDER

    ####################################################################
    def input(self, **kwargs):
        content = super(BabelFilter, self).input(**kwargs)
        builtins = django.template.base.builtins[:]
        django.template.base.add_to_builtins('django.templatetags.static')
        template = Template(content)
        context = Context(settings.COMPRESS_TEMPLATE_FILTER_CONTEXT)
        rendered = template.render(context)
        django.template.base.builtins = builtins
        return rendered
