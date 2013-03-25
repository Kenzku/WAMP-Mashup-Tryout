/**
 * User: Ken
 * Date: 25/03/2013
 * Time: 13:39
 */
// select the target node
    window.onload = function(){
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        var list = document.querySelector('ol');


// create an observer instance
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    var list_values = [].slice.call(list.children)
                        .map( function(node) { return node.innerHTML; })
                        .filter( function(s) {
                            if (s === '<br>') {
                                return false;
                            }
                            else {
                                return true;
                            }
                        });
                    console.log(list_values);
                }
            });
        });

// configuration of the observer:
        var config = { attributes: true, childList: true, characterData: true };

// pass in the target node, as well as the observer options
        observer.observe(list, config);

// later, you can stop observing
//        observer.disconnect();
    };

function whyYouAreHere(){
    console.log("asdfasd");
}
