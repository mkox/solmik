Solmik - solmization tool
=========================

Introduction
------------
A test presentation of this you find in **http://solmiktest1.michaelkox.de**.
It is best tested with Firefox, it does not work with Internet Explorer.
It is not ready to use for a general public, but already has a lot of functionality. 

Some of the tools used for it:
- Zend Framework 2: http://framework.zend.com/
- Doctrine, Object Relational Mapper (ORM): http://www.doctrine-project.org/projects/orm.html
- require.js: http://requirejs.org/

My own code you find mainly in the following folders:
- module/Solmik
- public/module/solmik

Installation
------------

Insert in a linux shell:

    git clone https://github.com/mkox/solmik.git
    cd solmik
    php composer.phar self-update
    php composer.phar install

    cd config/autoload

In this folder create a file local.php with this content:

    <?php
    /**
     * Local Configuration Override
     *
     * This configuration override file is for overriding environment-specific and
     * security-sensitive configuration information. 
     *
     * @NOTE: This file is ignored from Git by default with the .gitignore included
     * in ZendSkeletonApplication. This is a good practice, as it prevents sensitive
     * credentials from accidentally being committed into version control.
     */
    return array(
        'doctrine' => array(
            'connection' => array(
                'orm_default' => array(
                    'driverClass' => 'Doctrine\DBAL\Driver\PDOMySql\Driver',
                    'params' => array(
                        'host'     => 'YOUR-HOST', // e.g. "localhost"
                        'port'     => '3306',
                        'user'     => 'YOUR USER',
                        'password' => 'YOUR PASSWORD',
                        'dbname'   => 'YOUR DATABASE NAME',
                    )
                )
            )
        ),
    );

After this file creation the next task:

    cd -
    // or:   cd ../../
    vendor/bin/doctrine-module orm:validate-schema

You might need to put something like "php " or "php5xy " before "vendor/...".
When so far everything is ok, the following should be shown in the shell:

    [Mapping]  OK - The mapping files are correct.
    [Database] FAIL - The database schema is not in sync with the current mapping file.

Now create database tables:

    vendor/bin/doctrine-module orm:schema-tool:create

A success message should look like the following:

    ATTENTION: This operation should not be executed in a production environment.
    Creating database schema...
    Database schema created successfully!

Now you can insert data into the database tables from the file solmik_insert_data.sql.
In addition in the table User you should insert a name and a password.

Maybe you also have to adapt the file `public/.htaccess`, especially on a provider for shared content:
If you have an error 500 (Internal Server Error), it might help, if you uncomment the last three lines and add
a new one:

    # RewriteCond %{REQUEST_URI}::$1 ^(/.+)(.+)::\2$
    # RewriteRule ^(.*) - [E=BASE:%1]
    # RewriteRule ^(.*)$ %{ENV:BASE}index.php [NC,L]
    RewriteRule ^(.*)$ /index.php [L]

Usage
-----

It is about relative solmization (http://youcantrustyourears.com/wp/solfege-solfeggio-or-solmization/). Connected with
relative solmization is a concept for learning to sing better that uses hand signs (http://dictionary.onmusic.org/appendix/topics/syllables-of-solmization). 
My idea is to replace these hand signs with units of 7 squares that you have in mind. These squares you find 
in http://solmiktest1.michaelkox.de left top.

There is also a music staff, which you can use amongth others to rapidly read solmization values from random notes. 
There are some configurations to decide from which area you choose random notes.
In the music staff you find also notes that represent solmization strings that can be choosen, created and played
further below.

You can hear the sound of the solmization strings, at the moment you can choose between 4 instruments.

There is a login area where you can insert new solmization strings and new categies, or change or delete them.

The buttons "start", "stop" and "reset" belong to an experimental feature for using sound that is sent 
through a microphone.
