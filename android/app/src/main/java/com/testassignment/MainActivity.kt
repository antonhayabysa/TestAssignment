package com.testassignment

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.os.Bundle
import org.devio.rn.splashscreen.SplashScreen

class MainActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        SplashScreen.show(this)  // Показываем Splash Screen здесь
        super.onCreate(savedInstanceState)
    }

    /**
     * Возвращает имя основного компонента, зарегистрированного из JavaScript.
     * Это используется для планирования рендеринга компонента.
     */
    override fun getMainComponentName(): String = "TestAssignment"

    /**
     * Возвращает экземпляр [ReactActivityDelegate]. Мы используем [DefaultReactActivityDelegate],
     * который позволяет включить новую архитектуру с одним флагом [fabricEnabled].
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
